from typing import Optional, List, Dict
from beanie import Document, PydanticObjectId
from pydantic import Field
from datetime import datetime

class ATSInterview(Document):
    # Relational IDs from your image
    jobId: PydanticObjectId
    applicationId: PydanticObjectId
    candidateId: PydanticObjectId
    recruiterId: PydanticObjectId
    
    status: str
    overallScore: float
    interviewUrl: Optional[str] = None
    
    # New Evaluation Fields (Optional, because they are empty when 'invited')
    technicalScore: Optional[float] = None
    communicationScore: Optional[float] = None
    confidenceScore: Optional[float] = None
    strengths: Optional[List[str]] = None
    weaknesses: Optional[List[str]] = None
    detailedFeedback: Optional[str] = None
    hireRecommendation: Optional[str] = None
    transcript: Optional[List[Dict[str, str]]] = None

    class Settings:
        name = "interviews"