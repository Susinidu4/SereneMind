import React from "react";
import "./Calendar.css";
import { IoCloseCircle } from "react-icons/io5";

export const HistoryPopup = ({
  selectedDate,
  loading,
  error,
  filteredMoodHistory,
  onClose,
}) => {
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
