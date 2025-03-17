import React from "react";
import GlobalStyle from "../../assets/Prototype/GlobalStyle";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import bg_image1 from "../../assets/Images/activity1.png";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";


export const ActivityTracking = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/Activity_Tracking/ActivityTracking");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF7]">
      <Header />
      <main className="flex-grow mx-20">
        <div className={GlobalStyle.fontNunito}>
          <h1 className={`${GlobalStyle.headingLarge} `}>Self Care Activity Tracking </h1>
          <IoArrowBack className="text-gray-700 cursor-pointer" size={24} />
          <br />
        </div>

        {/* Page Content */}
        {/* Content Section */}
        <main className="flex-grow flex justify-center items-center">
          <div className={`${GlobalStyle.pageContainer} px-25`}>
          <div className="flex justify-between items-center">
            <p className={GlobalStyle.headingMedium}>Title - Lorem ipsum dolor</p>
            <p  className={GlobalStyle.headingMedium}>Duration: 1 Week</p>
          </div>
        <p  className={GlobalStyle.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id turpis nec nisl laoreet faucibus.
        </p>
      <div className="mt-6 space-y-3">
      {[...Array(7)].map((_, index) => (
        <div
          key={index}
          className="flex justify-between items-center border p-3 rounded-md bg-gray-50 shadow-sm"
          
        >
          <span>Day {index + 1 }  <br />
          </span>
          
          <div className="flex gap-3">
            <FaEdit className="text-gray-500 cursor-pointer" />
            <FaTrash className="text-red-500 cursor-pointer" />
            
          </div>
        </div>
        
      ))}
    </div>
  </div>
</main>

        {/* Ad Banner */}
        <div>
          <img 
            src={bg_image1}
            alt="Ad"
            className="w-150 h-150 mx-auto mt-16"
          />
        </div>

      </main>

      <Footer />
    </div>
  );
};
