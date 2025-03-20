import React, { useState, useEffect } from "react";
import "./Calendar.css";
import { HistoryPopup } from "./HistoryPopup";

export const Mood_History_Calendar = () => {
  const user = JSON.parse(localStorage.getItem("userData"));
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
      const response = await fetch(`http://localhost:5000/mood/user/${user.id}`);
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
    const clickedDate = new Date(year, month, day);
    const localDateString = clickedDate.toLocaleDateString("en-CA"); // Format: YYYY-MM-DD
    setSelectedDate(localDateString);
    setShowPopup(true);
  };

  // Filter mood history for the selected date
  const filteredMoodHistory = moodHistory.filter((mood) => {
    const moodDate = new Date(mood.createdAt).toLocaleDateString("en-CA"); // Convert to local date
    return moodDate === selectedDate;
  });

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
        <HistoryPopup
          selectedDate={selectedDate}
          loading={loading}
          error={error}
          filteredMoodHistory={filteredMoodHistory}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};