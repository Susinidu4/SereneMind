import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Main_Pages/Home';
import { PrototypeA } from './assets/Prototype/PrototypeA';
import { User_Signup } from './pages/Main_Pages/User Account Management/User_Signup';
import { User_Login } from './pages/Main_Pages/User Account Management/User_Login';
import { User_Profile } from './pages/Main_Pages/User Account Management/User_Profile';


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
      </Routes>
    </BrowserRouter>
  )
}

export default App
