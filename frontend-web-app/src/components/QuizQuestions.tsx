"use client";
import React from "react";
import Question from "./Question";

export interface QuestionInterface {
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correct_answer: string;
  explanation: string;
  properties: Object;
}

interface QuizQuestionsProps {
  questions: QuestionInterface[];
  loading: boolean;
}

const QuizQuestions: React.FC<QuizQuestionsProps> = ({ questions, loading }) => {
  console.log('questions: ', questions)
  return (
    <div className="flex-grow m-8">
      {(!questions || questions.length === 0) && !loading && (
        <p>No questions available at the moment. Please check back later!</p>
      )}
      
      {questions.length > 0 && questions.map((question, index) => (
        <Question key={index} question={question} index={index} />
      ))}

      {loading && (
        <div className="mt-6 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 border-solid"></div>
        </div>
      )}
    </div>
  );
};

export default QuizQuestions;
