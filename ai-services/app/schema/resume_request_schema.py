from pydantic import BaseModel
from typing import Optional,Dict,Any

class ResumeExtractRequest(BaseModel):
    url: str
    jobId: str
    userId: Optional[str] = None

class EvaluateMatchRequest(BaseModel):
    jd_text: str
    form_data: Dict[str, Any]
    raw_resume: str