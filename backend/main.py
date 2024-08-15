from fastapi import FastAPI ; 
from fastapi.middleware.cors import CORSMiddleware
from langchain_text_splitters import RecursiveCharacterTextSplitter 
from pydantic import BaseModel
from langchain_core.pydantic_v1 import BaseModel as lcBaseModel, Field, validator
from langchain_core.prompts import PromptTemplate
from dotenv import load_dotenv
from langchain_openai import OpenAI
from typing import Union
from langchain.output_parsers import PydanticOutputParser
import json 


load_dotenv()


class UserInput(BaseModel):
    text: str

app = FastAPI() 

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

class QuizQuestion(lcBaseModel):
    question: str = Field(description="Question")
    answer1: str = Field(description="Possible answer to question")
    answer2: str = Field(description="Possible answer to question")
    answer3: str = Field(description="Possible answer to question")
    answer4: str = Field(description="Possible answer to question")
    correct_answer: str = Field(description="Out of the 4 possible answers, which is correct?")
    explanation: str = Field(description="Why is the correct answer the correct answer?")



def generate_quiz_questions(userInput: UserInput):
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


    # feeding prompt into model using pipe operator
    chain = prompt | model | parser

    questions = []
    
    for i in texts:
        print(len(texts))

        output = chain.invoke(input = {"query": i})
        # print('output: ' + str(output))
        # try:
        #     data = json.loads(output)
        # except json.JSONDecodeError as e:
        #     print(f"Failed to decode JSON: {e}")

        # print(data['properties'])

        # red_output = output['properties']
        # question = red_output['question']
        # answer1 = red_output['answer1']
        # answer2 = red_output['answer2']
        # answer3 = red_output['answer3']
        # answer4 = red_output['answer4']
        # correct_answer = red_output['correct_answer']

        # final_output = {question, answer1, answer2, answer3, answer4, correct_answer}
        # print('final_output: ' + str(final_output))
        # questions.append(final_output)
        questions.append(output) 
        #parser.invoke(output)

    print('questions array sent to client:' + str(questions))

    return questions 
        #print(i)
    
    ##print(texts[0])

@app.post('/') 
async def root(ui: UserInput):
    #breakpoint()
    print(ui)
    questions = generate_quiz_questions(ui)
    #questions = ['\n\n{"question": "When did Warner Brothers acquire Atari?", "answer1": "1976", "answer2": "1980", "answer3": "1977", "answer4": "1981", "correct_answer": "1976"}', ' {"properties": {"question": {"title": "What innovation led to the success of the Atari 2600?", "description": "Question", "type": "string"}, "answer1": {"title": "Removable controllers", "description": "Possible answer to question", "type": "string"}, "answer2": {"title": "Ability to swap game cartridges", "description": "Possible answer to question", "type": "string"}, "answer3": {"title": "Advanced graphics", "description": "Possible answer to question", "type": "string"}, "answer4": {"title": "Integration with television", "description": "Possible answer to question", "type": "string"}, "correct_answer": {"title": "Answer2", "description": "Out of the 4 possible answers, which is correct?", "type": "string"}}, "required": ["question", "answer1", "answer2", "answer3", "answer4", "correct_answer"]}', '\n\n{"question": "What is the reason behind naming their company Activision?", "answer1": "To come before Atari in the phone book", "answer2": "To make Atari mad", "answer3": "To be unique", "answer4": "To be the top company in the industry.", "correct_answer": "To come before Atari in the phone book"}']
    #questions = [[QuizQuestion(question='What was the market size of the arcade video game business in the United States in 1980?', answer1='$5 billion', answer2='$3.2 billion', answer3='$10 billion', answer4='$100 million', correct_answer='$5 billion'), QuizQuestion(question='What event led to the decimation of the home video game industry?', answer1='The release of the ET Atari game', answer2='The joint development of the ET game with Universal', answer3='The involvement of Steven Spielberg in the ET game', answer4='The rush to market with multiple games at the same time', correct_answer='The rush to market with multiple games at the same time')]]
    #questions = [QuizQuestion(question='What was the original family name of Fusajiro Yamauchi?', answer1='Fukui', answer2='Yamaguchi', answer3='Yamauchi', answer4='Fusajiro', correct_answer='Fukui'), QuizQuestion(question='What was the main use of playing cards in Japan during the 1500s to 1800s?', answer1='As a form of entertainment for households', answer2='As a way to communicate secret messages', answer3='As a substitute for Western playing cards', answer4='As a means of gambling', correct_answer='As a means of gambling'), QuizQuestion(question="What was the Yakuza's involvement in Nintendo's history?", answer1='They were involved in the production of playing cards.', answer2='They were involved in the distribution of playing cards.', answer3='They were involved in the operation of illegal casinos.', answer4='They were involved in the development of early arcade games.', correct_answer='They were involved in the operation of illegal casinos.'), QuizQuestion(question='Who was the first actual Yamauchi born in generations?', answer1='Fusajiro Yamauchi', answer2='Sekiryo Kaneda', answer3='Shikanojo Inaba', answer4='Hiroshi Yamauchi', correct_answer='Hiroshi Yamauchi'), QuizQuestion(question="What deal did Hiroshi's grandfather make for him to study law at Waseda University?", answer1='He had to pay a large sum of money.', answer2='He had to give up his inheritance.', answer3='He had to marry into a samurai family.', answer4='He had to serve in the military.', correct_answer='He had to marry into a samurai family.')]
    return {"questions" : questions} ; 



