import json
import traceback
from fastapi import HTTPException, status
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser # 1. ADD THIS IMPORT
from beanie import PydanticObjectId

from config.llm_config import get_llm
from schema.interview_question_generation_schema import GeneratedQuestions
from models.interview_model import InterviewSetup
from models.session_model import InterviewSession
from models.candidate_model import Candidate

async def create_interview_setup(
    job_id: PydanticObjectId, 
    duration: int, 
    custom_context: str, 
    created_by: PydanticObjectId
) -> dict:
    
    try:
        # 1. Initialize LLM (WITHOUT with_structured_output)
        llm = get_llm()

        estimated_questions = duration // 2

        # 2. Build the Prompt (Explicitly command JSON format)
        prompt = ChatPromptTemplate([
            ("system", """You are an elite AI Technical Interviewer for the HireIQ platform. 
            Generate exactly {estimated_questions} interview questions based on the Job Description.
            
            RULES:
            1. Provide a balanced mix of technical and behavioral questions.
            2. Do not number the questions.
            3. YOU MUST OUTPUT ONLY VALID JSON. Do not include introductory text.
            
            EXPECTED FORMAT:
            {{
                "questions": [
                    "Question 1?",
                    "Question 2?"
                ]
            }}
            """),
            ("human", """
            === JOB DESCRIPTION / CONTEXT ===
            {context}
            """)
        ])

        # 3. Connect and Run the AI using StrOutputParser
        # This returns a raw string instead of trying to auto-parse it
        generation_chain = prompt | llm | StrOutputParser()
        raw_ai_text = await generation_chain.ainvoke({
            "estimated_questions": estimated_questions,
            "context": custom_context
        })

       
        # 4. Clean the output (AI sometimes wraps JSON in markdown blocks)
        cleaned_text = raw_ai_text.strip()
        if cleaned_text.startswith("```json"):
            cleaned_text = cleaned_text.replace("```json", "", 1)
        if cleaned_text.endswith("```"):
            cleaned_text = cleaned_text.rsplit("```", 1)[0]
        cleaned_text = cleaned_text.strip()

        # ==========================================
        # 5. THE MAGIC FIX: Parse with strict=False
        # ==========================================
        try:
            # strict=False explicitly allows those hidden control characters!
            parsed_dict = json.loads(cleaned_text, strict=False)
            
            # Pass the dict to your Pydantic schema to validate it safely
            ai_result = GeneratedQuestions(**parsed_dict)
            
        except json.JSONDecodeError as e:
            print(f"RAW LLM TEXT THAT FAILED: {cleaned_text}")
            raise Exception(f"Failed to parse LLM JSON: {str(e)}")

        if not ai_result.questions:
             raise Exception("The AI returned an empty list of questions.")

        # # 6. Save to Database using Beanie
        # new_setup = InterviewSetup(
        #     job_id=job_id,
        #     duration=duration,
        #     custom_context=custom_context,
        #     questions=ai_result.questions,
        #     created_by=created_by
        # )
        
        # await new_setup.save()
        return {"questions": ai_result.questions}

        # 7. Return the saved document data
        # return new_setup.model_dump()

    except Exception as e:
       print("=== INTERVIEW GENERATION CRASH REPORT ===")
       traceback.print_exc() 
       print("=========================================")
       
       raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to setup interview: {repr(e)}"
        )
    

# Save the question into DB
async def save_interview_setup_to_db(
    job_id: PydanticObjectId, 
    duration: int, 
    custom_context: str,
    questions: list[str],
    created_by: PydanticObjectId
) -> dict:
    
    try:
        # Save to Database using Beanie
        new_setup = InterviewSetup(
            job_id=job_id,
            duration=duration,
            custom_context=custom_context,
            questions=questions,
            created_by=created_by
        )
        
        await new_setup.save()

        # Return the saved document data
        return new_setup.model_dump()

    except Exception as e:
       print("=== INTERVIEW DB SAVE CRASH REPORT ===")
       traceback.print_exc() 
       print("=========================================")
       
       raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to save interview setup: {repr(e)}"
        )
    


    
async def get_secure_session_data(session_id: PydanticObjectId) -> dict:
    try:
        # 1. Fetch the unique session
        session = await InterviewSession.get(session_id)
        
        # 2. Security Checks
        if not session:
            raise Exception("Session not found.")
        if session.is_completed:
            raise Exception("This interview link has already been used and is expired.")

        # 3. Fetch the AI Questions mapped to this Job
        setup = await InterviewSetup.find_one(InterviewSetup.job_id == session.job_id)
        if not setup:
            raise Exception("Interview questions have not been generated for this role yet.")
        
        candidate = await Candidate.get(session.candidate_id)
        if not candidate:
            raise Exception("Candidate profile no longer exists in the system.")

        # 4. Return everything the React UI needs!
        return {
            "session_id": str(session.id),
            "job_title": session.job_title,
            "custom_context": setup.custom_context,
            "candidate_name": candidate.name,  
            "candidate_email": candidate.email,
            "duration": setup.duration,
            "questions": setup.questions
        }

    except Exception as e:
       raise e

async def mark_session_completed(session_id: PydanticObjectId) -> bool:
    try:
        session = await InterviewSession.get(session_id)
        if session:
            session.is_completed = True
            await session.save()
            return True
        return False
    except Exception as e:
        raise e