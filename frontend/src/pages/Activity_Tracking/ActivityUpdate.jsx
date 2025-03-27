import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import GlobalStyle from "../../assets/Prototype/GlobalStyle";

export const ActivityUpdate = ({ selectedDay, plane = {}, user, id, onClose, onUpdate }) => {
  const [note, setNote] = useState("");
  const [actualTime, setActualTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Reset input fields when selectedDay changes
    setNote("");
    setActualTime("");
  }, [selectedDay]);

  const handleSave = async () => {
    if (!user?.id || !id) {
      console.error("User ID or Plane ID is missing.");
      return;
    }

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
        onUpdate(); // Callback to refresh UI
        onClose(); // Close modal
      }
    } catch (error) {
      console.error("Error saving activity log:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-lg">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full max-h-[600px] h-[500px] border border-gray-300 relative overflow-auto">
        <div className="absolute top-2 right-2">
          <IoClose className="text-gray-500 cursor-pointer" size={24} onClick={onClose} />
        </div>

        <h2 className="text-lg font-bold mb-4">Edit Activity for Day {selectedDay}</h2>
        
        {/* Prevents accessing 'time_per_day' if 'plane' is undefined */}
        <h2>Assigned Time: {plane?.time_per_day ?? "N/A"} per day</h2>

        <p className={GlobalStyle.headingMedium}>Notes</p>
        <textarea
          className="w-full border p-2 mt-2 rounded-md bg-white"
          placeholder="Enter activity details..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
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
