from fastapi import APIRouter, Request, status,Depends
from fastapi.responses import JSONResponse
from beanie import PydanticObjectId

from schema.interview_question_generation_schema import InterviewSetupCreate,InterviewSetupSave
from services.interview_generation_services import create_interview_setup,save_interview_setup_to_db
from utils.auth_dependency import require_auth

router = APIRouter()

# Generate interview questions and save the setup configuration
@router.post("/setup", dependencies=[Depends(require_auth)])
async def handle_interview_setup(request: Request, payload: InterviewSetupCreate):
    
    # 1. Verify the user is authenticated (attached by your custom middleware)
    if not hasattr(request.state, "user") or not request.state.user:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={"success": False, "message": "Unauthorized. Please log in."}
        )

    #  Extract the user ID directly from the decoded JWT payload
    user_id = request.state.user.get("userId")

    try:
        #  Pass the data to the service layer for LLM generation and DB saving
        result = await create_interview_setup(
            job_id=payload.job_id,
            duration=payload.duration,
            custom_context=payload.custom_context,
            created_by=PydanticObjectId(user_id) 
        )
        
        return {
            "success": True, 
            "message": "Interview setup created successfully",
            "data": result
        }
        
    except Exception as e:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"success": False, "message": f"Failed to generate setup: {str(e)}"}
        )


@router.post("/save", dependencies=[Depends(require_auth)])
async def handle_save_interview(request: Request, payload: InterviewSetupSave):
    
    # Verify the user is authenticated
    if not hasattr(request.state, "user") or not request.state.user:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={"success": False, "message": "Unauthorized. Please log in."}
        )

    # Extract the user ID directly from the decoded JWT payload
    user_id = request.state.user.get("userId")

    try:
        # Pass the data to the service layer for DB saving
        result = await save_interview_setup_to_db(
            job_id=payload.job_id,
            duration=payload.duration,
            custom_context=payload.custom_context,
            questions=payload.questions,
            created_by=PydanticObjectId(user_id) 
        )
        
        return {
            "success": True, 
            "message": "Interview setup saved successfully",
            "data": result
        }
        
    except Exception as e:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"success": False, "message": f"Failed to save setup: {str(e)}"}
        )