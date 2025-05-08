import StreakButton from "@/components/HomeSideButton";
import QuickStartButton from "@/components/QuickStartButton";
const Home = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-4 gap-4">
      {" "}
      {/* Wrapper with margin */}
      <div className="col-span-4 mb-8">
        {" "}
        {/* Title section */}
        <h1 className="text-4xl">Welcome User!</h1>
        <div className="mt-2 h-1 bg-gray-300"></div>{" "}
        {/* Line under the title */}
      </div>
      <div className="col-span-3">
        <h2 className="text-lg p-4">Quick Start</h2>
        <div className="flex flex-row justify-between">
          <QuickStartButton
            emoji="✨"
            name="Generate"
            description="Transform anything into flashcards, quizzes, and podcasts."
            link="quizGenerator"
          />
          <QuickStartButton
            emoji="🖼"
            name="Solve a question"
            description="Upload a question and get a step by step guide to solve it"
          />
          <QuickStartButton
            emoji="💬"
            name="Chat to PDF"
            description="Upload your document and ask or generate from it "
          />
        </div>
      </div>
      <div className="col-span-1 flex flex-col">
        <StreakButton title={"You're on a 1 day streak"} paragraph={"Practice each day so your streak won't reset"} emoji={"🔥"} />
        <StreakButton title={"Invite your friends!"} paragraph={"Learning together is double the progress and double the fun!"} />
      </div>
    </div>
  );
};

export default Home;
