"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [error, setError] = useState("");
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") {
      console.log("reroute");
    }
  }, [session]); //add router to dependencies

  //const router = useRouter() ;
  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    console.log("email: " + email);
    console.log("password: " + password);

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }
    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      //if(res?.url)  router.replace("/dashboard") ;
    } else {
      console.log("Successfully logged in");
      router.replace("/dashboard");
      setError("");
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-[#212121] p-8 rounded-3xl shadow-md">
        <h1 className="text-4xl text-center font-semibold mb-8 text-white">Login</h1>
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
          <div className="text-red-700">{error}</div>
          <button
            type="submit"
            className="w-full text-white py-2 rounded bg-blue-300 hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <button
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          onClick={() => {
            signIn("github");
          }}
        >
          Sign In with Github
        </button>
        <Link
          href="/signup"
          className="block text-center text-blue-500 hover:underline mt-2"
        >
          Don't have an Account? Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
