import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Main_Pages/Home';
import { PrototypeA } from './assets/Prototype/PrototypeA';

import { User_Signup } from './pages/Main_Pages/User Account Management/User_Signup';
import { User_Login } from './pages/Main_Pages/User Account Management/User_Login';
import { User_Profile } from './pages/Main_Pages/User Account Management/User_Profile';
import { Admin_Login } from './pages/Main_Pages/Admin/Admin_Login';
import { Sample } from './pages/Main_Pages/Mood Tracking/sample';
import { Admin_Dashboard } from './pages/Main_Pages/Admin/Admin_Dashboard';



import { InstructionPage } from './pages/Mood_Journaling/InstructionPage';
import { MoodJournalingInsert } from './pages/Mood_Journaling/MoodJournalingInsert';


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Home/>} />
        <Route path="/PrototypeA" element={<PrototypeA/>} />


        {/* yasindu */}
        <Route path="/usersignup" element={<User_Signup/>} />
        <Route path="/login" element={<User_Login/>} />
        <Route path="/userprofile" element={<User_Profile/>} />
        <Route path="/adminlogin" element={<Admin_Login/>} />
        <Route path="/admindashboard" element={<Admin_Dashboard/>} />
        <Route path="/sample" element={<Sample/>} />

        {/* Mood_Journaling */}
        <Route path="/MoodJournaling/InstructionPage" element={<InstructionPage/>} />
        <Route path="/MoodJournaling/MoodJournalingInsert" element={<MoodJournalingInsert/>} />



      </Routes>
    </BrowserRouter>
  )
}

export default App
