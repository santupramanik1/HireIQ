import traceback
from langchain_core.prompts import ChatPromptTemplate
from beanie import PydanticObjectId
from config.llm_config import get_llm
from models.interview_evaluate_model import ATSInterview
from models.interview_model import InterviewSetup
from schema.interview_evaluation_schema import InterviewScorecard
from models.session_model import InterviewSession
from langchain_core.output_parsers import PydanticOutputParser

async def evaluate_and_save_interview(session_id: PydanticObjectId, transcript_array: list) -> dict:
    try:
        # 1. Fetch the temporary magic link session
        session = await InterviewSession.get(session_id)
        if not session:
            raise Exception("Interview Session link is invalid or expired.")

        # 2. THE FIX: Fetch the REAL ATS Interview Document using the linked IDs!
        interview = await ATSInterview.find_one(
            ATSInterview.jobId == session.job_id,
            ATSInterview.candidateId == session.candidate_id
        )
        
        if not interview:
            raise Exception("ATS Interview record not found for this candidate and job.")

        # 3. Get Job Context for the AI
        setup = await InterviewSetup.find_one(InterviewSetup.job_id == session.job_id)
        job_context = setup.custom_context if setup else "Technical role"

        # 4. Format Transcript
        formatted_transcript = "\n".join([f"{msg.get('role', 'unknown').upper()}: {msg.get('text', '')}" for msg in transcript_array])

        # 5. AI Grading
        llm = get_llm()
        parser = PydanticOutputParser(pydantic_object=InterviewScorecard)

        prompt = ChatPromptTemplate.from_messages([
            ("system", """You are a strictly objective, highly critical Senior Technical Recruiter. 
            Grade the candidate based on this Job Description: {job_context}
            
            {format_instructions}

            CRITICAL GRADING RULES (YOU MUST FOLLOW THESE):
            1. DO NOT HALLUCINATE: You must base your scores ONLY on the exact words the candidate spoke in the transcript.
            2. ZERO TOLERANCE FOR NON-ANSWERS: If the transcript is extremely short, incomplete, or the candidate gives nonsensical answers (e.g., "Yes. Yep."), you MUST fail them. Give scores between 0 and 20. Do not default to 70 out of politeness.
            3. NO INVENTED STRENGTHS: If the candidate did not explicitly demonstrate a technical skill, do not list it as a strength. If they said nothing of value, write "None demonstrated."
            
            SCORING RUBRIC:
            - technical_score (0-100): 0 = No technical knowledge shown. 50 = Basic. 100 = Expert, flawless explanation.
            - communication_score (0-100): 0 = Incoherent or mostly silent. 50 = Understandable but messy. 100 = Extremely clear and structured.
            - confidence_score (0-100): 0 = Heavy hesitation or confused words. 100 = Decisive and articulate.
            
            CRITICAL: You MUST output ONLY valid JSON. Do not include any markdown formatting, conversational text, or essays. Output ONLY the raw JSON object."""),
            ("human", "Here is the exact conversation transcript:\n\n{transcript}")
        ])
        
        # Chain the parser directly to the output
        chain = prompt | llm | parser
        
        scorecard: InterviewScorecard = await chain.ainvoke({
            "job_context": job_context,
            "transcript": formatted_transcript,
            "format_instructions": parser.get_format_instructions() # <--- Injects the schema automatically
        })

        # 6. Calculate Average Score
        avg_score = (scorecard.technical_score + scorecard.communication_score + scorecard.confidence_score) / 3

        # 7. Update the existing ATS Interview Document
        interview.status = "completed"
        interview.overallScore = round(avg_score, 2)
        interview.technicalScore = float(scorecard.technical_score)
        interview.communicationScore = float(scorecard.communication_score)
        interview.confidenceScore = float(scorecard.confidence_score)
        interview.strengths = scorecard.strengths
        interview.weaknesses = scorecard.weaknesses
        interview.detailedFeedback = scorecard.detailed_feedback
        
        # Format the transcript for MongoDB
        interview.transcript = [{"role": m.get("role"), "text": m.get("text")} for m in transcript_array]
        
        await interview.save()

        # 8. Lock the temporary session so the link can't be used again
        session.is_completed = True
        await session.save()

        return {"success": True, "score": avg_score}

    except Exception as e:
        print("=== CRASH IN EVALUATION SERVICE ===")
        traceback.print_exc()
        raise e