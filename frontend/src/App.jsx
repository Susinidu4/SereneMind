import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Main_Pages/Home';
import { PrototypeA } from './assets/Prototype/PrototypeA';
import { User_Signup } from './pages/Main_Pages/User Account Management/User_Signup';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Home/>} />
        <Route path="/PrototypeA" element={<PrototypeA/>} />

        {/* yasindu */}
        <Route path="/usersignup" element={<User_Signup/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
