"use client"
import React from "react";

interface QuickStartButtonProps {
  emoji: string;
  name: string;
  description: string;
  link: string;
}

const QuickStartButton: React.FC<QuickStartButtonProps> = ({ emoji, name, description, link }) => {
  const handleClick = () => {
    window.location.href = link;
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col items-start bg-white p-6 rounded-2xl shadow-md w-64 h-48 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="bg-blue-100 p-3 rounded-lg mb-4">
        <div>{emoji}</div>
      </div>
      <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  );
};

export default QuickStartButton;
