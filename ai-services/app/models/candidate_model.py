from typing import Optional
from beanie import Document
from pydantic import Field

class Candidate(Document):
    name: str
    email: str
    phone: Optional[str] = None
    location: Optional[str] = None
    githubUrl: Optional[str] = None
    linkedInUrl: Optional[str] = None
    latestResumeUrl: Optional[str] = None

    class Settings:
        name = "candidates"