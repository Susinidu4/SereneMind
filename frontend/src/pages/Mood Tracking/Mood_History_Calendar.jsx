import React, { useState } from "react";
import "./Calendar.css"
export const Mood_History_Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = daysInMonth(year, month);
  const firstDay = firstDayOfMonth(year, month);

  const renderCalendar = () => {
    const calendarDays = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= days; day++) {
      calendarDays.push(
        <div key={day} className="calendar-day">
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
        <h2>{monthNames[month]} {year}</h2>
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
    </div>
  );
};
