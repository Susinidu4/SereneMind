import React, { useState } from 'react';
import { Header } from '../../../components/Header';

export const User_Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to handle errors

  const user = JSON.parse(localStorage.getItem('userData'));
  if (user?.role === 'user' || user?.role === 'User' || user?.role === 'USER') {
    window.location.href = '/userprofile';
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
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
      window.location.href = '/userprofile';
      localStorage.setItem('userData', JSON.stringify(data));
      // Reset form fields and error state
      setEmail('');
      setPassword('');
      setError('');

      // Handle successful login (e.g., redirect to dashboard)
      alert('Login successful!');
      // You can use a routing library like react-router-dom to redirect the user
      // Example: history.push('/dashboard');
    } catch (err) {
      console.error('Login error:', err.message);
      setError(err.message || 'An error occurred during login');
    }
  };

  return (
    <div>
      <Header />
      <div className='flex justify-center items-center mt-10'>
        <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
          <h1 className='text-3xl font-bold text-center mb-6'>Login Page</h1>
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
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
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
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                required
              />
            </div>
            <button
              type="submit"
              className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};