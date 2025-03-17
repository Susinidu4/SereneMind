import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Main_Pages/Home';
import { PrototypeA } from './assets/Prototype/PrototypeA';
import { InstructionPage } from './pages/Mood_Journaling/InstructionPage';
import { MoodJournalingInsert } from './pages/Mood_Journaling/MoodJournalingInsert';
import { ActivityTracking } from './pages/Activity_Tracking/ActivityTracking';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Home/>} />
        <Route path="/PrototypeA" element={<PrototypeA/>} />

        {/* Mood_Journaling */}
        <Route path="/MoodJournaling/InstructionPage" element={<InstructionPage/>} />
        <Route path="/MoodJournaling/MoodJournalingInsert" element={<MoodJournalingInsert/>} />

        {/* Activity Tracking */}
        <Route path="/Activity_Tracking/ActivityTracking" element={<ActivityTracking />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
