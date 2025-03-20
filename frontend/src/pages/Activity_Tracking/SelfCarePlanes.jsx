import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { Link } from 'react-router-dom';

export const SelfCarePlanes = () => {
  const [planes, setPlanes] = useState([]);
  const [randomSuggestions, setRandomSuggestions] = useState([]);
  const [isGenerated, setIsGenerated] = useState(false); // State to track if the button is clicked
  const user = JSON.parse(localStorage.getItem('userData'));
  const [buttonStatus, setButtonStatus] = useState(true); // State to track button visibility

  // Fetch self-care plans
  const fetchPlanes = async () => {
    try {
      const response = await fetch(`http://localhost:5000/mood/analyze/${user.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch planes');
      }
      const data = await response.json();
      console.log('API Response:', data); // Log the full API response
      setPlanes(data);

      // Randomly pick 6 suggestions
      const shuffledSuggestions = shuffleArray(data.suggestions).slice(0, 6);
      setRandomSuggestions(shuffledSuggestions);
      setIsGenerated(true); // Set the state to true after fetching data
    } catch (error) {
      console.error('Error fetching planes:', error);
    }
  };

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Handle Generate Button Click
  const handleGenerateClick = () => {
    fetchPlanes(); // Fetch planes when the button is clicked
    setButtonStatus(false); // Hide the button after clicking
  };

  return (
    <div className='bg-[#FFFDF7] min-h-screen'>
      <Header />
      <div className='main_section' style={{ fontFamily: "Nunito" }}>
        {/* Title Section with Button Aligned to the Right */}
        <div className='title-section flex justify-between items-center px-4'>
          <h1 className='text-3xl font-bold'>Self Care Activities</h1>
          {/* Conditionally render the button based on buttonStatus */}
         
            <button
              className='bg-[#A4CDA7] px-4 py-2 rounded-md hover:bg-[#8cb48f] transition-colors'
              onClick={handleGenerateClick} // Call handleGenerateClick on button click
            >
              Generate Plains
            </button>
         
        </div>

        {/* Grid Section */}
        <div className="px-4 flex justify-center mt-20">
          {isGenerated ? ( // Check if the button is clicked
            <div className='grid-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-20'>
              {randomSuggestions.map((suggestion, index) => (
                <Link to={`/Activity_Tracking/ActivityTracking/${suggestion.id}`} key={index}>
                  <div className="plane-cards my-4 bg-[#A4CDA7] w-[300px] h-[300px] p-4 flex justify-center shadow-lg rounded-xl">
                    <h2 className="text-[20px] font-semibold text-center">{suggestion.title}</h2>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            // Display a message if the button is not clicked
            <div className="flex justify-center items-center h-64">
              <p className="text-2xl text-gray-600">Click the Generate button to View Your Plains</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};