import React from 'react'


export const Admin_Dashboard = () => {
   try{
    const data = JSON.parse(localStorage.getItem("userData"));
    console.log("Admin data:", data.role);
   }catch(e){
     console.log("Error in parsing the data:", e);
   }
  return (
    <div>Admin_Dashboard</div>

  )
}
