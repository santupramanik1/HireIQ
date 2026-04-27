from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import uvicorn
import os
from dotenv import load_dotenv
from config.db_config import connect_to_mongodb
from routers import parser

app = FastAPI()

# Load env variable
load_dotenv()


# Use the startup event
@app.on_event("startup")
async def startup_event():
    print(f"SUCCESS: Server is running at PORT: {PORT}")
    await connect_to_mongodb()


# Global Error handler that will catch all the unhandled error here
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    print(f"CRITICAL UNHANDLED ERROR :{str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"message": "Internal AI Server Error. Please try again later."},
    )


app.include_router(parser.router, prefix="/api", tags=["Parser"])


PORT = int(os.getenv("PORT", 8000))
if __name__ == "__main__":
    print("Server is running at PORT :", PORT)
    uvicorn.run(
        "main:app", host="127.0.0.1", port=PORT, reload=True, log_level="warning"
    )
