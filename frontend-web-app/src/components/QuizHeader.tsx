import React from "react";

const QuizHeader = ({ title, description }: { title: string; description: string }) => (
  <div className="mb-6">
    <h1 className="text-4xl font-bold">{title}</h1>
    <p className="text-lg text-gray-700 mt-2">{description}</p>
  </div>
);

export default QuizHeader;
