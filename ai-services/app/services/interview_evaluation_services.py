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
        # 1. Fetch the temporary session using the ID from the URL
        session = await InterviewSession.get(session_id)
        if not session:
            raise Exception("Interview Session link is invalid or expired.")

        # 2. Fetch the REAL ATS Interview Document using the linked IDs
        interview = await ATSInterview.find_one(
            ATSInterview.jobId == session.job_id,
            ATSInterview.candidateId == session.candidate_id
        )
        
        if not interview:
            raise Exception("ATS Interview record not found for this candidate and job.")

        if interview.status == "completed":
            return {"success": True, "message": "Interview already completed."}

        # 3. Get Job Context
        setup = await InterviewSetup.find_one(InterviewSetup.job_id == session.job_id)
        job_context = setup.custom_context if setup else "Technical role"

        # 4. Format Transcript
        formatted_transcript = "\n".join([f"{msg.get('role', 'unknown').upper()}: {msg.get('text', '')}" for msg in transcript_array])

        # 5. AI Grading (STRICT RUBRIC + JSON PARSER)
        llm = get_llm() 
        parser = PydanticOutputParser(pydantic_object=InterviewScorecard)
        
        prompt = ChatPromptTemplate.from_messages([
            ("system", """You are a strictly objective, highly critical Senior Technical Recruiter. 
            Grade the candidate based on this Job Description: {job_context}
            
            {format_instructions}

            CRITICAL GRADING RULES:
            1. DO NOT HALLUCINATE: Base your scores ONLY on the exact words spoken in the transcript.
            2. ZERO TOLERANCE FOR NON-ANSWERS: If the transcript is extremely short, incomplete, or nonsensical, you MUST fail them. Give scores between 0 and 2. Do not default to 7.
            3. NO INVENTED STRENGTHS: If they demonstrated no skills, write "None demonstrated."
            
            SCORING RUBRIC:
            - technical_score (0-10): 0 = No technical knowledge. 5 = Basic. 10 = Expert.
            - communication_score (0-10): 0 = Incoherent. 5 = Understandable but messy. 10 = Clear.
            - confidence_score (0-10): 0 = Heavy hesitation. 10 = Decisive.
            
            CRITICAL: Output ONLY valid JSON."""),
            ("human", "Here is the exact conversation transcript:\n\n{transcript}")
        ])
        
        chain = prompt | llm | parser
        
        scorecard: InterviewScorecard = await chain.ainvoke({
            "job_context": job_context,
            "transcript": formatted_transcript,
            "format_instructions": parser.get_format_instructions()
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
        interview.hireRecommendation = scorecard.hire_recommendation
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