from pydantic import Field
from beanie import Document, PydanticObjectId
from datetime import datetime, timezone

class InterviewSession(Document):
    candidate_id: PydanticObjectId
    job_id: PydanticObjectId
    job_title: str
    is_completed: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Settings:
        name = "interview_sessions"