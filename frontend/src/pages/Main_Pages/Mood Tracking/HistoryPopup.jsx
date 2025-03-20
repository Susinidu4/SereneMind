import React from "react";
import "./Calendar.css";
import { IoCloseCircle } from "react-icons/io5";

export const HistoryPopup = ({ selectedDate, loading, error, filteredMoodHistory, onClose }) => {

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-content">
          <div className="close-btn float-right" onClick={onClose}>
          <IoCloseCircle size={25} color="red" />
          </div>
          <h3>Mood History for {selectedDate}</h3>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <ul>
              {filteredMoodHistory.length > 0 ? (
                filteredMoodHistory.map((mood) => (
                  <li key={mood._id}>
                    <span>{mood.emoji}</span> -{" "}
                    {new Date(mood.createdAt).toLocaleTimeString()}
                  </li>
                ))
              ) : (
                <li>No mood history for this date.</li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};