'use client';
import React, { useRef } from 'react';

type QuizInputSidebarProps = {
    updateQuiz: (newQuizData: any) => void;
    existingQuiz: any;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  };
  

const QuizInputSidebar: React.FC<QuizInputSidebarProps> = ({ updateQuiz, existingQuiz, setLoading }) => {
  const userInput = useRef<HTMLTextAreaElement | null>(null);

  const handleClick = () => {
    if (userInput.current) {
      const payload = {
        text: userInput.current.value,
        existing_quiz: existingQuiz && Object.keys(existingQuiz.questions).length > 0
          ? existingQuiz
          : undefined
      };

      const address = process.env.NEXT_PUBLIC_LAMBDA_API + 'create';
      setLoading(true); // Show loading spinner

      fetch(address, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log("Returned quiz:", data.quiz);
          updateQuiz(data.quiz); // whole quiz object including title, description, merged questions
          console.log('Response data:', data);
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
  };

  return (
    <div className='flex flex-col p-4 min-h-screen rounded-2xl w-full md:w-1/3 border-2 shadow-md bg-white '>
      <p className='text-black'>Enter your text:</p>
      <textarea
        ref={userInput}
        className='p-2 m-4 h-56 rounded-lg border-black border-2'
        placeholder='Copy and paste some text here. Maximum 50,000 characters'
      />
      <button
        onClick={handleClick}
        className='border-2 m-4 rounded-md bg-gradient-to-r from-blue-400 to-blue-500 text-white p-2'
      >
        Generate
      </button>
    </div>
  );
};

export default QuizInputSidebar;
