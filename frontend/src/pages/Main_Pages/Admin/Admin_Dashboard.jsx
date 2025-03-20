import React from 'react'
import { Header_2 } from '../../../components/Header_2';


export const Admin_Dashboard = () => {

  const data = JSON.parse(localStorage.getItem("userData"));
    if (!data?.role === "admin" || !data?.role === "Admin" || !data?.role === "ADMIN") {
        window.location.href = "/adminlogin";
    }

   try{
    const data = JSON.parse(localStorage.getItem("userData"));
    console.log("Admin data:", data.role);
   }catch(e){
     console.log("Error in parsing the data:", e);
   }
  return (
    <div>
      <Header_2 />
    </div>

  )
}
