'use client' ; 
import { redirect } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Signup = () => {
    const [error,setError] = useState("") ; 
    const router = useRouter() ; 
    const isValidEmail = (email: string) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i ; 
        return emailRegex.test(email) ; 
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault() ; 
        const email = e.target[0].value ; 
        const password = e.target[1].value ; 

        console.log('email: ' + email) ; 
        console.log('password: ' + password) ; 

        if(!isValidEmail(email)){
            setError("Email is invalid")
            return ; 
        }
        if(!password || password.length < 8){
            setError("Password is invalid")
            return ; 
        }

        try {
            const res = await fetch('api/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            if(res.status === 400){
                setError("This email is already registered")  ;
            }
            if(res.status === 200){
                console.log('registered successfully') ; 
                setError("") ; 
                //redirect("/login") ; 
                router.push('/login') ; 
            }
        } catch (error: any){

        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="bg-[#212121] p-8 rounded-3xl shadow-md">
            <h1 className="text-4xl text-center font-semibold mb-8 text-white">Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
                    placeholder="Password"
                    required
                />
                <div className="text-red-700">
                    {error}
                </div>
                <button
                    type="submit"
                    className="w-full text-white py-2 rounded bg-blue-300 hover:bg-blue-600"
                >
                    Sign Up
                </button>
            </form>
            <Link href="/login" className="block text-center text-blue-500 hover:underline mt-2">
                Login with Existing Account
            </Link>
        </div>
        </div>
    );
    };

export default Signup;
