import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { Footer } from "../../components/Footer";
import { Link } from 'react-router-dom';
import GlobalStyle from "../../assets/Prototype/GlobalStyle";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

export const SelfCarePlanes = () => {
  const [allPlanes, setAllPlanes] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem('userData')) || {};

  const encouragementMessages = [
    "You're doing amazing—keep it up!",
    "Every small step counts!",
    "Your mental health matters!",
    "Believe in yourself—you got this!",
    "Progress is progress, no matter how small!",
    "Self-care isn't selfish, it's necessary!",
    "One day at a time—you're making a difference!",
    "You're stronger than you think!",
    "Keep going, you're creating a better you!",
    "Your well-being is a priority, not an option!",
    "Celebrate your small wins—they add up!",
    "Take a deep breath, you've got this!"
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!user.id) {
        setError('No user ID found');
        setLoading(false);
        return;
      }
  
      try {
        console.log('Fetching planes for user:', user.id);
        
        // Fetch all planes for the user
        const planesResponse = await fetch(`http://localhost:5000/suggestions/user/${user.id}`);
        if (!planesResponse.ok) {
          throw new Error(`Failed to fetch planes: ${planesResponse.status}`);
        }
        
        const planesData = await planesResponse.json();
        console.log('Planes data received:', planesData);
        
        if (!planesData.success || !planesData.data) {
          throw new Error('Invalid planes data structure');
        }
  
        setAllPlanes(planesData.data || []);
  
        // Process each plane and its suggestions
        const processedSuggestions = await Promise.all(
          planesData.data.flatMap(async (plane) => {
            if (!plane.suggestions || !Array.isArray(plane.suggestions)) {
              console.warn('Plane has no suggestions array:', plane);
              return [];
            }
  
            return await Promise.all(
              plane.suggestions.map(async (suggestion) => {
                try {
                  console.log(`Fetching tracking for suggestion ${suggestion.id} from plane ${plane._id}`);
                  
                  // Use the plane's _id as the suggestion_id parameter
                  const trackingResponse = await fetch(
                    `http://localhost:5000/api/activity_tracking/suggestion/${plane._id}`
                  );
                  
                  if (!trackingResponse.ok) {
                    console.warn(`Failed to fetch tracking for suggestion ${suggestion.id}`);
                    return {
                      ...suggestion,
                      planeId: plane._id,
                      completed: 0,
                      remaining: 100,
                      totalProgress: 0
                    };
                  }
  
                  const trackingData = await trackingResponse.json();
                  console.log(`Tracking data for suggestion ${suggestion.id}:`, trackingData);
                  
                  let completedDays = 0;
                  let totalProgress = 0;
                  
                  if (trackingData.data && trackingData.data.Day) {
                    completedDays = trackingData.data.Day.length;
                    totalProgress = trackingData.data.Day.reduce(
                      (sum, day) => sum + (day.progress || 0), 
                      0
                    );
                    
                    if (completedDays > 0) {
                      totalProgress = Math.round(totalProgress / completedDays);
                    }
                  }
                  
                  // Calculate completion percentage (max 100%)
                  const completedPercentage = Math.min(Math.round((completedDays / 7) * 100), 100);
                  
                  console.log(`Suggestion ${suggestion.id} stats:`, {
                    completedDays,
                    totalProgress,
                    completedPercentage,
                    remaining: 100 - completedPercentage
                  });
                  
                  return {
                    ...suggestion,
                    planeId: plane._id,
                    completed: completedPercentage,
                    remaining: 100 - completedPercentage,
                    totalProgress: totalProgress
                  };
                } catch (error) {
                  console.error(`Error processing suggestion ${suggestion.id}:`, error);
                  return {
                    ...suggestion,
                    planeId: plane._id,
                    completed: 0,
                    remaining: 100,
                    totalProgress: 0
                  };
                }
              })
            );
          })
        );
  
        // Flatten the array of arrays
        const flattenedSuggestions = processedSuggestions.flat();
        console.log('Final suggestions data:', flattenedSuggestions);
        setSuggestions(flattenedSuggestions);
        setError(null);
      } catch (error) {
        console.error('Error in fetchData:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [user.id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FFFDF7]">
        <Header />
        <main className="flex-grow mx-20 flex justify-center items-center">
          <div className="text-red-500 text-lg">{error}</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF7]">
      <Header />
      <main className="flex-grow mx-20">
        <div className={GlobalStyle.fontNunito}>
          <h1 className={`${GlobalStyle.headingLarge}`}>Self Care Activities</h1>
        </div>

        <div className="px-4 flex justify-center mt-10">
          <div className='grid-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-20'>
            {suggestions.length > 0 ? suggestions.map((suggestion, index) => {
              const data = [
                { name: 'Completed', value: suggestion.completed },
                { name: 'Remaining', value: suggestion.remaining },
              ];

              const COLORS = ['#407F81', '#E0EAEA'];
              const randomMessage = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];

              return (
                <Link 
                  to={`/Activity_Tracking/ActivityTracking/plane/${suggestion.planeId}/${suggestion.id}`} 
                  key={index}
                >
                  <div className="plane-cards my-6 bg-[#C0D5D5] w-[600px] h-[400px] p-4 flex flex-col items-center shadow-lg rounded-xl">
                    <h2 className="text-[20px] font-semibold text-center mb-4">{suggestion.title}</h2>
                    <div className="flex items-center justify-center">
                      <PieChart width={300} height={300}>
                        <Pie
                          data={data}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {data.map((entry, i) => (
                            <Cell key={`cell-${i}`} fill={COLORS[i]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => `${value}%`}
                        />
                        <Legend />
                      </PieChart>
                    </div>
                    <p className="text-center mt-2">
                      <span className="text-black font-bold">{suggestion.completed}%</span> Completed |
                      <span className="text-gray-400 font-bold"> {suggestion.remaining}%</span> Remaining
                    </p>
                    {suggestion.totalProgress > 0 && (
                      <p className="text-center mt-2">
                        Average Daily Progress: <span className="font-bold">{suggestion.totalProgress}%</span>
                      </p>
                    )}
                    <p className="text-center mt-4 text-[#005457] font-semibold text-lg italic">{randomMessage}</p>
                  </div>
                </Link>
              );
            }) : (
              <div className="col-span-2 flex justify-center">
                <p className="text-gray-500 text-lg">No self-care activities found. Start by creating one!</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};