import React from "react";
import GlobalStyle from "../assets/Prototype/GlobalStyle";
import { Bell, User } from "lucide-react";
import { FaSearch } from "react-icons/fa";
import logo from "../assets/Images/logo.png";

//logout function to clear the local storage key userData
const logout = () => {
  localStorage.removeItem("userData");
  window.location.href = "/";
};

export const Header = () => {
  const data = JSON.parse(localStorage.getItem("userData"));

  return (
    <div>
      {data? (<div className={GlobalStyle.fontNunito}>
        <div className="container flex justify-between items-center m-8 px-12">

          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="Logo"
              className="w-100 h-20"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <a href="#">
              <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
            </a>
            <a href="#">
              <User className="w-6 h-6 text-gray-600 cursor-pointer" />
            </a>
          </div>
        </div>

        <div>
          <hr className="border-t-2 border-black-200 w-370 mx-auto" />
        </div>

        <div className="flex items-center justify-between px-12 m-8 ">
          {/* Navigation Links */}
          <div className={GlobalStyle.headingMedium}>
            <div className={GlobalStyle.remarkTopic}>
              <nav className="gap-20 flex space-x-8">
                <a href="/" className="hover:font-bold hover:underline">
                  Home
                </a>
                <a
                  href="/resources"
                  className="hover:font-bold hover:underline"
                >
                  Resources
                </a>
                <a
                  href="/MoodJournaling/InstructionPage"
                  className="hover:underline hover:font-bold"
                >
                  Journaling
                </a>
                <a
                  href="/mood-tracking"
                  className="hover:font-bold hover:underline"
                >
                  Mood Tracking
                </a>
                <a
                  href="/activity-tracking"
                  className="hover:font-bold hover:underline"
                >
                  Activity Tracking
                </a>
              </nav>
            </div>
          </div>

          {/* Search and Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            {/* <div className="flex items-center bg-green-100 px-4 py-2 rounded-lg shadow-md">
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-sm placeholder-gray-600"
              />
              <button className="text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3a7 7 0 100 14 7 7 0 000-14zm0 12a5 5 0 110-10 5 5 0 010 10zm7-5a1 1 0 01-.293.707l-3 3a1 1 0 11-1.414-1.414L13.586 10H11a1 1 0 110-2h2.586l-1.293-1.293a1 1 0 011.414-1.414l3 3A1 1 0 0116 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div> */}

            
          </div>
        </div>
      </div>):""}
    </div>
  );
};
