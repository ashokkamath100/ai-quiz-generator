const StreakButton = ({title, paragraph, emoji}) => {
    return (
      <button className="flex items-center justify-between w-full bg-white shadow-md rounded-lg px-4 py-3 text-left hover:bg-gray-100 transition my-2">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-600">{paragraph}</p>
        </div>
        <div className="ml-4">
          <span className="text-2xl">{emoji}</span>
        </div>
      </button>
    );
  };

export default StreakButton;
