"use client";
import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";

const NavBar = () => {
  //const { data: session }: any = useSession();

  return (
    <div>
      {/* {!session ? (

      ) : ( */}

      <ul className="p-4 flex justify-between bg-gradient-to-r from-blue-400 to-blue-500 text-white items-center">
        <div className="flex w-1/4 flex-row justify-around">
          <div className="text-3xl">QuizBear 🐻</div>
          <div>
            <Link href="/features">Features</Link>
          </div>
          <div>
            <Link href="/pricing">Pricing</Link>
          </div>
          <div>
            <Link href="/resources">Resources</Link>
          </div>
        </div>
        <div className="">
          <input
            placeholder="🔍  Search"
            className="p-2 flex-grow rounded "
            type="search"
          ></input>
        </div>
        <div className="flex w-1/4 flex-row justify-around">
          <div className="p-4">
            <Link href="/login">Login</Link>
          </div>
          <div className="p-4">
            <Link href="/signup">Sign Up</Link>
          </div>
        </div>
      </ul>

      {/* //)} */}
    </div>
  );
};

export default NavBar;
