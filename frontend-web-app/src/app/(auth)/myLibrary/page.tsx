"use client" ; 
import React, { useState, useEffect } from "react";
import FolderBar from "@/components/FolderBar";
import QuizCard from "@/components/QuizCard";


const MyLibrary = () => {
    const [libraryData, setLibraryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLibraryData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/myLibrary');
                console.log(response) ; 
                if (!response.ok) {
                    throw new Error("Failed to fetch library data");
                }
                const data = await response.json();
                setLibraryData(data !== null ? data.quizzes : []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLibraryData();
    }, []); // Dependency array empty to run on component mount

    return (
        <div className="mx-56 my-10">
            <h1 className="text-4xl">My Library</h1>
            <FolderBar />
            <search />

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            {libraryData.length > 0 ? (
                libraryData.map((quiz, index) => (
                    <QuizCard key={index} quiz={quiz} />
                ))
            ) : (
                !loading && <p>No quizzes found.</p>
            )}
        </div>
    );
};

export default MyLibrary ; 