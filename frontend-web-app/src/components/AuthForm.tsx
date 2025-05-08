"use client";
import Link from "next/link";
import { useFormState } from "react-dom";
import { signup } from "@/actions/auth-actions";
import { login } from "@/actions/auth-actions";

export default function AuthForm({ mode = "signup" }) {
  const action = mode === "signup" ? signup : login; // Dynamically select action
  const [formState, formAction] = useFormState(action, {});

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-sm bg-gray-800 p-6 rounded-lg shadow-lg">
        <form id="auth-form" action={formAction} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="mt-1 w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="mt-1 w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>
          {formState.errors && (
            <ul
              id="form-errors"
              className="list-disc list-inside text-red-500 text-sm"
            >
              {Object.keys(formState.errors).map((error) => (
                <li key={error}>{formState.errors[error]}</li>
              ))}
            </ul>
          )}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {mode === "signup" ? "Create Account" : "Login"}
            </button>
          </div>
          <p className="text-center text-sm text-gray-400">
            {mode === "signup" ? (
              <>
                Already have an account?{" "}
                <Link href="/login" className="text-blue-400 hover:underline">
                  Login with existing account.
                </Link>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <Link href="/signup" className="text-blue-400 hover:underline">
                  Create an account.
                </Link>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
