import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Main_Pages/Home';
import { PrototypeA } from './assets/Prototype/PrototypeA';

{/* user management */}
import { User_Signup } from './pages/Main_Pages/User Account Management/User_Signup';
import { User_Login } from './pages/Main_Pages/User Account Management/User_Login';
import { User_Profile } from './pages/Main_Pages/User Account Management/User_Profile';
import { Admin_Login } from './pages/Main_Pages/Admin/Admin_Login';
import { Admin_Dashboard } from './pages/Main_Pages/Admin/Admin_Dashboard';
import { Sample } from './pages/Main_Pages/Mood Tracking/Sample';
import { Update_User } from './pages/Main_Pages/User Account Management/Update_User';
import { Password_Update } from './pages/Main_Pages/User Account Management/Password_Update';
import { Forgot_Password } from './pages/Main_Pages/User Account Management/Forgot_Password';
import { Reset_Password } from './pages/Main_Pages/User Account Management/Reset_Password';

{/* mood tracking */}
import { Mood_History_Calendar } from './pages/Main_Pages/Mood Tracking/Mood_History_Calendar';
import { Mood_Tracking } from './pages/Main_Pages/Mood Tracking/Mood_Tracking';
import { Mood_Tracking_Update } from './pages/Main_Pages/Mood Tracking/Mood_Tracking_Update';



import { InstructionPage } from './pages/Mood_Journaling/InstructionPage';
import { MoodJournalingInsert } from './pages/Mood_Journaling/MoodJournalingInsert';
import { EditJournal } from './pages/Mood_Journaling/EditJournal';

import { OnlineResource } from './pages/Resourse_Management/OnlineResource';
import { ReadResource } from './pages/Resourse_Management/ReadResource';
import { DisplayResourceAdmin } from './pages/Resourse_Management/DisplayResourceAdmin';

{/* Oshi */}
import { ActivityTracking } from './pages/Activity_Tracking/ActivityTracking';
import { SelfCarePlanes } from './pages/Activity_Tracking/SelfCarePlanes';
import { ActivityProgress } from './pages/Activity_Tracking/ActivityProgress';
import { ActivityUpdate } from './pages/Activity_Tracking/ActivityUpdate';







function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes> 

        {/* Other pages */}
        <Route path="/" element={<Home/>} />
        <Route path="/PrototypeA" element={<PrototypeA/>} />
        

         {/* mood tracking */}
        <Route path="/sample" element={<Sample/>} />
        <Route path="/moodtracking" element={<Mood_Tracking/>} />
        <Route path="/moodhistorycalendar" element={<Mood_History_Calendar/>} />
        <Route path="/moodtrackingupdate/:id" element={<Mood_Tracking_Update/>} />
        

        {/* user management */}
        <Route path="/usersignup" element={<User_Signup/>} />
        <Route path="/login" element={<User_Login/>} />
        <Route path="/userprofile" element={<User_Profile/>} />
        <Route path="/adminlogin" element={<Admin_Login/>} />
        <Route path="/admindashboard" element={<Admin_Dashboard/>} />
        <Route path="/update-user/:id" element={<Update_User/>} />
        <Route path="/update-user-password/:id" element={<Password_Update/>} />
        <Route path="/forgotpassword" element={<Forgot_Password/>} />
        <Route path="/reset-password/:token" element={<Reset_Password/>} />

        {/* Mood Journaling */}
        <Route path="/MoodJournaling/InstructionPage" element={<InstructionPage/>} />
        <Route path="/MoodJournaling/MoodJournalingInsert" element={<MoodJournalingInsert/>} />
        <Route path="/MoodJournaling/EditJournaling" element={<EditJournal/>} />

        {/* Activity Tracking */}
        <Route path="/Activity_Tracking/ActivityTracking/plane/:suggesionId/:id" element={<ActivityTracking />} />
        <Route path="/selfcareplanes" element={<SelfCarePlanes />} />
        <Route path="/activityProgress" element={<ActivityProgress />} />
        <Route path="/activityUpdate" element={<ActivityUpdate />} />


        {/* Resource Management */}
        <Route path="/ResourceManagement/OnlineResource" element={<OnlineResource/>} />
        <Route path="/ResourceManagement/ReadResource/:id" element={<ReadResource />} />
        <Route path="/ResourceManagement/DisplayResourceAdmin/:id" element={<DisplayResourceAdmin />} />



      </Routes>
    </BrowserRouter>
  )
}

export default App
