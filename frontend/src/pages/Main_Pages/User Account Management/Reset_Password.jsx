import React, { useState } from "react";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import GlobalStyle from "../../../assets/Prototype/GlobalStyle";

export const Reset_Password = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Passwords don't match",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await axios.post(`http://localhost:5000/user/reset-password/${token}`, {
        password,
        confirmPassword
      });
      
      await Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: response.data.message,
        confirmButtonText: 'OK'
      });
      
      navigate('/login');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Error resetting password',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="flex flex-col min-h-screen bg-[#FFFDF7] m-auto justify-center items-center"
      style={{ fontFamily: "'Nunito'" }}
    >
      <div className={`bg-[#E9F1F1] p-8 rounded-lg shadow-md shadow-neutral-950 w-full max-w-md`}>
        <h1 className={`font-bold text-2xl text-center`}>Reset Password</h1>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="password" className='block text-md font-medium text-gray-700'>New Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 bg-[#FFFDF7] block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              minLength="6"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className='block text-md font-medium text-gray-700'>Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 bg-[#FFFDF7] block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              minLength="6"
            />
          </div>
          <button 
            className={`${GlobalStyle.buttonPrimary} w-full ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`} 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};