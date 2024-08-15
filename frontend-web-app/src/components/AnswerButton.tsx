import React from "react";

const AnswerButton = ({answer, correctAnswer, handleClick, children}) => {
  


    return (
    <button className="text-left p-2 ml-8 hover:bg-blue-200 rounded-lg" onClick={() => handleClick(answer, correctAnswer)}>
      {children}) {answer}
    </button>
  );
};

export default AnswerButton;
