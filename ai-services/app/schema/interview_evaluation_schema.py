from pydantic import BaseModel, Field
from typing import List

class InterviewScorecard(BaseModel):
    technical_score: int = Field(..., ge=0, le=100)
    communication_score: int = Field(..., ge=0, le=100)
    confidence_score: int = Field(..., ge=0, le=100)
    strengths: List[str]
    weaknesses: List[str]
    detailed_feedback: str
    hire_recommendation: str