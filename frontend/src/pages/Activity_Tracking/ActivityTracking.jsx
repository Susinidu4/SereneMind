import React, { useState, useEffect } from "react";
import GlobalStyle from "../../assets/Prototype/GlobalStyle";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import bg_image1 from "../../assets/Images/tracking.png";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoArrowBack, IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

export const ActivityTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [activityData, setActivityData] = useState("");
  const [progress, setProgress] = useState(0);
  const [plane, setPlane] = useState([]);
  const [actualTime, setActualTime] = useState("");

  const fetchPlane = async () => {
    try {
      const response = await fetch(`http://localhost:5000/suggestions/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch plane");
      }
      const data = await response.json();
      console.log("API Response:", data);
      setPlane(data);
    } catch (error) {
      console.error("Error fetching plane:", error);
    }
  };

  useEffect(() => {
    fetchPlane();
  }, []);

  const openModal = (day) => {
    setSelectedDay(day);
    setShowModal(true);
    setProgress(0);
    setActualTime("");
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDay(null);
    setActivityData("");
    setActualTime("");
  };

  const handleSave = () => {
    console.log(`Activity for Day ${selectedDay}:`, activityData, `Actual Time Spent: ${actualTime}`);
    closeModal();
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF7]">
      <Header />
      <main className="flex-grow mx-20">
        <div className={GlobalStyle.fontNunito}>
          <h1 className={`${GlobalStyle.headingLarge}`}>Self Care Activity Tracking</h1>
          <Link to={`/selfcareplanes`}>
            <IoArrowBack className="text-gray-700 cursor-pointer" size={24} />
          </Link>
          <br />
        </div>

        <main className="flex-grow flex justify-center items-center">
          <div className={`${GlobalStyle.pageContainer} px-25`}>
            <div className="flex justify-between items-center">
              <p className={GlobalStyle.headingMedium}>{plane.title}</p>
              <p className={GlobalStyle.headingMedium}>Duration: 1 Week</p>
            </div>
            <p className={GlobalStyle.paragraph}>{plane.plane}</p>
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
            </div>
          </div>
        </main>

        <div>
          <img src={bg_image1} alt="Ad" className="w-150 h-150 mx-auto mt-16" />
        </div>
      </main>
      <Footer />

      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center backdrop-blur-lg">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full border border-gray-300 relative">
            <div className="absolute top-2 right-2">
              <IoClose className="text-gray-500 cursor-pointer" size={24} onClick={closeModal} />
            </div>
            
            <h2 className="text-lg font-bold mb-4">Log Activity for Day {selectedDay}</h2>
            <h2>Assigned Time: {plane.time_per_day} per day</h2>
            
            <p className={GlobalStyle.headingMedium}>Notes</p>
            <textarea
              className="w-full border p-2 mt-2 rounded-md bg-white"
              placeholder="Enter activity details..."
              value={activityData}
              onChange={(e) => setActivityData(e.target.value)}
            ></textarea>
            
            <p className={GlobalStyle.headingMedium}>Actual Time Spent (minutes)</p>
            <input
              type="number"
              className="w-full border p-2 mt-2 rounded-md bg-white"
              placeholder="Enter actual time spent"
              value={actualTime}
              onChange={(e) => setActualTime(e.target.value)}
            />
            
            <div className="flex justify-end space-x-3 mt-4">
              <button className={GlobalStyle.buttonPrimary} onClick={handleSave}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};