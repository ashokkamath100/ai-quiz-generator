"use client";
import React, { useState } from "react";
import QuizInputSidebar from "@/components/QuizInputSidebar";
import QuizQuestions from "@/components/QuizQuestions";

const QuizGenerator = () => {
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    creation_time: "",
    numPlays: 0,
    questions: {}
  });

  const [loading, setLoading] = useState(false);


  const updateQuestions = (newQuizData: any) => {
    console.log('newQuizData:', newQuizData);
    setQuiz(prev => {
      const mergedQuestions = {
        ...(prev.questions || {}),
        ...(newQuizData.questions || {})
      };
    
      return {
        ...prev,
        ...newQuizData,
        questions: mergedQuestions
      };

    })
    setLoading(false);
  };

  return (
    <>
      <h1 className="text-lg bg-white p-4 shadow-lg rounded-2xl">Generate</h1>
      <div className="flex flex-row">
      <QuizInputSidebar updateQuiz={updateQuestions} existingQuiz={quiz} setLoading={setLoading} />
      <QuizQuestions questions={Object.values(quiz.questions)} loading={loading} />

      </div>
    </>
  );
};

export default QuizGenerator;
