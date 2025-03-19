import React, { useState, useEffect } from "react";
import "./Calendar.css";

export const HistoryPopup = ({ selectedDate, onClose }) => {
  const [moodHistory, setMoodHistory] = useState([]);
  const [filteredMoodHistory, setFilteredMoodHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch mood history for the selected date
  useEffect(() => {
    if (selectedDate) {
      fetchMoodHistory(selectedDate);
    }
  }, [selectedDate]);

  const fetchMoodHistory = async (date) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/mood`);
      if (!response.ok) {
        throw new Error("Failed to fetch mood history");
      }
      const data = await response.json();
      setMoodHistory(data);

      // Filter mood history based on the selected date
      const filteredData = data.filter((mood) => {
        const moodDate = new Date(mood.createdAt).toISOString().split("T")[0];
        console.log("Mood Date:", moodDate, "Selected Date:", date); // Debugging statement
        return moodDate === date;
      });

      setFilteredMoodHistory(filteredData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-header">
          <h3>Mood History for {selectedDate}</h3>
          <button onClick={onClose} className="close-button">
            &times;
          </button>
        </div>
        <div className="popup-content">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : filteredMoodHistory.length > 0 ? (
            <ul>
              {filteredMoodHistory.map((mood) => (
                <li key={mood._id}>
                  <span className="emoji">{mood.emoji}</span> -{" "}
                  {new Date(mood.createdAt).toLocaleTimeString()}
                </li>
              ))}
            </ul>
          ) : (
            <p>No mood history for this date.</p>
          )}
        </div>
      </div>
    </div>
  );
};