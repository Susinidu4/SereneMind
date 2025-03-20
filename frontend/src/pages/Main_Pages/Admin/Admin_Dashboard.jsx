import React, { useState } from "react";
import { Header_2 } from "../../../components/Header_2";
import { Footer } from "../../../components/Footer";
import GlobalStyle from "../../../assets/Prototype/GlobalStyle";
import { AddNew } from "../../../pages/Main_Pages/Admin/AddNew";
import { Insights } from "../../../pages/Main_Pages/Admin/Insights";
import { Articles } from "../../../pages/Main_Pages/Admin/Articles";
import { IoPersonCircle } from "react-icons/io5";

export const Admin_Dashboard = () => {
  const data = JSON.parse(localStorage.getItem("userData"));
  if (
    !data?.role === "admin" ||
    !data?.role === "Admin" ||
    !data?.role === "ADMIN"
  ) {
    window.location.href = "/adminlogin";
  }

  try {
    const data = JSON.parse(localStorage.getItem("userData"));
    console.log("Admin data:", data.role);
  } catch (e) {
    console.log("Error in parsing the data:", e);
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
          <h1 className={`${GlobalStyle.headingLarge} `}>Admin Dashboard</h1>

          {/* Profile picture */}
          <div className="mt-20 flex items-center justify-center space-x-4">
            <IoPersonCircle className="w-60 h-60 text-gray-600" />
          </div>

          {/* Tabs */}
          <div className="bg-[#DFF3E3] rounded-lg shadow-lg p-8 mt-20">
            <div className="flex justify-center mb-8 space-x-4">
              <button
                className={`px-4 py-2 rounded-lg font-semibold ${
                  activeTab === "Insights"
                    ? "bg-[#143109] text-white"
                    : "bg-white text-[#143109] border border-[#143109]"
                }`}
                onClick={() => setActiveTab("Insights")}
              >
                Insights
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-semibold ${
                  activeTab === "Articles"
                    ? "bg-[#143109] text-white"
                    : "bg-white text-[#143109] border border-[#143109]"
                }`}
                onClick={() => setActiveTab("Articles")}
              >
                Articles
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-semibold ${
                  activeTab === "Add New"
                    ? "bg-[#143109] text-white"
                    : "bg-white text-[#143109] border border-[#143109]"
                }`}
                onClick={() => setActiveTab("Add New")}
              >
                Add New
              </button>
            </div>
            <div className="bg-[#DFF3E3] rounded-lg p-8">
              {renderContent()}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
