import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Main_Pages/Home';
import { PrototypeA } from './assets/Prototype/PrototypeA';

{/* yasindu */}
import { User_Signup } from './pages/Main_Pages/User Account Management/User_Signup';
import { User_Login } from './pages/Main_Pages/User Account Management/User_Login';
import { User_Profile } from './pages/Main_Pages/User Account Management/User_Profile';
import { Admin_Login } from './pages/Main_Pages/Admin/Admin_Login';
import { Admin_Dashboard } from './pages/Main_Pages/Admin/Admin_Dashboard';
import { Sample } from './pages/Main_Pages/Mood Tracking/Sample';
import { Mood_History_Calendar } from './pages/Main_Pages/Mood Tracking/Mood_History_Calendar';
import { Mood_Tracking } from './pages/Main_Pages/Mood Tracking/Mood_Tracking';
import { Mood_Tracking_Update } from './pages/Main_Pages/Mood Tracking/Mood_Tracking_Update';


import { InstructionPage } from './pages/Mood_Journaling/InstructionPage';
import { MoodJournalingInsert } from './pages/Mood_Journaling/MoodJournalingInsert';
import { EditJournal } from './pages/Mood_Journaling/EditJournal';

import { OnlineResource } from './pages/Resourse_Management/OnlineResource';
import { ReadResource } from './pages/Resourse_Management/ReadResource';

import { ActivityTracking } from './pages/Activity_Tracking/ActivityTracking';
import { SelfCarePlanes } from './pages/Activity_Tracking/SelfCarePlanes';
import { Update_User } from './pages/Main_Pages/User Account Management/update_user';





function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes> 

        {/* Other pages */}
        <Route path="/" element={<Home/>} />
        <Route path="/PrototypeA" element={<PrototypeA/>} />
        

         {/* yasindu */}
        <Route path="/usersignup" element={<User_Signup/>} />
        <Route path="/login" element={<User_Login/>} />
        <Route path="/userprofile" element={<User_Profile/>} />
        <Route path="/adminlogin" element={<Admin_Login/>} />
        <Route path="/admindashboard" element={<Admin_Dashboard/>} />
        <Route path="/sample" element={<Sample/>} />
        <Route path="/moodtracking" element={<Mood_Tracking/>} />
        <Route path="/moodhistorycalendar" element={<Mood_History_Calendar/>} />
        <Route path="/moodtrackingupdate/:id" element={<Mood_Tracking_Update/>} />
        <Route path="update-user/:id" element={<Update_User/>} />

        {/* Mood Journaling */}
        <Route path="/MoodJournaling/InstructionPage" element={<InstructionPage/>} />
        <Route path="/MoodJournaling/MoodJournalingInsert" element={<MoodJournalingInsert/>} />
        <Route path="/MoodJournaling/EditJournaling" element={<EditJournal/>} />

        {/* Activity Tracking */}
        <Route path="/Activity_Tracking/ActivityTracking/:id" element={<ActivityTracking />} />
        <Route path="/selfcareplanes" element={<SelfCarePlanes />} />

        {/* Resource Management */}
        <Route path="/ResourceManagement/OnlineResource" element={<OnlineResource/>} />
        <Route path="/ResourceManagement/ReadResource" element={<ReadResource/>} />



      </Routes>
    </BrowserRouter>
  )
}

export default App
