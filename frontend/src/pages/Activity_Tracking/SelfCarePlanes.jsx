import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { Footer } from "../../components/Footer";
import { Link } from 'react-router-dom';
import GlobalStyle from "../../assets/Prototype/GlobalStyle";
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

export const SelfCarePlanes = () => {
  const [planes, setPlanes] = useState([]);


  const user = JSON.parse(localStorage.getItem('userData'));
  const sessionSuggesions = JSON.parse(localStorage.getItem('storedDate'));




  const encouragementMessages = [
    "You're doing amazing—keep it up! ",
    "Every small step counts! ",
    "Your mental health matters! ",
    "Believe in yourself—you got this! ",
    "Progress is progress, no matter how small! ",
    "Self-care isn't selfish, it's necessary! ",
    "One day at a time—you're making a difference! ",
    "You're stronger than you think! ",
    "Keep going, you're creating a better you! ",
    "Your well-being is a priority, not an option! ",
    "Celebrate your small wins—they add up! ",
    "Take a deep breath, you've got this! "
  ];


  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const response = await fetch(`http://localhost:5000/suggestions/user/${user.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch planes');
        }
        const data = await response.json();
        
        // Correct way to access suggestions:
        const suggestions = data.data[0]?.suggestions || [];
        setPlanes(suggestions);
    
        const enrichedSuggestions = suggestions.map(suggestion => {
          const completed = suggestion.completed ?? Math.floor(Math.random() * 101);
          return {
            ...suggestion,
            completed,
            remaining: 100 - completed,
          };
        });
    
      } catch (error) {
        console.error('Error fetching planes:', error);
      }
    };

    fetchPlanes();
  }, [user.id]);



  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF7]">
      <Header />
      <main className="flex-grow mx-20">
        <div className={GlobalStyle.fontNunito}>
          <h1 className={`${GlobalStyle.headingLarge}`}>Self Care Activities</h1>
        </div>

        <div className="px-4 flex justify-center mt-20">
            <div className='grid-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-20'>
              {planes.map((suggestion, index) => {
                const data = [
                  { name: 'Completed', value: suggestion.completed },
                  { name: 'Remaining', value: suggestion.remaining },
                ];

                const COLORS = ['#407F81', '#E0EAEA'];
                const randomMessage = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];

                return (
                  <Link to={`/Activity_Tracking/ActivityTracking/${suggestion.id}`} key={index}>
                    <div className="plane-cards my-6 bg-[#C0D5D5] w-[600px] h-[400px] p-4 flex flex-col items-center shadow-lg rounded-xl">
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
                        <span className="text-black font-bold">{suggestion.completed}%</span> Completed |
                        <span className="text-gray-400 font-bold"> {suggestion.remaining}%</span> Remaining
                      </p>
                      <p className="text-center mt-4 text-[#005457] font-semibold text-lg italic">{randomMessage}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
};
