import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { Footer } from "../../components/Footer";
import { Link } from 'react-router-dom';
import GlobalStyle from "../../assets/Prototype/GlobalStyle";
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

export const SelfCarePlanes = () => {
  const [planes, setPlanes] = useState([]);
  const [randomSuggestions, setRandomSuggestions] = useState([]);
  const [isGenerated, setIsGenerated] = useState(false);

  const user = JSON.parse(localStorage.getItem('userData'));
  const sessionSuggesions = JSON.parse(localStorage.getItem('storedDate'));
  const buttonStatus = JSON.parse(localStorage.getItem('isGenerated'));

  const currentDate = new Date();

  const encouragementMessages = [
    "You're doing amazing—keep it up! 💪",
    "Every small step counts! 🌱",
    "Your mental health matters! 💖",
    "Believe in yourself—you got this! 🌟",
    "Progress is progress, no matter how small! 🚀",
    "Self-care isn't selfish, it's necessary! 🧘",
    "One day at a time—you're making a difference! ☀️",
    "You're stronger than you think! 💪",
    "Keep going, you're creating a better you! 🌸",
    "Your well-being is a priority, not an option! 🌿",
    "Celebrate your small wins—they add up! 🎉",
    "Take a deep breath, you've got this! 😌"
  ];

  useEffect(() => {
    if (sessionSuggesions) {
      const dateData = sessionSuggesions;
      const cTime = new Date();
      const eTime = new Date(dateData.expires);

      // Check if the data has expired
      if (cTime > eTime) {
        console.log('The stored date has expired.');
        localStorage.removeItem('storedDate'); // Remove expired data
        localStorage.removeItem('isGenerated');
      } else {
        console.log('Stored date:', new Date(dateData.date));
      }
    } else {
      console.log('No date found in session storage.');
    }
  }, [sessionSuggesions]);

  const fetchPlanes = async () => {
    // Set expiration to 1 week from now
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7); // 7 days = 1 week

    try {
      const response = await fetch(`http://localhost:5000/mood/analyze/${user.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch planes');
      }
      const data = await response.json();
      console.log('API Response:', data);

      const enrichedSuggestions = data.suggestions.map(suggestion => {
        const completed = suggestion.completed ?? Math.floor(Math.random() * 101);
        return {
          ...suggestion,
          completed,
          remaining: 100 - completed,
        };
      });

      const shuffledSuggestions = shuffleArray(enrichedSuggestions).slice(0, 6);
      setRandomSuggestions(shuffledSuggestions);

      const dateData = {
        suggestions: shuffledSuggestions,
        date: currentDate.toISOString(), // Store the date in ISO format
        expires: expirationDate.toISOString(), // Store the expiration date
      };

      // Convert the object to a string and store it in localStorage
      localStorage.setItem('storedDate', JSON.stringify(dateData));
      setIsGenerated(true);
    } catch (error) {
      console.error('Error fetching planes:', error);
    }
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleGenerateClick = () => {
    fetchPlanes(); // Fetch planes when the button is clicked
    localStorage.setItem('isGenerated', 'true');
  };

  return (
    <div className='bg-[#FFFDF7] min-h-screen'>
      <Header />
      <div className="flex-grow mx-20">
        <div className={GlobalStyle.fontNunito}>
          <h1 className={`${GlobalStyle.headingLarge}`}>Self Care Activities</h1>
          {!buttonStatus && (
            <button
              className='bg-[#A4CDA7] px-4 py-2 rounded-md hover:bg-[#8cb48f] transition-colors'
              onClick={handleGenerateClick}
            >
              Generate Plans
            </button>
          )}
        </div>

        <div className="px-4 flex justify-center mt-20">
          {sessionSuggesions ? (
            <div className='grid-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-20'>
              {sessionSuggesions.suggestions.map((suggestion, index) => {
                const data = [
                  { name: 'Completed', value: suggestion.completed },
                  { name: 'Remaining', value: suggestion.remaining },
                ];

                const COLORS = ['#4CAF50', '#D3D3D3'];
                const randomMessage = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];

                return (
                  <Link to={`/Activity_Tracking/ActivityTracking/${suggestion.id}`} key={index}>
                    <div className="plane-cards my-4 bg-[#A4CDA7] w-[600px] h-[400px] p-4 flex flex-col items-center shadow-lg rounded-xl">
                      <h2 className="text-[20px] font-semibold text-center mb-4">{suggestion.title}</h2>
                      <PieChart width={200} height={200}>
                        <Pie
                          data={data}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label
                        >
                          {data.map((entry, i) => (
                            <Cell key={`cell-${i}`} fill={COLORS[i]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                      <p className="text-center mt-2">
                        <span className="text-green-600 font-bold">{suggestion.completed}%</span> Completed |
                        <span className="text-gray-500 font-bold"> {suggestion.remaining}%</span> Remaining
                      </p>
                      <p className="text-center mt-4 text-blue-700 font-semibold text-lg italic">{randomMessage}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className="text-2xl text-gray-600">Click the Generate button to View Your Plans</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};