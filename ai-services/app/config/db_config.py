# import os
# from dotenv import load_dotenv
# from motor.motor_asyncio import AsyncIOMotorClient

# load_dotenv()

# class Database:
#     client:AsyncIOMotorClient=None
#     db:None 


# db_instance=Database()

# async def connect_to_mongodb():
#     uri=os.getenv("MONGODB_URI")

#     try:
#         db_instance.client=AsyncIOMotorClient(uri)
#         # Verify the connection is active
#         await db_instance.client.admin.command("ping")

#         db_instance.db=db_instance.client.get_database('hireiq')

#         print("MongoDB Connection Successful")
#     except Exception as e:
#         print(f"MongoDB Connection Failed: {e}")
#         raise e


# def get_db():
#     return db_instance.db

import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie

# 1. IMPORT YOUR MODEL HERE
# (Adjust the path if your InterviewSetup is in a different folder)
from models.interview_model import InterviewSetup
from models.session_model import InterviewSession
from models.candidate_model import Candidate
from models.interview_evaluate_model import ATSInterview
load_dotenv()

class Database:
    client: AsyncIOMotorClient = None
    db = None 

db_instance = Database()

async def connect_to_mongodb():
    uri = os.getenv("MONGODB_URI")

    try:
        db_instance.client = AsyncIOMotorClient(uri)
        
        # Verify the connection is active
        await db_instance.client.admin.command("ping")

        # Get the specific database
        db_instance.db = db_instance.client.get_database('hireiq')

        # 2. INITIALIZE BEANIE
        # We pass the database instance and the list of our models
        await init_beanie(
            database=db_instance.db,
            document_models=[
                InterviewSetup,  
                InterviewSession,
                Candidate,
                ATSInterview
            ]
        )

        print("MongoDB Connection & Beanie Initialization Successful")
    except Exception as e:
        print(f"MongoDB Connection Failed: {e}")
        raise e

def get_db():
    return db_instance.db