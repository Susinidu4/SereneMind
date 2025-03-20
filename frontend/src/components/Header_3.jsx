import React from "react";
import GlobalStyle from "../assets/Prototype/GlobalStyle";
import { Bell, User } from "lucide-react";
import { FaSearch } from "react-icons/fa";
import logo from "../assets/Images/logo.png";
import { MdLogout } from "react-icons/md";

//logout function to clear the local storage key userData
const logout = () => {
  localStorage.removeItem("userData");
  window.location.href = "/";
};

export const Header_3 = () => {
  const data = JSON.parse(localStorage.getItem("userData"));
  console.log(data);

  return (
    <div>
      {data ? (
        <div className={GlobalStyle.fontNunito}>
          <div className=" border-b-2 border-black-200 py-2 flex flex-row items-center">
            <div className="logo-section flex-1 items-center px-10">
              <img src={logo} alt="Logo" className="w-[200px] h-[50px]" />
            </div>

            <div className="ml-auto px-10">
              {" "}
              {/* Added ml-auto here */}
              <ul className="flex flex-row gap-8 ">
                <li>
                  <a href="#">
                    <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
                  </a>
                </li>
                <li>
                  <a href="/login">
                    <User className="w-6 h-6 text-gray-600 cursor-pointer" />
                  </a>
                </li>
                <li>
                  <a>
                    <MdLogout onClick={logout} className="w-6 h-6 text-gray-600 cursor-pointer" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="">
            <ul className="flex flex-row gap-20 py-2 px-20">
              <li className="text-[18px] font-semibold hover:font-bold hover:underline">
                <a href="/">Home</a>
              </li>
              <li className="text-[18px] font-semibold hover:font-bold hover:underline">
                <a href="/resources">Resources</a>
              </li>
              <li className="text-[18px] font-semibold hover:font-bold hover:underline">
                <a href="/MoodJournaling/InstructionPage">Journaling</a>
              </li>
              <li className="text-[18px] font-semibold hover:font-bold hover:underline">
                <a href="/moodtracking">Mood Tracking</a>
              </li>
              <li className="text-[18px] font-semibold hover:font-bold hover:underline">
                <a href="/activity-tracking">Activity Tracking</a>
              </li>
            </ul>

            <div>
              
            </div>
          </div>
        </div>
      ) : !date ? (
        <div className={GlobalStyle.fontNunito}>
          <div className="container flex justify-between items-center m-8 px-12">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Logo" className="w-100 h-20" />
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
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
