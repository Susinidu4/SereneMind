import React, { useState, useEffect } from "react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

export const ActivityProgress = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [progressData, setProgressData] = useState([]);
  const [totalProgress, setTotalProgress] = useState(0);
  const [dailyNotes, setDailyNotes] = useState([]);

  // Static data for the charts
  const staticData = {
    data: [
      { activity: "Meditation", progress: 75 },
      { activity: "Exercise", progress: 60 },
      { activity: "Reading", progress: 85 },
      { activity: "Journaling", progress: 45 },
      { activity: "Therapy", progress: 90 }
    ],
    totalProgress: 70,
    notes: [
      { time: "8:30 AM", date: "2025-03-01", activity: "Meditation", note: "Focused on breathing exercises" },
      { time: "7:15 PM", date: "2025-03-02", activity: "Exercise", note: "30-minute jog in the park" },
      { time: "9:00 AM", date: "2025-03-03", activity: "Reading", note: "Read 20 pages of self-help book" },
      { time: "6:45 PM", date: "2025-03-04", activity: "Journaling", note: "Reflected on daily achievements" },
      { time: "10:30 AM", date: "2025-03-05", activity: "Therapy", note: "Session about stress management" }
    ]
  };

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch(`http://localhost:5000/progress/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch progress data");
        }
        const data = await response.json();
        setProgressData(data.days);
        setTotalProgress(data.totalPercentage);
        setDailyNotes(data.notes);
      } catch (error) {
        console.error("Error fetching progress data, using static values:", error);
        setProgressData(staticData.data);
        setTotalProgress(staticData.totalProgress);
        setDailyNotes(staticData.notes);
      }
    };

    fetchProgress();
  }, [id]);

  const COLORS = ["#407F81", "#005457", "#fae3d9", "#bbded6"];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r px-6 py-10">
      <div className="flex justify-between w-full max-w-[1200px] gap-6">
        {/* Bar Chart - Daily Progress */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.6 }}
          className="w-[48%] h-[500px] bg-white p-6 rounded-2xl shadow-lg border mt-6 hover:shadow-2xl transform transition duration-300">
          <h2 className="text-xl font-bold mb-4 text-center text-gray-700">Daily Progress</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={progressData}>
              <XAxis dataKey="activity" stroke="#005457" />
              <YAxis stroke="#005457" />
              <Tooltip />
              <Legend />
              <Bar dataKey="progress" fill="#005457" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart - Overall Progress */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-[48%] h-[500px] bg-white p-6 rounded-2xl shadow-lg border mt-6 hover:shadow-2xl transform transition duration-300">
          <h2 className="text-xl font-bold mb-4 text-center text-gray-700">Overall Progress</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie 
                data={[
                  { name: "Completed", value: totalProgress },
                  { name: "Remaining", value: 100 - totalProgress }
                ]}
                dataKey="value" 
                nameKey="name" 
                cx="50%" cy="50%" 
                outerRadius={120}>
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Daily Notes Table */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.6, delay: 0.6 }}
        className="w-full max-w-[1200px] mt-8 bg-white p-6 rounded-2xl shadow-lg border">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-700">Daily Notes</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border-b px-4 py-2 text-left">Time</th>
              <th className="border-b px-4 py-2 text-left">Date</th>
              <th className="border-b px-4 py-2 text-left">Activity</th>
              <th className="border-b px-4 py-2 text-left">Note</th>
            </tr>
          </thead>
          <tbody>
            {dailyNotes.map((note, index) => (
              <tr key={index}>
                <td className="border-b px-4 py-2">{note.time}</td>
                <td className="border-b px-4 py-2">{note.date}</td>
                <td className="border-b px-4 py-2">{note.activity}</td>
                <td className="border-b px-4 py-2">{note.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};