'use client' ; 
import React, {useRef} from 'react'

const QuizInputSidebar = ({updateQuestions}) => {
  const userInput = useRef(null) ; 

  

  const handleClick = () => {
    console.log('handleClick')
    if(userInput.current){
        console.log('do we get here?') ; 
        const payload = {
            'text': userInput.current.value 
        }
        console.log(payload) ; 

        // Perform the POST request
        fetch('http://127.0.0.1:8000', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(payload),
        })
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();  // Parse the JSON from the response
        })
        .then(data => {
            updateQuestions(data.questions) ; 
            console.log('Response data:', data.questions);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
            }
        }


  return (
    <div className='flex flex-col p-4 min-h-screen rounded-2xl w-full md:w-1/3 border-2 shadow-md bg-white '>
        <p className='text-black '>Enter your text:</p>
        <textarea ref={userInput} className='p-2 m-4 h-56 rounded-lg border-black border-2' placeholder='Copy and paste some text here. Maximum 50,000 characters'  />
        <button onClick={handleClick} className='border-2 m-4 rounded-md bg-gradient-to-r from-blue-400 to-blue-500 text-white p-2'>Generate</button>
    </div>
  )
}

export default QuizInputSidebar ; 