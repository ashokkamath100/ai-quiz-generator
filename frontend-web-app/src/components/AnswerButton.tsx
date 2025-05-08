import React from "react";

type AnswerButtonProps = {
  answer: string; // Replace `string` with the appropriate type if needed
  correctAnswer: string; // Replace `string` with the appropriate type
  handleClick: (answer: string, correctAnswer: string) => void; // Function type for the click handler
  children: React.ReactNode; // For JSX children
};

const AnswerButton: React.FC<AnswerButtonProps> = ({ answer, correctAnswer, handleClick, children }) => {
  


    return (
    <button className="text-left ml-8 hover:bg-blue-200 rounded-lg" onClick={() => handleClick(answer, correctAnswer)}>
      {children}) {answer}
    </button>
  );
};

export default AnswerButton;
