from fastapi import FastAPI ; 
from fastapi.middleware.cors import CORSMiddleware
from langchain_text_splitters import RecursiveCharacterTextSplitter 
from pydantic import BaseModel, ConfigDict
from langchain_core.pydantic_v1 import BaseModel as lcBaseModel, Field, validator
from langchain_core.prompts import PromptTemplate
from dotenv import load_dotenv
from langchain_openai import OpenAI
from typing import Union
from langchain.output_parsers import PydanticOutputParser
from db import get_database 
import pydantic
from bson import ObjectId
import json 
from fastapi import HTTPException


#pydantic.json.ENCODERS_BY_TYPE[ObjectId]=str
#from routers import auth 

load_dotenv()


class UserInput(BaseModel):
    text: str

app = FastAPI() 

#app.include_router(auth.router)

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

class QuizQuestion(lcBaseModel):
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
    
    class Config(Config):
        pass


def generate_quiz(userInput: UserInput):
    print(userInput) 

    model = OpenAI(model_name="gpt-3.5-turbo-instruct", temperature=0.0)
    
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size = 2000,
        chunk_overlap = 400, 
        length_function = len,
        is_separator_regex=False
    )

    texts = text_splitter.create_documents([userInput.text])

    parser = PydanticOutputParser(pydantic_object=QuizQuestion)

    prompt = PromptTemplate(
        template='''Create a multiple choice question in the format specified based on 
        the following text. The output should be a flat JSON object with the following fields: 
        "question", "answer1", "answer2", "answer3", "answer4", "correct_answer". 
        \n{format_instructions} \n{query}''',
        input_variables=["query"],
        partial_variables={"format_instructions": parser.get_format_instructions()}
    )

    metadata_prompt = PromptTemplate(
        template='''Generate a concise title and description for a quiz based on the following text.
        Output the result as a JSON object with the fields:
        - "title": A concise, engaging title for the quiz.
        - "description": A short description summarizing the main topic of the quiz.
        \n{query}''',
        input_variables=["query"]
    )


    # feeding prompt into model using pipe operator
    question_chain = prompt | model | parser
    metadata_chain = metadata_prompt | model 

    questions = {}
    
    idx = 0 
    for i in texts:
        print(len(texts))

        output = question_chain.invoke(input = {"query": i})

        #questions.append(output) 
        questions[str(idx)] = output.to_dict()
        #parser.invoke(output)
        idx += 1 

    print('questions array sent to client:' + str(questions))
    metadata_output = metadata_chain.invoke(input={"query": userInput.text})
    print(metadata_output) 
    try:
        metadata = json.loads(metadata_output)  # Parse the JSON string into a Python dictionary
    except json.JSONDecodeError as e:
        print(f"Failed to parse metadata JSON: {e}")
        raise ValueError("The metadata output is not in valid JSON format")

    print('Generated quiz title: ' + metadata["title"])
    print('Generated quiz description: ' + metadata["description"])
    print('Questions array sent to client: ' + str(questions))

    return {
        "title": metadata["title"],
        "description": metadata["description"],
        "questions": questions
    }

@app.delete('/deleteQuiz/{quiz_id}')
async def delete_quiz(quiz_id: str):
    """
    Deletes a quiz from the database based on the provided quiz ID.
    """
    print(f"Attempting to delete quiz with ID: {quiz_id}")

    db = get_database()

    # Try to delete the quiz with the provided ID
    result = db.quizzes.delete_one({"_id": ObjectId(quiz_id)})

    if result.deleted_count == 0:
        # If no document was deleted, the ID might not exist
        raise HTTPException(status_code=404, detail=f"Quiz with ID {quiz_id} not found")

    print(f"Successfully deleted quiz with ID: {quiz_id}")
    return {"message": f"Quiz with ID {quiz_id} deleted successfully"}

@app.get('/quiz/{quiz_id}')
async def find_quiz(quiz_id: str):
    db = get_database()

    try:
        # Find the quiz by its ObjectId
        quiz = db.quizzes.find_one({"_id": ObjectId(quiz_id)})
        if not quiz:
            raise HTTPException(status_code=404, detail="Quiz not found")

        # Convert ObjectId to string
        quiz['_id'] = str(quiz['_id'])

        return {"quiz": quiz}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
@app.post('/create') 
async def root(ui: UserInput):
    #breakpoint()
    print(ui)
    quiz = generate_quiz(ui)
    db = get_database()
    quiz_id = db.quizzes.insert_one(quiz).inserted_id
    quiz.pop('_id', None)
    print(quiz_id)
    return {"quiz" : quiz} ; 



@app.get('/myLibrary')
async def root():
    print("myLibrary route hit")

    db = get_database()

    # Convert ObjectId to string for each document
    all_quizzes = []
    for quiz in db.quizzes.find({}):
        quiz['_id'] = str(quiz['_id'])  # Convert `_id` to string
        all_quizzes.append(quiz)

    print(all_quizzes)
    return {"quizzes": all_quizzes}