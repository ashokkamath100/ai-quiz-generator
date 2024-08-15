from fastapi import FastAPI ; 
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_text_splitters import RecursiveCharacterTextSplitter 
from langchain_core.pydantic_v1 import BaseModel, Field, validator
from langchain_core.prompts import PromptTemplate
from dotenv import load_dotenv
from langchain_openai import OpenAI
from typing import Union

load_dotenv()

def generate_quiz_questions(userInput: UserInput):
    print(userInput) 
    
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size = 2000,
        chunk_overlap = 400, 
        length_function = len,
        is_separator_regex=False
    )

    texts = text_splitter.create_documents([userInput.text])

    parser = PydanticOutputParser(pydantic_object=QuizQuestion)

    prompt = PromptTemplate(
        template='''Create a multiple choice question based on 
        the following text. \n{format_instructions} \n{query}''',
        input_variables=["query"],
        partial_variables={"format_instructions": parser.get_format_instructions()}
    )
    prompt_and_model = prompt | model 

    
    for i in texts:
        print(len(texts))

        output = prompt_and_model.invoke({"query": i})
        parser.invoke(output)

        #print(i)
    
    ##print(texts[0])

if __name__ == '__main__':
    