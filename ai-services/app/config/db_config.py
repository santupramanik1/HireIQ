import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()

class Database:
    client:AsyncIOMotorClient=None
    db:None 


db_instance=Database()

async def connect_to_mongodb():
    uri=os.getenv("MONGODB_URI")

    try:
        db_instance.client=AsyncIOMotorClient(uri)
        # Verify the connection is active
        await db_instance.client.admin.command("ping")

        db_instance.db=db_instance.client.get_database('hireiq')

        print("MongoDB Connection Successful")
    except Exception as e:
        print(f"MongoDB Connection Failed: {e}")
        raise e


def get_db():
    return db_instance.db