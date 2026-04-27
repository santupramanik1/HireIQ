from fastapi import FastAPI,Body
import uvicorn
import os
from dotenv import load_dotenv
from config.db_config import connect_to_mongodb,get_db
from routers import parser
app = FastAPI()

# Load env variable
load_dotenv()


# Use the startup event 
@app.on_event("startup")
async def startup_event():
    print(f"SUCCESS: Server is running at PORT: {PORT}")
    await connect_to_mongodb()


app.include_router(parser.router, prefix="/api", tags=["Parser"])


PORT=int(os.getenv("PORT",8000))
if __name__ == "__main__":
    print("Server is running at PORT :",PORT)
    uvicorn.run("main:app", host="127.0.0.1", port=PORT, reload=True,log_level="warning")