from pydantic import BaseModel, Field
from typing import List

class EvaluationResult(BaseModel):
    score_reasoning: str = Field(
        description="Step-by-step mathematical deduction calculation. E.g., 'Base: 100. Missing Go (-20). Missing 2+ years exp (-20). Total deductions: 40. Final Score: 60.'"
    )
    matchScore: int = Field(
        description="A strict calculated match score from 0 to 100 based on how well the raw resume meets the job description requirements."
    )
    summary: str = Field(
        description="A 2-3 sentence executive summary justifying the score. Be objective."
    )
    matchedSkills: List[str] = Field(
        description="A list of specific skills, tools, or requirements that the candidate possesses which directly match the job description."
    )
    missingSkills: List[str] = Field(
        description="A list of crucial skills or requirements explicitly asked for in the job description that are completely missing from the candidate's profile."
    )
    strengths: List[str] = Field(
        description="Key professional highlights or achievements found in the raw resume text."
    )
    areasToImprove: List[str] = Field(
        description="Specific gaps in experience or soft skills that the candidate should develop."
    )