'use client'

import React from 'react'
import Link from 'next/link'

const QuizBearBanner: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white py-4 px-6 shadow-md rounded-xl mb-6 flex flex-col md:flex-row items-center justify-between animate-fade-in">
      <div className="flex items-center space-x-4">
        {/* Logo: Swap this with your own logo <img src="/logo.svg" alt="QuizBear" /> */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight">QuizBear</h2>
          <p className="text-sm mt-1">Generate quizzes instantly from anything you paste!</p>
        </div>
      </div>
    </div>
  )
}

export default QuizBearBanner
