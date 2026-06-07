from pydantic import BaseModel, Field
from typing import Literal, List
from beanie import PydanticObjectId

class InterviewSetupCreate(BaseModel):
    job_id: PydanticObjectId
    duration: Literal[15, 30, 45, 60] = Field(..., description="Interview duration in minutes")
    custom_context: str = Field(..., description="The context or Job Description used for AI generation")

class GeneratedQuestions(BaseModel):
    questions: List[str] = Field(..., description="List of generated technical and behavioral questions")

# Add this to the bottom of schema/interview_question_generation_schema.py

class InterviewSetupSave(BaseModel):
    job_id: PydanticObjectId
    duration: Literal[15, 30, 45, 60] = Field(..., description="Interview duration in minutes")
    custom_context: str = Field(..., description="The context or Job Description")
    questions: List[str] = Field(..., description="The finalized list of questions to save")