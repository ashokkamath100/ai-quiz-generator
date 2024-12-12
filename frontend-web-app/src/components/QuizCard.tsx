import Link from "next/link";

const QuizCard = ({ quiz }) => {
  const { _id, creationTime, numPlays, numQuestions, title, description } = quiz;


  const handleDelete = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/deleteQuiz/${_id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log('Quiz deleted successfully!');
        // Optionally refresh or update the UI here
      } else {
        console.error('Failed to delete quiz:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };
  return (
    <Link href={`/learn/${_id}`}>
      <div className="rounded-lg border border-gray-800 my-4 p-4">
        <div className="flex flex-row justify-between">
          <p className="text-sm">
            Creation Time: {creationTime} - Plays: {numPlays} - Questions:{" "}
            {numQuestions}
          </p>
          <button onClick={handleDelete}>🗑</button>
        </div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-med">{description}</p>
      </div>
    </Link>
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
