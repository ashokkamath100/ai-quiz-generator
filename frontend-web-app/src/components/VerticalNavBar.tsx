import React from "react";
import Link from "next/link";
import { logout } from "@/actions/auth-actions";

const VerticalNavBar = () => {
  return (
    <div className="fixed top-28 left-0 h-auto w-56 bg-white shadow-md flex flex-col justify-between p-4 rounded-2xl m-2">
      {/* Top Navigation Links */}
      <div>
        <ul className="space-y-6">
          {/* Home */}
          <li className="font-medium text-gray-800">
            <a href="#" className="flex items-center gap-3 hover:text-blue-500">
              <span>🏠</span>
              <Link href="/home">Home</Link>
            </a>
          </li>

          {/* My Library */}
          <li className="text-gray-600">
            <a href="#" className="flex items-center gap-3 hover:text-blue-500">
              <span>📚</span>
              <Link href="/myLibrary">My Library</Link>
            </a>
          </li>

          {/* Search */}
          <li className="text-gray-600">
            <a href="#" className="flex items-center gap-3 hover:text-blue-500">
              <span>🔍</span>
              <span>Search</span>
            </a>
          </li>

          {/* LEARN Section */}
          <li className="uppercase text-sm text-gray-400 mt-6">Learn</li>
          <li className="text-gray-600 flex justify-between items-center">
            <a href="#" className="flex items-center gap-3 hover:text-blue-500">
              <span>📝</span>
              <span>Solve</span>
            </a>
            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
              New
            </span>
          </li>
          <li className="text-gray-600 flex justify-between items-center">
            <a href="#" className="flex items-center gap-3 hover:text-blue-500">
              <span>💬</span>
              <span>Chat to PDF</span>
            </a>
            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
              New
            </span>
          </li>
          <li className="text-gray-600">
            <a href="#" className="flex items-center gap-3 hover:text-blue-500">
              <span>🌐</span>
              <span>Discover</span>
            </a>
          </li>

          {/* MORE Section */}
          <li className="uppercase text-sm text-gray-400 mt-6">More</li>
          <li className="text-gray-600">
            <a href="#" className="flex items-center gap-3 hover:text-blue-500">
              <span>📱</span>
              <span>Mobile App</span>
            </a>
          </li>
          <li className="text-gray-600">
            <a href="#" className="flex items-center gap-3 hover:text-blue-500">
              <span>⚙️</span>
              <span>Support</span>
            </a>
          </li>
          <li className="text-gray-600">
            <a href="#" className="flex items-center gap-3 hover:text-blue-500">
              <span>🚪</span>
              <form action={logout}>
                <button>
                  <span>Logout</span>
                </button>
              </form>
            </a>
          </li>
        </ul>
      </div>

      {/* Bottom Button */}
      <div>
        <button className="w-full mt-32 bg-purple-600 text-white py-3 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-purple-700 transition">
          <span>✨</span>
          <Link href="/quizGenerator">Generate</Link>
        </button>
      </div>
    </div>
  );
};

export default VerticalNavBar;
