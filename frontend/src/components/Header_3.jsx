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
          <div className=" border-b-2 border-black-200 py-5 flex flex-row items-center">
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

          <div className="mt-5">
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
                <a href="/selfcareplanes">Activity Tracking</a>
              </li>
            </ul>

            <div>
              
            </div>
          </div>
        </div>
      ) : !date ? (
        <div className={GlobalStyle.fontNunito}>
        <div className=" border-b-2 border-black-200 py-5 flex flex-row items-center">
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
            
            </ul>
          </div>
        </div>

        <div className="mt-5">
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
              <a href="/selfcareplanes">Activity Tracking</a>
            </li>
          </ul>

          <div>
            
          </div>
        </div>
      </div>
      ) : (
        ""
      )}
    </div>
  );
};
