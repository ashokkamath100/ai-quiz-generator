import QuizQuestions from "@/components/QuizQuestions";
import React from "react";

async function fetchQuiz(quizId: string) {
    const response = await fetch(`http://127.0.0.1:8000/quiz/${quizId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store", // Avoid caching for fresh data
    });

    if (!response.ok) {
        throw new Error("Failed to fetch quiz data");
    }
    console.log(response) ; 
    return response.json();
}

export default async function QuizDetails({ params }: { params: { quizId: string } }) {
    const { quizId } = params;

    let quiz;
    try {
        const data = await fetchQuiz(quizId);
        quiz = data.quiz;
        //questions = quiz.questions ; 
        console.log('quiz: ' + JSON.stringify(quiz.questions)) ; 
    } catch (error) {
        return (
            <div className="text-red-500">
                Error loading quiz: {error.message || "Unknown error"}
            </div>
        );
    }

    if (!quiz) {
        return <div>No quiz found.</div>;
    }

    return (
        <div className="p-8 mx-56">
            <h1 className="text-4xl font-bold">{quiz.title}</h1>
            <p className="text-med">{quiz.description}</p>
            <h1 className="text-lg">Choose a study mode</h1>
            <div className="flex flex-row justify-between">
                <button>Play Quiz</button>
                <button>Study Flashcards</button>
                <button>Spaced Repetition</button>
                <button>Chat to lesson</button>
            </div>
            <h1>Insights</h1>
            <div>
                <h2>Mastery Score</h2>
                <p>Your Mastery Score reflects how well you know a topic. Improve it by answering 
                    more questions correctly and reviewing often. </p>
            </div>
            <h2 className="text-2xl mt-6">Questions:</h2>
            <ul>
                <QuizQuestions questions={quiz.questions} />
                {/* {quiz.questions && Object.values(quiz.questions).map((q: any, index: number) => (
                    <li key={index} className="my-2">
                        <h3 className="text-lg font-semibold">Question {index + 1}:</h3>
                        <p>{q.question}</p>
                        <ul className="pl-4">
                            <li>1. {q.answer1}</li>
                            <li>2. {q.answer2}</li>
                            <li>3. {q.answer3}</li>
                            <li>4. {q.answer4}</li>
                        </ul>
                        <p className="font-semibold">Correct Answer: {q.correct_answer}</p>
                        <p className="text-gray-500 text-sm">Explanation: {q.explanation}</p>
                    </li>
                ))} */}
            </ul>
        </div>
    );
    
}
