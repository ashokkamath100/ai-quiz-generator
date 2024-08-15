"use client";
import React, { useState } from "react";
import QuizInputSidebar from "@/components/QuizInputSidebar";
import QuizQuestions from "@/components/QuizQuestions";

const QuizGenerator = () => {
  const [questions, setQuestions] = useState([]);
  return (
    <>
      <h1 className="text-lg">QuizGenerator</h1>
      <div className="flex flex-row">
        <QuizInputSidebar updateQuestions={setQuestions} />
        <QuizQuestions questions={questions} />
      </div>
    </>
  );
};

export default QuizGenerator;
