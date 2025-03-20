import React, { useState } from "react";
import GlobalStyle from "../../assets/Prototype/GlobalStyle";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import bg_image1 from "../../assets/Images/activity1.png";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { IoClose } from "react-icons/io5"; // Import Close Icon

export const ActivityTracking = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [activityData, setActivityData] = useState("");
  const [progress, setProgress] = useState(0); // Add progress state

  const openModal = (day) => {
    setSelectedDay(day);
    setShowModal(true);
    setProgress(0); // Reset progress when modal is opened
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDay(null);
    setActivityData("");
  };

  const handleSave = () => {
    console.log(`Activity for Day ${selectedDay}:`, activityData);
    closeModal();
  };

  // Function to simulate progress (you can replace this with real-time updates based on user input)
  const handleProgressChange = (event) => {
    const newProgress = Math.min(100, Math.max(0, event.target.value)); // Limit between 0 and 100
    setProgress(newProgress);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF7]">
      <Header />
      <main className="flex-grow mx-20">
        <div className={GlobalStyle.fontNunito}>
          <h1 className={`${GlobalStyle.headingLarge}`}>Self Care Activity Tracking</h1>
          <IoArrowBack className="text-gray-700 cursor-pointer" size={24} />
          <br />
        </div>

        <main className="flex-grow flex justify-center items-center">
          <div className={`${GlobalStyle.pageContainer} px-25`}>
            <div className="flex justify-between items-center">
              <p className={GlobalStyle.headingMedium}>Title - Lorem ipsum dolor</p>
              <p className={GlobalStyle.headingMedium}>Duration: 1 Week</p>
            </div>
            <p className={GlobalStyle.paragraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id turpis nec nisl laoreet faucibus.
            </p>
            <div className="mt-6 space-y-3">
              {[...Array(7)].map((_, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border p-3 rounded-md bg-gray-50 shadow-sm cursor-pointer"
                  onClick={() => openModal(index + 1)}
                >
                  <span>Day {index + 1}</span>
                  <div className="flex gap-3">
                    <FaEdit className="text-gray-500" />
                    <FaTrash className="text-red-500" />
                  </div>
                </div>
                
              ))}
          <br/>
          <br/>

            </div>
          </div>

        </main>

        <div>
          <img src={bg_image1} alt="Ad" className="w-150 h-150 mx-auto mt-16" />
        </div>
      </main>
      <Footer />

      {/* Conditionally Render Form as Part of the Page */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center backdrop-blur-lg">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full border border-gray-300 relative">
            {/* Close Icon inside the Popup Container */}
            <div className="absolute top-2 right-2">
              <IoClose 
                className="text-gray-500 cursor-pointer" 
                size={24} 
                onClick={closeModal} 
              />
            </div>
            
            <h2 className="text-lg font-bold mb-4">Log Activity for Day {selectedDay}</h2>
            <p className={GlobalStyle.headingMedium}>Notes</p>
            <textarea
              className="w-full border p-2 mt-2 rounded-md bg-white"
              placeholder="Enter activity details..."
              value={activityData}
              onChange={(e) => setActivityData(e.target.value)}
            ></textarea>
            
            {/* Time Duration Progress Bar */}
            <div className="mt-4">
            <p className={GlobalStyle.headingMedium}>Time Progress </p>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleProgressChange}
                className="w-full mt-2"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>0%</span>
                <span>100%</span>
              </div>
              <div className="h-2 bg-blue-200 rounded-full mt-2">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-4">
            <div className="flex gap-4">
        
            <button className={GlobalStyle.buttonPrimary} onClick={handleSave}>Submit</button>
          </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
