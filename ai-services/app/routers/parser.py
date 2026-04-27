from fastapi import APIRouter
from schema.resume_request_schema import ResumeExtractRequest,EvaluateMatchRequest
from schema.result_evaluation_schema import EvaluationResult
router = APIRouter()
from services.resume_parser_services import process_resume_url
from services.candidate_evaluation_services import evaluate_candidate_match

# Extract the name,email and skill and return to display in the application form
@router.post("/extract")
async def handle_resume_parsing(request_data:ResumeExtractRequest):
   resumeUrl=request_data.url
   jobId=request_data.jobId
   userId=request_data.userId

   data= await process_resume_url(resumeUrl,jobId,userId)

#   Return the clean response
   return data

# Evaluate how well the parsed resume matches the job requirements
@router.post("/evaluate-match")
async def handle_resume_evaluation(request_data:EvaluateMatchRequest):
   result = await evaluate_candidate_match(
        jd_text=request_data.jd_text,
        form_data=request_data.form_data,
        raw_resume=request_data.raw_resume
    )
    
   return {"status": "success", "data": result}
    

