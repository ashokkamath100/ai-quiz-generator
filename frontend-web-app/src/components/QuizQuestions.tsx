"use client";
import React, { useState } from "react";
import AnswerButton from "./AnswerButton";
import Question from "./Question";

interface Question {
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correct_answer: string;
  explanation: string ; 
  properties: Object;
}

interface QuizQuestionsProps {
  questions: Question[];
}

const QuizQuestions: React.FC<QuizQuestionsProps> = ({ questions }) => {
  console.log("Questions Type:", typeof questions); // Should log 'object'

  //questions = questions[0]
  // const parsedQuestions = questions.map(questionStr => {
  //     try {
  //       return JSON.parse(questionStr); // Parse the string into an object
  //     } catch (e) {
  //       console.error("Failed to parse question:", questionStr, e);
  //       return null; // Handle parsing error (optional)
  //     }
  //   }).filter(question => question !== null); // Filter out any null values from failed parsing
//   if (questions.length > 0) {
//     //questions = questions[0];
//     console.log(
//       "questions in quiz questions[0]:",
//       JSON.stringify(questions[0])
//     );
//     console.log(
//       "questions in quiz questions[1]:",
//       JSON.stringify(questions[1])
//     );
//     console.log("questions[0] question: ", questions[0].question);
//   }



  return (
    <>
      <div className="flex-grow m-8">
        <div>QuizQuestions</div>
        {Object.entries(questions).map(([key, question], index) => {
          return (
            <Question key={index} question={question} index={index} />
          )
        })}
      </div>
    </>
  );
};

export default QuizQuestions;
