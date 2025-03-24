import React, { useState } from "react";
import { Header_2 } from "../../../components/Header_2";
import { Footer } from "../../../components/Footer";
import GlobalStyle from "../../../assets/Prototype/GlobalStyle";
import { AddNew } from "../../../pages/Main_Pages/Admin/AddNew";
import { Insights } from "../../../pages/Main_Pages/Admin/Insights";
import { Articles } from "../../../pages/Main_Pages/Admin/Articles";
import { IoPersonCircle } from "react-icons/io5";


export const Admin_Dashboard = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));

  // Redirect if user is already logged in
  if (userData && userData.role === "user") {
    window.location.href = '/userprofile';
  }
  // Redirect if user is already logged in
  if (!userData) {
    window.location.href = '/adminlogin';
  } 

  
  const [activeTab, setActiveTab] = useState("Insights");

  const renderContent = () => {
    switch (activeTab) {
      case "Insights":
        return <Insights />;
      case "Articles":
        return <Articles />;
      case "Add New":
        return <AddNew />;
      default:
        return <Insights />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF7]">
      <Header_2 />

      <main className="flex-grow mx-20">
        <div className={GlobalStyle.fontNunito}>
          {/* Profile picture */}
          <div className="mt-10 flex items-center justify-center space-x-4">
            <IoPersonCircle className="w-60 h-60 text-gray-600" />
          </div>

          {/* Tabs */}
          <div className=" p-8 mt-20">
            <div className="flex justify-center mb-8 space-x-6">
              <button
                className={`px-6 h-12 rounded-full text-lg font-semibold transition-colors duration-300 ease-in-out ${
                  activeTab === "Insights"
                    ? "bg-gradient-to-t from-[#007579] to-[#00B4A6] text-white shadow-lg"
                    : "bg-white text-[#143109] border-2 border-[#143109] hover:bg-[#00998F] hover:text-white hover:border-[#143109] focus:outline-none"
                }`}
                onClick={() => setActiveTab("Insights")}
              >
                Insights
              </button>
              <button
                className={`px-6 h-12 rounded-full text-lg font-semibold transition-colors duration-300 ease-in-out ${
                  activeTab === "Articles"
                    ? "bg-gradient-to-t from-[#007579] to-[#00B4A6] text-white shadow-lg"
                    : "bg-white text-[#143109] border-2 border-[#143109] hover:bg-[#00998F] hover:text-white focus:outline-none"
                }`}
                onClick={() => setActiveTab("Articles")}
              >
                Articles
              </button>
              <button
                className={`px-6 h-12 rounded-full text-lg font-semibold transition-colors duration-300 ease-in-out ${
                  activeTab === "Add New"
                    ? "bg-gradient-to-t from-[#007579] to-[#00B4A6] text-white shadow-lg"
                    : "bg-white text-[#143109] border-2 border-[#143109] hover:bg-[#00998F] hover:text-white hover:border-[#143109] focus:outline-none"
                }`}
                onClick={() => setActiveTab("Add New")}
              >
                Add New
              </button>
            </div>

            <div
              className={`${GlobalStyle.pageContainer} border-none p-4 mx-auto`}
            >
              {renderContent()}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
