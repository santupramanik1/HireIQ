from fastapi import HTTPException
from langchain_core.prompts import ChatPromptTemplate
from config.llm_config import get_llm
from schema.result_evaluation_schema import EvaluationResult
async def evaluate_candidate_match(jd_text: str, form_data: dict, raw_resume: str) -> dict:
    try:
        llm=get_llm()
        structured_llm=llm.with_structured_output(EvaluationResult)

        prompt=ChatPromptTemplate([
    ("system", """You are an elite, highly critical AI Technical Recruiter for the HireIQ platform. 
    Your objective is to evaluate a candidate's resume against a specific Job Description (JD) with absolute objectivity. 
    Do not be overly generous. Do not hallucinate or assume skills that are not explicitly stated or clearly demonstrated.

    CRITICAL EVALUATION RULES:
    
   1. score_reasoning & matchScore (0-100): 
               - ALWAYS start at 100.
               - Deduct EXACTLY 20 points for a missing 'Required' or 'Core' technical skill (e.g., missing a required language like Go).
               - Deduct EXACTLY 20 points if the candidate does not meet the minimum Years of Experience required.
               - Deduct EXACTLY 10 points for a missing required degree or educational background.
               - Deduct EXACTLY 5 points for missing 'Nice-to-have' skills.
               - Write the math equation out explicitly in the score_reasoning field before setting the matchScore.

    2. summary:
       - Strictly 2-3 sentences.
       - Be professional, objective, and direct. 
       - State clearly WHY they received their score (e.g., "The candidate has strong backend fundamentals with Node.js but lacks the required cloud deployment experience.").

    3. matchedSkills:
       - Only include skills present in BOTH the resume and the JD. Look for direct matches or highly obvious synonyms.

    4. missingSkills:
       - ONLY list skills that are EXPLICITLY asked for in the JD but are COMPLETELY ABSENT from the resume. 

    5. strengths:
       - Highlight standout achievements, leadership roles, quantifiable metrics, or advanced architectural knowledge found in the resume.

    6. areasToImprove:
       - Point out missing secondary skills, lack of seniority, or missing domain knowledge that would make them a better fit for this specific JD.

    Return ONLY the requested data structure based on the provided inputs.
    """),
    
    ("human", """
    === JOB DESCRIPTION ===
    {jd_text}
    
     === CANDIDATE FORM DATA ===
            {form_data}
    === CANDIDATE RESUME / PROFILE DATA ===
    {raw_resume}
    """)
]
        )

        # Connect the prompt to the AI
        evaluation_chain = prompt | structured_llm

        # Run the AI
        result = await evaluation_chain.ainvoke({
            "jd_text": jd_text,
            "form_data": str(form_data), # Convert dict to string for the prompt
            "raw_resume": raw_resume
        })

        return result.model_dump()
    except Exception as e:
        print(f"EVALUATION CRASH REPORT: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to evaluate match: {str(e)}")
