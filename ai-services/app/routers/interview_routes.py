from fastapi import APIRouter, Request, status,Depends,HTTPException
from fastapi.responses import JSONResponse
from beanie import PydanticObjectId
from pydantic import BaseModel
from typing import List, Dict, Any

from schema.interview_question_generation_schema import InterviewSetupCreate,InterviewSetupSave
from services.interview_generation_services import create_interview_setup,save_interview_setup_to_db,get_secure_session_data, mark_session_completed
from utils.auth_dependency import require_auth
from services.interview_evaluation_services import evaluate_and_save_interview

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
    
# /api/interview/candidate/6a24ff70306161e84cadda69
@router.get("/candidate/{setup_id}")
async def fetch_candidate_interview(setup_id: PydanticObjectId):
    try:
        candidate_data = await get_candidate_interview_by_id(setup_id)
        
        if not candidate_data:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={
                    "success": False, 
                    "message": "Invalid or expired interview link."
                }
            )
            
        return {
            "success": True, 
            "data": candidate_data
        }
        
    except Exception as e:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"success": False, "message": "Failed to load interview."}
        )
    
# ==========================================
# SECURE CANDIDATE ENDPOINTS
# ==========================================
@router.get("/session/{session_id}")
async def fetch_secure_interview(session_id: str): # <--- CHANGE THIS TO str
    try:
        # Manually convert the string to an ObjectId
        obj_id = PydanticObjectId(session_id)
        
        data = await get_secure_session_data(obj_id)
        return {"success": True, "data": data}
        
    except Exception as e:
        # Now, if it fails, we will see EXACTLY why in Postman and the terminal
        print(f"=== CRASH IN SESSION ROUTE ===")
        print(f"Failed ID: {session_id}")
        print(f"Error: {str(e)}")
        
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"success": False, "message": str(e)}
        )
    
@router.post("/session/{session_id}/complete")
async def complete_secure_interview(session_id: PydanticObjectId):
    try:
        await mark_session_completed(session_id)
        return {"success": True, "message": "Interview locked and completed."}
    except Exception as e:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"success": False, "message": "Failed to close session."}
        )
    
class TranscriptPayload(BaseModel):
    transcript: List[Dict[str, Any]]

@router.post("/session/{interview_id}/evaluate")
async def finalize_interview(interview_id: str, payload: TranscriptPayload):
    try:
        # We use the interview_id (which corresponds to your Mongo _id)
        obj_id = PydanticObjectId(interview_id)
        
        result = await evaluate_and_save_interview(obj_id, payload.transcript)
        
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))