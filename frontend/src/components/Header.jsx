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
      {data || 
      !data? (<div className={GlobalStyle.fontNunito}>
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
            <a href="/login">
              <User className="w-6 h-6 text-gray-600 cursor-pointer" />
            </a>
          </div>
        </div>
        

        <div className="flex justify-center">
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
                  href="/ResourceManagement/OnlineResource"
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
                  href="/moodtracking"
                  className="hover:font-bold hover:underline"
                >
                  Mood Tracking
                </a>
                <a
                  href="/selfcareplanes"
                  className="hover:font-bold hover:underline"
                >
                  Activity Tracking
                </a>
              </nav>
            </div>
          </div>

          {/* Search and Icons */}
          {/* <div className="flex items-center space-x-4"> */}
            {/* Search Bar */}
            {/* <div className="flex items-center border-1 border-[#007579] hover:border-2 px-4 py-2 rounded-lg shadow-md w-70 h-10">

              <input
                type="text"
                placeholder="Search"
                className="text-[#007579] outline-none text-sm placeholder-[#007579]"
              />
              <button className="text-[#007579] ml-auto">
              <FaSearch className=""/>
              </button>
            </div>
          </div> */}
          
        </div>
      </div>):""}
    </div>
  );
};
