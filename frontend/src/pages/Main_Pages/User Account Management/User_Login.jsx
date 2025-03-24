import React, { useState } from 'react';
import { Header } from '../../../components/Header';
import GlobalStyle from '../../../assets/Prototype/GlobalStyle';
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2'; // Import SweetAlert2

export const User_Login = () => {
  const userData = localStorage.getItem('userData');
  const user = userData ? JSON.parse(userData) : null;
  
  // Redirect if user is already logged in
  if(user && user.role === "user") {
    window.location.href = '/userprofile';
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to handle errors

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all fields.',
        icon: 'error',
        confirmButtonColor: '#005457',
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
      // Make a POST request to the login endpoint
      const response = await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Check if the response is successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      // Parse the response data
      const data = await response.json();
      console.log('Login successful:', data);

      Swal.fire({
              title: "Login Successful!",
              text: "Login successfully!",
              icon: "success"
            });
      window.location.href = '/userprofile';

      localStorage.setItem('userData', JSON.stringify(data));

      // Reset form fields and error state
      setEmail('');
      setPassword('');
      setError('');

      // Show success alert
      Swal.fire({
        title: 'Success!',
        text: 'Login successful!',
        icon: 'success',
        timer: 1500, // 1 seconds
        timerProgressBar: true,
        showConfirmButton: false, // Hide the "OK" button
        willClose: () => {
          // Navigate to another page after the timer ends
          window.location.href = '/userprofile'; // Replace '/dashboard' with your desired URL
        }
      });
    } catch (err) {
      console.error('Login error:', err.message);


      // Show error alert
      Swal.fire({
        title: 'Error!',
        text: err.message || 'An error occurred during login.',
        icon: 'error',
        confirmButtonColor: '#005457',
        confirmButtonText: 'OK',
      });

    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF7]" style={{ fontFamily: "'Nunito'" }}>
      <Header />
      <main className="flex mx-20 justify-center items-center">

      <div className={`bg-[#E9F1F1] p-8 rounded-lg shadow-md shadow-neutral-950 w-full max-w-md`}>

          <h1 className={`font-bold text-2xl text-center`}>Login</h1>
          {error && <p className='text-red-500 text-center mb-4'>{error}</p>}
          <form onSubmit={handleLogin}>
            <div className='mb-4'>
              <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='mt-1 bg-[#FFFDF7] block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                required
              />
            </div>
            <div className='mb-6'>
              <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='mt-1 bg-[#FFFDF7] block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                required
              />
            </div>
            <button
              type="submit"
              className={`${GlobalStyle.buttonPrimary} w-full`}           >
              LOGIN
            </button>

            <Link to={`/usersignup`}>
              <p className="text-center mt-4 font-bold">Don't have an account? <span className="text-[#92C9B1]">Sign Up</span></p>
            </Link>
          </form>
        </div>
      </main>
    </div>
  );
};