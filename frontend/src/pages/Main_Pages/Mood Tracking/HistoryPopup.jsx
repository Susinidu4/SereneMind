import React from "react";
import { IoCloseCircle } from "react-icons/io5";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import GlobalStyle from "../../../assets/Prototype/GlobalStyle";

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
    <div className="fixed inset-0 flex justify-center backdrop-blur-sm items-center z-[1]">
      <main
        className={`flex flex-col justify-center mx-20 bg-[#FFFDF7] p-10 rounded-lg`}
        style={{ fontFamily: "Nunito" }}
      >
        <div className="close-btn flex justify-end" onClick={onClose}>
            <IoCloseCircle size={30} color="red" />
          </div>
          <div className="flex flex-col gap-y-2 mb-5">
          <h2 className="font-bold text-lg">{selectedDate}</h2>
          <h3 className="font-bold text-2xl">Mood History</h3>
          </div>
        <div className="popup-content bg-[#005457]  w-[400px] max-h-[600px]  p-10 rounded-lg">
          
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <div className="flex justify-center overflow-y-auto h-[300px]">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-gray-100 border-b-2 border-gray-200 text-center">
                    <th className="p-3 font-semibold">Emoji</th>
                    <th className="p-3 font-semibold">Time</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {filteredMoodHistory.length > 0 ? (
                    filteredMoodHistory.map((mood) => (
                      <tr key={mood._id} className="border-b border-gray-200">
                        <td className="p-3 text-2xl">{mood.emoji}</td>
                        <td className="p-3 text-lg text-[#FFFDF7]">
                          {new Date(mood.createdAt).toLocaleTimeString()}
                        </td>
                        <td className="p-3">
                          <Link to={`/moodtrackingupdate/${mood._id}`}>
                            <button className="text-[#FFFDF7] mr-2">
                              <RiEdit2Fill size={20} />
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(mood._id)}
                            className="text-[#FFFDF7]"
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
      </main>
    </div>
  );
};
