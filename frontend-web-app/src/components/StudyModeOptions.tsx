import React from "react";
import StudyModeButton from "@/components/StudyModeButton";

const StudyModeOptions = () => (
  <div className="my-6">
    <h2 className="text-lg font-semibold mb-2">Choose a study mode</h2>
    <div className="flex flex-wrap gap-4">
      <StudyModeButton text="Play Quiz" />
      <StudyModeButton text="Study Flashcards" />
      <StudyModeButton text="Spaced Repetition" />
      <StudyModeButton text="Chat to lesson" />
    </div>
  </div>
);

export default StudyModeOptions;
