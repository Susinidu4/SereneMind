import React from 'react'

export const Admin_Dashboard = () => {
    const data = JSON.parse(localStorage.getItem("userData"));
    console.log("Admin data:", data.role);
  return (
    <div>Admin_Dashboard</div>

  )
}
