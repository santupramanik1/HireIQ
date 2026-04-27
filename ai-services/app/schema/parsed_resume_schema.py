from pydantic import BaseModel, Field
from typing import List, Optional

class ParsedResume(BaseModel):
    # Identity
    candidate_name:str=Field(description="The full name of the candidate")
    email: str = Field(description="The candidate's email address. Look carefully for this.")
    phone: Optional[str] = Field(default=None, description="The candidate's phone number")

    # Professional Context
    currentTitle: Optional[str] = Field(
        default=None, 
        description="The candidate's current job title (e.g., Senior Developer). If student, put 'Student' or 'Pursuing MCA'."
    )
    currentCompany: Optional[str] = Field(
        default=None, 
        description="The candidate's current employer. If student, put the name of their University."
    )

    # Skills & AI Categorization
    skills: List[str] = Field(description="A clean list of technical skills, programming languages, and tools")
    years_of_experience: int = Field(description="Total years of professional experience. Put 0 if they are a fresher/student.")
    tags: List[str] = Field(
        default_factory=list, 
        description="3-5 short labels to categorize the candidate (e.g., 'Full-Stack', 'Fresher', 'AI/ML'). Don't use technical skills here ,only categories "
    )

    # URLs
    linkedInUrl: Optional[str] = Field(default=None, description="The URL to the candidate's LinkedIn profile")
    githubUrl: Optional[str] = Field(default=None, description="The URL to the candidate's GitHub profile")
    location: Optional[str] = Field(default=None, description="The candidate's city, state, or country of residence")