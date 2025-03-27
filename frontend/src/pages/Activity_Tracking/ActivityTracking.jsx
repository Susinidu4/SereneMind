import React, { useState, useEffect } from "react";
import GlobalStyle from "../../assets/Prototype/GlobalStyle";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import bg_image1 from "../../assets/Images/tracking.png";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import axios from "axios";

export const ActivityTracking = () => {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [note, setNote] = useState("");
  const [actualTime, setActualTime] = useState("");
  const [plane, setPlane] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedDays, setCompletedDays] = useState({});

  useEffect(() => {
    const fetchPlane = async () => {
      try {
        const response = await fetch(`http://localhost:5000/suggestions/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch plan");
        }
        const data = await response.json();
        setPlane(data);
      } catch (error) {
        console.error("Error fetching plan:", error);
      }
    };

    fetchPlane();

    // Load completed days from localStorage
    const savedCompletedDays = localStorage.getItem(`completedDays-${user.id}-${id}`);
    if (savedCompletedDays) {
      setCompletedDays(JSON.parse(savedCompletedDays));
    }
  }, [id, user.id]);

  const openModal = (day) => {
    setSelectedDay(day);
    setShowModal(true);
    setNote("");
    setActualTime("");
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDay(null);
    setNote("");
    setActualTime("");
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `http://localhost:5000/api/activity_tracking/addlog/${user.id}`,
        {
          Day: [
            {
              progress: actualTime,
              note: note,
              plane_id: id,
            },
          ],
        }
      );

      if (response.status === 201) {
        // Update completed days state
        const updatedCompletedDays = { ...completedDays, [selectedDay]: true };
        setCompletedDays(updatedCompletedDays);
        localStorage.setItem(`completedDays-${user.id}-${id}`, JSON.stringify(updatedCompletedDays));
        closeModal();
      }
    } catch (error) {
      console.error("Error saving activity log:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = () => {
    // Edit functionality: open modal to edit the existing log
    openModal(selectedDay);
  };

  const handleDelete = () => {
    // Handle deleting the log for the selected day
    const updatedCompletedDays = { ...completedDays };
    delete updatedCompletedDays[selectedDay];
    setCompletedDays(updatedCompletedDays);
    localStorage.setItem(`completedDays-${user.id}-${id}`, JSON.stringify(updatedCompletedDays));
    closeModal();
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF7]">
      <Header />
      <main className="flex-grow mx-20">
        <div className={GlobalStyle.fontNunito}>
          <h1 className={`${GlobalStyle.headingLarge} pb-10`}>
            Self Care Activity Tracking
          </h1>
        </div>

        <main className="flex-grow flex justify-center items-center">
          <div className={`${GlobalStyle.pageContainer} h-[820px] px-10 py-5 mx-auto`}>
            <div className="flex justify-between items-center pt-10">
              <p className={GlobalStyle.headingMedium}>{plane.title}</p>
              <p className={GlobalStyle.headingMedium}>Duration: 1 Week</p>
            </div>
            <br />
            <div>
              <p className={`${GlobalStyle.headingSmall} font-bold`}>
                What you should do...
              </p>
            </div>
            <p className={GlobalStyle.headingSmall}>{plane.plane}</p>
            <div className="mt-6 space-y-5">
              {[...Array(7)].map((_, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center border p-3 rounded-md shadow-sm cursor-pointer transition ${
                    completedDays[index + 1] ? "bg-green-300" : "bg-gray-50"
                  }`}
                  onClick={() => openModal(index + 1)}
                >
                  <span>Day {index + 1}</span>
                  {completedDays[index + 1] ? ( // Show icons only if completed
                    <div className="flex gap-3">
                      <button
                        className="p-2 rounded-full text-[#007579] hover:text-[#005457] hover:bg-[#AEDBD8] transition"
                        title="Edit"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit();
                        }}
                        disabled={completedDays[index + 1] ? false : true}
                      >
                        <FaEdit size={15} />
                      </button>
                      <button
                        className="p-2 rounded-full text-[#007579] hover:text-[#005457] hover:bg-red-100 transition"
                        title="Delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete();
                        }}
                        disabled={completedDays[index + 1] ? false : true}
                      >
                        <FaTrash size={15} />
                      </button>
                    </div>
                  ) : null}
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
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full max-h-[600px] h-[500px] border border-gray-300 relative overflow-auto">
            <div className="absolute top-2 right-2">
              <IoClose
                className="text-gray-500 cursor-pointer"
                size={24}
                onClick={closeModal}
              />
            </div>
            
            <h2 className="text-lg font-bold mb-4">
              Log Activity for Day {selectedDay}
            </h2>
            <br />
            <h2>Assigned Time: {plane.time_per_day} per day</h2>
            <br />
            <p className={GlobalStyle.headingMedium}>Notes</p>
            <textarea
              className="w-full border p-2 mt-2 rounded-md bg-white"
              placeholder="Enter activity details..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              disabled={completedDays[selectedDay]} // Disable textarea if day is completed
            ></textarea>

            <p className={GlobalStyle.headingMedium}>
              <br />
              Actual Time Spent (minutes)
            </p>
            <input
              type="number"
              className="w-full border p-2 mt-2 rounded-md bg-white"
              placeholder="Enter actual time spent"
              value={actualTime}
              onChange={(e) => setActualTime(e.target.value)}
              disabled={completedDays[selectedDay]} // Disable input if day is completed
            />

            <div className="flex justify-end space-x-3 mt-4">
              <br />
              <br />
              <button
                className={`${GlobalStyle.buttonPrimary} ${
                  !note || !actualTime || isSubmitting || completedDays[selectedDay]
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
                onClick={handleSave}
                disabled={!note || !actualTime || isSubmitting || completedDays[selectedDay]}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
