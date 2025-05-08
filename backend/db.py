from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

# Define the asynchronous function to get the database
async def get_database():
    # Provide the MongoDB Atlas URL to connect Python to MongoDB
    CONNECTION_STRING = os.getenv("MONGODB_URI")

    # Create an asynchronous connection using AsyncIOMotorClient
    client = AsyncIOMotorClient(CONNECTION_STRING)

    # Access the desired database
    db = client["aiQuizGenerator"]

    return db

# Example usage
if __name__ == "__main__":
    import asyncio

    async def main():
        # Get the database asynchronously
        db = await get_database()
        print("✅ Successfully connected to MongoDB:", db)

        # Test by accessing a collection (users collection)
        users_collection = db["users"]
        test_result = await users_collection.find_one({})
        print("Test query result:", test_result)

    # Run the main function in the event loop
    asyncio.run(main())
