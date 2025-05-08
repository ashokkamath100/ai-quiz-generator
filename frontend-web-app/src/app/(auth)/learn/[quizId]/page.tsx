import QuizQuestions from "@/components/QuizQuestions";
import QuizHeader from "@/components/QuizHeader";
import StudyModeOptions from "@/components/StudyModeOptions";
import MasteryInsights from "@/components/MasteryInsights";
import React from "react";

async function fetchQuiz(quizId: string) {
  const response = await fetch(`http://127.0.0.1:8000/quiz/${quizId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Failed to fetch quiz data");
  return response.json();
}

export default async function QuizDetails({
  params,
}: {
  params: { quizId: string };
}) {
  const { quizId } = params;

  let quiz;
  try {
    const data = await fetchQuiz(quizId);
    quiz = data.quiz;
  } catch (error) {
    return (
      <div className="text-red-500 p-8 mx-56">
        Error loading quiz:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  if (!quiz) return <div className="p-8 mx-56">No quiz found.</div>;

  return (
    <div className="px-2 py-4 mx-auto max-w-8xl sm:px-4 lg:px-6">
      <div className="bg-gradient-to-br from-sky-100 via-sky-200 to-sky-300 rounded-2xl p-8 shadow-xl">
        <QuizHeader title={quiz.title} description={quiz.description} />
        <StudyModeOptions />
        <MasteryInsights />
        <h2 className="text-2xl font-semibold mt-8 mb-4">Questions:</h2>
        <QuizQuestions
          questions={Object.values(quiz.questions)}
          loading={false}
        />
      </div>
    </div>
  );
}
