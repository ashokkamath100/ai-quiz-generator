import Link from "next/link";

type Quiz = {
  _id: string;
  creationTime: string; // Change to `Date` if needed
  numPlays: number;
  numQuestions: number;
  title: string;
  description: string;
};

type QuizCardProps = {
  quiz: Quiz;
};

const QuizCard: React.FC<QuizCardProps> = ({ quiz, onDelete }) => {
  const { _id, creationTime, numPlays, numQuestions, title, description } = quiz;


  const handleDelete = async (e: React.MouseEvent) => {
    // Prevent the click event from propagating to the Link
    e.stopPropagation();

    try {
      const address = process.env.NEXT_PUBLIC_LAMBDA_API + 'deleteQuiz/' + _id;
      const response = await fetch(address, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Quiz deleted successfully!");
        // Optionally refresh or update the UI here
        onDelete(_id)
      } else {
        console.error("Failed to delete quiz:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };
  return (
    <div className="rounded-lg border border-gray-800 my-4 p-4">
      <div className="flex flex-row justify-between items-center">
        <Link href={`/learn/${_id}`} className="flex-grow">
          <div className="cursor-pointer">
            <p className="text-sm">
              Creation Time: {creationTime} - Plays: {numPlays} - Questions:{" "}
              {numQuestions}
            </p>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-med">{description}</p>
          </div>
        </Link>
        <button
          onClick={handleDelete}
          className="ml-4 text-white p-2 rounded hover:bg-red-600"
        >
          🗑
        </button>
      </div>
    </div>
  );
};

export default QuizCard;

// const QuizCard = () => {

//     return (
//         <div className="rounded-lg border border-gray-800 my-4">
//             <p className="text-sm">Creation time - NumPlays - NumQuestions</p>
//             <h1 className="text-3xl">OS Recovery and Persistence</h1>
//             <p className="text-lg">Quiz descriptionasjfal;sdkjfa;slkdfja;skdjf ;as jfda;s fj;ask jf;asdjf;akjdf;aj;fajdd;ajsdf;akjs;dfj</p>
//         </div>
//     ) ;
// }

//export default QuizCard ;
