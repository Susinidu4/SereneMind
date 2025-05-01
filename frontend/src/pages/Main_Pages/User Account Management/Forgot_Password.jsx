import React, { useState } from "react";
import GlobalStyle from "../../../assets/Prototype/GlobalStyle";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Forgot_Password = () => {


  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5000/user/forgot-password', { email });
      toast.success(response.data.message);
      navigate('/login'); // Redirect to login after sending email
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error sending reset email');
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
      <h1 className={`font-bold text-2xl text-center`}>Forgot Password</h1>
      <form onSubmit={handleEmailChange} className="mt-4">
        <div className="mb-4">
          <label htmlFor="email" className='block text-md font-medium text-gray-700'>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 bg-[#FFFDF7] block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button 
          className={`${GlobalStyle.buttonPrimary} w-full ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`} 
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
    </div>
  </div>
);
};
