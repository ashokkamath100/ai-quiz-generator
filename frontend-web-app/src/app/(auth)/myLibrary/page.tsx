"use client" ; 
import React, { useState, useEffect } from "react";
import FolderBar from "@/components/FolderBar";
import QuizCard from "@/components/QuizCard";


const MyLibrary = () => {
    const [libraryData, setLibraryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLibraryData = async () => {
            try {
                console.log('process.env.NEXT_PUBLIC_LAMBDA_API: ' + process.env.NEXT_PUBLIC_LAMBDA_API)  

                const address = process.env.NEXT_PUBLIC_LAMBDA_API + 'myLibrary'
                console.log('address: ' + address)  
                const response = await fetch(address);
                console.log(response) ; 
                if (!response.ok) {
                    throw new Error("Failed to fetch library data");
                }
                const data = await response.json();
                setLibraryData(data !== null ? data.quizzes : []);
            } catch (err) {
                if(err instanceof Error){
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchLibraryData();
    }, []); // Dependency array empty to run on component mount

    const deleteQuizById = (id: string) => {
        setLibraryData(prev => prev.filter(q => q._id !== id));
    };

    return (
        <div className="px-2 py-4 mx-auto max-w-8xl sm:px-4 lg:px-6">
            <div className="bg-gradient-to-br from-sky-100 via-sky-200 to-sky-300 rounded-2xl p-10 shadow-xl">
                <h1 className="text-4xl">My Library</h1>
                <FolderBar />
                <search />

                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">Error: {error}</p>}

                {libraryData.length > 0 ? (
                    libraryData.slice().reverse().map((quiz, index) => (
                        <QuizCard key={index} quiz={quiz} onDelete={deleteQuizById} />
                    ))
                ) : (
                    !loading && <p>No quizzes found.</p>
                )}
            </div>
        </div>
    );
};

export default MyLibrary ; 