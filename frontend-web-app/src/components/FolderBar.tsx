const FolderBar = () => {

    const folders = ['Computer Networks', 'AOS'] 
  return (
    <div className="my-4">
      <h3>Folders</h3>
      <div className="flex space-x-4">
        {
            folders.map( (i) => (
                <div key={i} className="bg-white p-2 rounded-md">
                    {i}
                </div>
            ))
        }
      </div>
    </div>
  );
};

export default FolderBar;
