from fastapi import FastAPI ; 
from fastapi.middleware.cors import CORSMiddleware
from langchain_text_splitters import RecursiveCharacterTextSplitter 
from pydantic import BaseModel, ConfigDict
from pydantic import BaseModel, Field
from datetime import datetime
#from langchain_core.pydantic_v1 import BaseModel as lcBaseModel, Field, validator
from langchain_core.prompts import PromptTemplate
from dotenv import load_dotenv
from langchain_openai import OpenAI
from langchain.output_parsers import PydanticOutputParser
from langchain.chat_models import ChatOpenAI

from .db import get_database 
from bson import ObjectId
import json 
from fastapi import HTTPException
from .routers import auth

#pydantic.json.ENCODERS_BY_TYPE[ObjectId]=str
#from routers import auth 

load_dotenv()


from typing import Optional, Dict, Any

class UserInput(BaseModel):
    text: str
    existing_quiz: Optional[Dict[str, Any]] = None

app = FastAPI() 

app.include_router(auth.router)

origins = [
    "https://localhost:3000",
    "http://localhost:3000",
    "127.0.0.1:63515"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class Config:
    json_encoders = {
        ObjectId: str
    }

# class QuizQuestion(lcBaseModel):
#     question: str = Field(description="Question")
#     answer1: str = Field(description="Possible answer to question")
#     answer2: str = Field(description="Possible answer to question")
#     answer3: str = Field(description="Possible answer to question")
#     answer4: str = Field(description="Possible answer to question")
#     correct_answer: str = Field(description="Out of the 4 possible answers, which is correct?")
#     explanation: str = Field(description="Why is the correct answer the correct answer?")
    
#     def to_dict(self):
#         return {
#             "question": self.question,
#             "answer1": self.answer1,
#             "answer2": self.answer2,
#             "answer3": self.answer3,
#             "answer4": self.answer4,
#             "correct_answer": self.correct_answer,
#             "explanation": self.explanation
#         }
    
#     class Config(Config):
#         pass

class QuizQuestion(BaseModel):
    question: str = Field(description="Question")
    answer1: str = Field(description="Possible answer to question")
    answer2: str = Field(description="Possible answer to question")
    answer3: str = Field(description="Possible answer to question")
    answer4: str = Field(description="Possible answer to question")
    correct_answer: str = Field(description="Out of the 4 possible answers, which is correct?")
    explanation: str = Field(description="Why is the correct answer the correct answer?")
    
    def to_dict(self):
        return {
            "question": self.question,
            "answer1": self.answer1,
            "answer2": self.answer2,
            "answer3": self.answer3,
            "answer4": self.answer4,
            "correct_answer": self.correct_answer,
            "explanation": self.explanation
        }
    
    class Config:
        json_encoders = {
            ObjectId: str
        }

class QuizMetadata(BaseModel):
    title: str
    description: str
def generate_quiz(userInput: UserInput):
    print(userInput)

    model = ChatOpenAI(model_name="gpt-4o", temperature=0.0)

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=400,
        length_function=len,
        is_separator_regex=False
    )

    texts = text_splitter.create_documents([userInput.text])

    parser = PydanticOutputParser(pydantic_object=QuizQuestion)
    metadata_parser = PydanticOutputParser(pydantic_object=QuizMetadata)

    prompt = PromptTemplate(
        template='''Create a difficult multiple choice question in the format specified based on 
        the following text. The output should be a flat JSON object with the following fields: 
        "question", "answer1", "answer2", "answer3", "answer4", "correct_answer". 
        \n{format_instructions} \n{query}''',
        input_variables=["query"],
        partial_variables={"format_instructions": parser.get_format_instructions()}
    )

    metadata_prompt = PromptTemplate(
        template='''Generate a quiz title and description based on the following text.
        {format_instructions}

        Text:
        {query}''',
        input_variables=["query"],
        partial_variables={"format_instructions": metadata_parser.get_format_instructions()}
    )

    question_chain = prompt | model | parser
    metadata_chain = metadata_prompt | model | metadata_parser

    existing = userInput.existing_quiz or {}
    existing_questions = existing.get("questions", {})

    idx = len(existing_questions)
    new_questions = {}

    for i in texts:
        output = question_chain.invoke(input={"query": i})
        new_questions[str(idx)] = output.to_dict()
        idx += 1

    all_questions = {**existing_questions, **new_questions}

    if "title" in existing and "description" in existing:
        metadata = existing
    else:
        meta = metadata_chain.invoke(input={"query": userInput.text})
        metadata = {
            "title": meta.title,
            "description": meta.description
        }

    return {
        "title": metadata["title"],
        "description": metadata["description"],
        "questions": all_questions,
        "creation_time": existing.get("creation_time", datetime.utcnow().isoformat()),
        "numPlays": existing.get("numPlays", 0),
        "num_questions": len(all_questions)
    }


@app.delete('/deleteQuiz/{quiz_id}')
async def delete_quiz(quiz_id: str):
    """
    Deletes a quiz from the database based on the provided quiz ID.
    """
    print(f"Attempting to delete quiz with ID: {quiz_id}")

    db = await get_database()

    # Try to delete the quiz with the provided ID
    result = await db.quizzes.delete_one({"_id": ObjectId(quiz_id)})

    if result.deleted_count == 0:
        # If no document was deleted, the ID might not exist
        raise HTTPException(status_code=404, detail=f"Quiz with ID {quiz_id} not found")

    print(f"Successfully deleted quiz with ID: {quiz_id}")
    return {"message": f"Quiz with ID {quiz_id} deleted successfully"}

@app.get('/quiz/{quiz_id}')
async def find_quiz(quiz_id: str):
    db = await get_database()

    try:
        # Find the quiz by its ObjectId
        quiz = await db.quizzes.find_one({"_id": ObjectId(quiz_id)})
        if not quiz:
            raise HTTPException(status_code=404, detail="Quiz not found")

        # Convert ObjectId to string
        quiz['_id'] = str(quiz['_id'])

        return {"quiz": quiz}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

@app.post('/create')
async def root(ui: UserInput):
    print("Received input:", ui)
    quiz = generate_quiz(ui)

    db = await get_database()

    # Check if updating an existing quiz
    if ui.existing_quiz and "_id" in ui.existing_quiz:
        try:
            quiz_id = ui.existing_quiz["_id"]
            result = await db.quizzes.update_one(
                {"_id": ObjectId(quiz_id)},
                {"$set": quiz}
            )
            print(f"Updated quiz ID: {quiz_id}, matched: {result.matched_count}, modified: {result.modified_count}")
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Failed to update quiz: {e}")
    else:
        # Insert as a new quiz
        result = await db.quizzes.insert_one(quiz)
        quiz["_id"] = str(result.inserted_id)
        print("Inserted new quiz with ID:", quiz["_id"])

    return {"quiz": quiz}


@app.get('/myLibrary')
async def root():
    print("myLibrary route hit")

    db = await get_database()

    # Convert ObjectId to string for each document
    all_quizzes = []
    async for quiz in db.quizzes.find({}):
        quiz['_id'] = str(quiz['_id'])  # Convert `_id` to string
        all_quizzes.append(quiz)

    #print(all_quizzes)
    return {"quizzes": all_quizzes}