"use client";
import React, { useState } from "react";
import AnswerButton from "./AnswerButton";
import { QuestionInterface } from "./QuizQuestions";

type QuestionProps = {
  question: QuestionInterface
  index: number;
};

const Question: React.FC<QuestionProps> = ({ question, index }) => {
  const [answerSelected, setAnswerSelected] = useState(0);

  const handleClick = (answer: string, correctAnswer:string ) => {
    if (answer === correctAnswer) {
      console.log("correct Answer was selected");
      setAnswerSelected(2);
    } else {
      setAnswerSelected(1);
      console.log("Incorrect answer selected");
      console.log("correct answer: " + correctAnswer);
      console.log("incorrect answer: " + answer);
    }
  };

  return (
    <div
      className="flex flex-col text-left justify-start p-4 m-4 border-2 bg-white rounded-lg"
      key={index}
    >
      <h3 className="font-bold">
        {index + 1}. {question.question}
      </h3>
      <AnswerButton
        answer={question.answer1}
        correctAnswer={question.correct_answer}
        handleClick={handleClick}
      >
        A
      </AnswerButton>
      <AnswerButton
        answer={question.answer2}
        correctAnswer={question.correct_answer}
        handleClick={handleClick}
      >
        B
      </AnswerButton>
      <AnswerButton
        answer={question.answer3}
        correctAnswer={question.correct_answer}
        handleClick={handleClick}
      >
        C
      </AnswerButton>
      <AnswerButton
        answer={question.answer4}
        correctAnswer={question.correct_answer}
        handleClick={handleClick}
      >
        D
      </AnswerButton>
      {answerSelected > 0 ? (
        answerSelected === 2 ? (
          <>
            <div className="text-green-400"> Correct! </div>
            <div>{question.explanation} </div>
          </>
        ) : (
          <div className="text-red-500"> Whoops! Try Again</div>
        )
      ) : (
        <div> </div>
      )}
      {/* <button className="text-left p-2 ml-8 hover:bg-blue-200 rounded-lg" >A) {question.answer1}</button>
  <button className="text-left p-2 ml-8 hover:bg-blue-200 rounded-lg">B) {question.answer2}</button>
  <button className="text-left p-2 ml-8 hover:bg-blue-200 rounded-lg">C) {question.answer3}</button>
  <button className="text-left p-2 ml-8 hover:bg-blue-200 rounded-lg">D) {question.answer4}</button> */}
    </div>
  );
};

export default Question;
