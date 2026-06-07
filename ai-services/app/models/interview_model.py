from typing import List, Literal
from datetime import datetime, timezone
from pydantic import Field
from beanie import Document, PydanticObjectId

class InterviewSetup(Document):
    job_id: PydanticObjectId
    duration: Literal[15, 30, 45, 60] = Field(..., description="Interview duration in minutes")
    custom_context: str = Field(..., description="The context or Job Description used for AI generation")
    questions: List[str] = Field(..., description="List of generated technical and behavioral questions")
    created_by: PydanticObjectId
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Settings:
        name = "interview_setups" 

    # Hook to automatically update the 'updated_at' field on save
    async def save(self, *args, **kwargs):
        self.updated_at = datetime.now(timezone.utc)
        await super().save(*args, **kwargs)