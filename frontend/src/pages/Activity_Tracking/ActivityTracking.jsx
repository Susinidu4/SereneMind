import React, { useState, useEffect } from "react";
import GlobalStyle from "../../assets/Prototype/GlobalStyle";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import bg_image1 from "../../assets/Images/tracking.png";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export const ActivityTracking = () => {
  const { id, suggesionId } = useParams();
  const user = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [note, setNote] = useState("");
  const [actualTime, setActualTime] = useState("");
  const [plane, setPlane] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedDays, setCompletedDays] = useState({});
  const [existingLogs, setExistingLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeData = async () => {
      try {
        setIsLoading(true);

        // 1. First load from localStorage immediately to show something to the user
        const savedCompletedDays = localStorage.getItem(
          `completedDays-${user.id}-${id}`
        );
        const localCompleted = savedCompletedDays
          ? JSON.parse(savedCompletedDays)
          : {};
        setCompletedDays(localCompleted);

        // 2. Fetch plan data
        const planResponse = await fetch(
          `http://localhost:5000/suggestions/${id}`
        );
        if (!planResponse.ok) throw new Error("Failed to fetch plan");
        const planData = await planResponse.json();
        setPlane(planData);

        // 3. Fetch server logs
        const logsResponse = await axios.get(
          `http://localhost:5000/api/activity_tracking/logs/${user.id}/${id}`
        );
        const logsData = logsResponse.data;
        setExistingLogs(logsData);

        // 4. Create definitive completed days by combining server and local data
        const serverCompleted = {};
        logsData.forEach((log) => {
          serverCompleted[log.day] = true;
        });

        // Merge with local completed days (server data takes precedence)
        const definitiveCompleted = {
          ...localCompleted,
          ...serverCompleted,
        };

        setCompletedDays(definitiveCompleted);

        // Update localStorage to match the definitive state
        localStorage.setItem(
          `completedDays-${user.id}-${id}`,
          JSON.stringify(definitiveCompleted)
        );
      } catch (error) {
        console.error("Error initializing data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, [id, user.id]);

  const openModal = (day) => {
    if (isLoading) return;

    const hasExistingLog = existingLogs.some((log) => log.day === day);
    if (hasExistingLog) {
      Swal.fire({
        title: "Already Submitted",
        text: "You've already submitted a log for this day.",
        icon: "info",
      });
      return;
    }

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
      const hasExistingLog = existingLogs.some(
        (log) => log.day === selectedDay
      );
      if (hasExistingLog) {
        Swal.fire({
          title: "Error!",
          text: "A log already exists for this day.",
          icon: "error",
        });
        return;
      }

      const response = await axios.post(
        `http://localhost:5000/api/activity_tracking/log/${user.id}`,
        {
          progress: actualTime,
          note: note,
          plane_id: id,
          day: selectedDay,
          suggestion_id: suggesionId,
        }
      );

      if (response.status === 200) {
        const newLog = {
          day: selectedDay,
          progress: actualTime,
          note: note,
          plane_id: id,
          suggestion_id: suggesionId,
        };

        const updatedCompletedDays = { ...completedDays, [selectedDay]: true };
        const updatedLogs = [...existingLogs, newLog];

        // Update all states atomically
        setCompletedDays(updatedCompletedDays);
        setExistingLogs(updatedLogs);

        // Persist to localStorage
        localStorage.setItem(
          `completedDays-${user.id}-${id}`,
          JSON.stringify(updatedCompletedDays)
        );

        Swal.fire({
          title: "Success!",
          text: "Activity logged successfully",
          icon: "success",
        });

        closeModal();
      }
    } catch (error) {
      console.error("Error saving activity log:", error);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to save activity",
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FFFDF7]">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className={GlobalStyle.headingMedium}>
              Loading your activity data...
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
          <div
            className={`${GlobalStyle.pageContainer} h-[820px] px-10 py-5 mx-auto`}
          >
            <div>
              <Link to={`/activitytrackingHistory/${suggesionId}`}>
                <button className="bg-[#005457] text-white px-4 py-2 rounded">
                  Activity History
                </button>
              </Link>
            </div>
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
              {[...Array(7)].map((_, index) => {
                const day = index + 1;
                const isCompleted = completedDays[day];
                return (
                  <div
                    key={index}
                    className={`flex justify-between items-center border p-3 rounded-md shadow-sm transition ${
                      isCompleted
                        ? "bg-green-300 cursor-not-allowed"
                        : "bg-gray-50 hover:bg-gray-100 cursor-pointer"
                    }`}
                    onClick={isCompleted ? undefined : () => openModal(day)}
                  >
                    <span>Day {day}</span>
                    {isCompleted && (
                      <span className="text-green-800">✓ Completed</span>
                    )}
                  </div>
                );
              })}
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
              disabled={completedDays[selectedDay]}
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
              disabled={completedDays[selectedDay]}
            />

            <div className="flex justify-end space-x-3 mt-4">
              <br />
              <br />
              <button
                className={`${GlobalStyle.buttonPrimary} ${
                  !note ||
                  !actualTime ||
                  isSubmitting ||
                  completedDays[selectedDay]
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
                onClick={handleSave}
                disabled={
                  !note ||
                  !actualTime ||
                  isSubmitting ||
                  completedDays[selectedDay]
                }
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
