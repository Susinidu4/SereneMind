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

export const Header = () => {
  const user = JSON.parse(localStorage.getItem("userData"));

  return (
    <div>
      {!user ? (
        <div className={`${GlobalStyle.fontNunito} pb-10`}>
          <div className="flex justify-between items-center m-4 px-12 pt-4">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Logo" className="w-90 h-18" />
            </div>

            {/* Icons */}
            <div className="flex items-end justify-end space-x-6 ml-auto ">
              <a href="#" title="notification">
                <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
              </a>
              <a href="/login" title="login">
                <User className="w-6 h-6 text-gray-600 cursor-pointer" />
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <hr className="border-t-2 border-black-200 w-330 mx-auto" />
          </div>

          <div className="flex items-center justify-between px-12 m-8 ">
            {/* Navigation Links */}
            <div className={GlobalStyle.headingMedium}>
              <div className={GlobalStyle.headingSmall}>
                <nav className="gap-12 flex space-x-8">
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
                  {/* <a
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
                  </a> */}
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
        </div>
      ) : user && user.role === "user" ? (
        <div className={`${GlobalStyle.fontNunito} pb-10`}>
          <div className="flex justify-between items-center m-4 px-12 pt-4">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Logo" className="w-90 h-18" />
            </div>

            {/* Icons */}
            <div className="flex items-end justify-end space-x-6 ml-auto ">
              <a href="#" title="notification">
                <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
              </a>
              <a href="/userprofile" title="dashboard">
                <User className="w-6 h-6 text-gray-600 cursor-pointer" />
              </a>
              <a onClick={logout} title="logout">
                <MdLogout className="w-6 h-6 text-gray-600 cursor-pointer" />
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <hr className="border-t-2 border-black-200 w-330 mx-auto" />
          </div>

          <div className="flex items-center justify-between px-12 m-8 ">
            {/* Navigation Links */}
            <div className={GlobalStyle.headingMedium}>
              <div className={GlobalStyle.headingSmall}>
                <nav className="gap-12 flex space-x-8">
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
        </div>
      ) : user && user.role === "admin" ? (
        <div className={`${GlobalStyle.fontNunito} pb-10`}>
          <div className="flex justify-between items-center m-4 px-12 pt-4">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Logo" className="w-90 h-18" />
            </div>

            {/* Icons */}
            <div className="flex items-end justify-end space-x-6 ml-auto ">
              <a href="#">
                <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
              </a>
              <a href="/admindashboard">
                <User className="w-6 h-6 text-gray-600 cursor-pointer" />
              </a>
              <a onClick={logout}>
                <MdLogout className="w-6 h-6 text-gray-600 cursor-pointer" />
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <hr className="border-t-2 border-black-200 w-330 mx-auto" />
          </div>

          <div className="flex items-center justify-between px-12 m-8 ">
            {/* Navigation Links */}
            <div className={GlobalStyle.headingMedium}>
              <div className={GlobalStyle.headingSmall}>
                <nav className="gap-12 flex space-x-8">
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
        </div>
      ) : ''}
    </div>
  );
};
