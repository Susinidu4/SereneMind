import React from "react";
import "./Calendar.css";
import { IoCloseCircle } from "react-icons/io5";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const deleteMood = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/mood/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete mood");
    }

    const data = await response.json();
    console.log("Mood deleted successfully:", data);

    // Show success message
    Swal.fire({
      title: "Deleted!",
      text: "Your mood has been deleted.",
      icon: "success",
    });
  } catch (err) {
    console.error("Error deleting mood:", err);

    // Show error message
    Swal.fire({
      title: "Error!",
      text: "Failed to delete mood.",
      icon: "error",
    });
  }
};

export const HistoryPopup = ({
  selectedDate,
  loading,
  error,
  filteredMoodHistory,
  onClose,
}) => {
  const handleDelete = (id) => {
    // Confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the deleteMood function with the mood ID
        deleteMood(id);
      }
    });
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-content">
          <div className="close-btn float-right" onClick={onClose}>
            <IoCloseCircle size={25} color="red" />
          </div>
          <h2 className="font-bold">{selectedDate}</h2>
          <h3>Mood History</h3>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <div className="flex justify-center">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-gray-100 border-b-2 border-gray-200">
                    <th className="p-3 font-semibold">Emoji</th>
                    <th className="p-3 font-semibold">Time</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMoodHistory.length > 0 ? (
                    filteredMoodHistory.map((mood) => (
                      <tr key={mood._id} className="border-b border-gray-200">
                        <td className="p-3">{mood.emoji}</td>
                        <td className="p-3">
                          {new Date(mood.createdAt).toLocaleTimeString()}
                        </td>
                        <td className="p-3">
                          <Link to={`/moodtrackingupdate/${mood._id}`}>
                            <button className="text-blue-500 mr-2">
                              <RiEdit2Fill size={20} />
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(mood._id)}
                            className="text-red-500"
                          >
                            <MdDelete size={20} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="p-3 text-center text-gray-500">
                        No mood history for this date.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};