import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import GlobalStyle from "../../assets/Prototype/GlobalStyle";
import Swal from "sweetalert2";

export const ActivityUpdate = ({ selectedDay, plane = {}, user, id, onClose, onUpdate }) => {
  const [note, setNote] = useState("");
  const [actualTime, setActualTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPreviousData = async () => {
      if (!user?.id || !id) {
        setError("User ID or Plane ID is missing");
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/activity_tracking/users/${user.id}/planes/${id}`
        );

        console.log(response)
        if (response.data.success && response.data.data.length > 0) {
          // Find the day entry that matches our selectedDay
          const dayEntry = response.data.data[0].Days.find(
            day => day.plane_id === id // Assuming selectedDay corresponds to plane_id
          );
          
          if (dayEntry) {
            setNote(dayEntry.note);
            setActualTime(dayEntry.progress);
          }
        }
      } catch (error) {
        console.error("Error fetching previous data:", error);
        setError("Failed to load previous data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreviousData();
  }, [user?.id, id, selectedDay]);

  const handleSave = async () => {
    if (!user?.id || !id) {
      console.error("User ID or Plane ID is missing.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/activity_tracking/users/${user.id}/planes/${id}`,
        {
          progress: actualTime,
          note: note
        }
      );

      if (response.status === 200) {
        onUpdate(); // Callback to refresh UI
        onClose(); // Close modal
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Update successful",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error saving activity log:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Update failed",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center backdrop-blur-lg">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full max-h-[600px] h-[500px] border border-gray-300 relative overflow-auto">
          <div className="absolute top-2 right-2">
            <IoClose className="text-gray-500 cursor-pointer" size={24} onClick={onClose} />
          </div>
          <p>Loading previous data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex justify-center items-center backdrop-blur-lg">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full max-h-[600px] h-[500px] border border-gray-300 relative overflow-auto">
          <div className="absolute top-2 right-2">
            <IoClose className="text-gray-500 cursor-pointer" size={24} onClick={onClose} />
          </div>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-lg">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full max-h-[600px] h-[500px] border border-gray-300 relative overflow-auto">
        <div className="absolute top-2 right-2">
          <IoClose className="text-gray-500 cursor-pointer" size={24} onClick={onClose} />
        </div>

        <h2 className="text-lg font-bold mb-4">Edit Activity for Day {selectedDay}</h2>
        
        <h2>Assigned Time: {plane?.time_per_day ?? "N/A"} per day</h2>
        <br/>
        <p className={GlobalStyle.headingMedium}>Notes</p>
        <textarea
          className="w-full border p-2 mt-2 rounded-md bg-white"
          placeholder="Enter activity details..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          
        ></textarea>
        <br/>
        <p className={GlobalStyle.headingMedium}>Actual Time Spent (minutes)</p>
        
        <input
          type="number"
          className="w-full border p-2 mt-2 rounded-md bg-white"
          placeholder="Enter actual time spent"
          value={actualTime}
          onChange={(e) => setActualTime(e.target.value)}
        />
        
        <div className="flex justify-end space-x-3 mt-4">
          <button
            className={`${GlobalStyle.buttonPrimary} ${
              !note || !actualTime || isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
            }`}
            onClick={handleSave}
            disabled={!note || !actualTime || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};