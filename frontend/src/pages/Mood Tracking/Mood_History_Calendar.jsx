import React, { useState, useEffect } from "react";
import "./Calendar.css";

export const Mood_History_Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [moodHistory, setMoodHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = daysInMonth(year, month);
  const firstDay = firstDayOfMonth(year, month);

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
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle date click
  const handleDateClick = (day) => {
    const clickedDate = new Date(year, month, day).toISOString().split("T")[0];
    setSelectedDate(clickedDate);
    setShowPopup(true);
  };

  // Filter mood history for the selected date
  const filteredMoodHistory = moodHistory.filter((mood) =>
    mood.createdAt.startsWith(selectedDate)
  );

  const renderCalendar = () => {
    const calendarDays = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= days; day++) {
      calendarDays.push(
        <div key={day} className="calendar-day" onClick={() => handleDateClick(day)}>
          {day}
        </div>
      );
    }

    return calendarDays;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={goToPreviousMonth}>&lt;</button>
        <h2>
          {monthNames[month]} {year}
        </h2>
        <button onClick={goToNextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}
        {renderCalendar()}
      </div>

      {/* Popup for mood history */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Mood History for {selectedDate}</h3>
            <button onClick={() => setShowPopup(false)}>Close</button>
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
      )}
    </div>
  );
};