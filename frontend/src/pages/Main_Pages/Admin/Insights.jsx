import React, { useEffect, useState } from "react";
import axios from "axios";
import GlobalStyle from "../../../assets/Prototype/GlobalStyle";

export const Insights = () => {
  const [summary, setSummary] = useState({
    ratingsDistribution: [],
    totalRatings: 0,
    averageRating: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/resource_management/summary");
        setSummary(response.data);
      } catch (error) {
        console.error("Error fetching feedback summary:", error);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="gap-10 min-h-screen flex flex-col items-center justify-center p-4">
      {/* Customer Reviews Section */}
      <div className="bg-gray-50 rounded-xl shadow-lg p-12 w-full max-w-[600px] h-110 mb-4">
        <h2 className={`${GlobalStyle.headingMedium} pb-10`}>Customer Reviews</h2>
        <div className="space-y-8">
          {summary.ratingsDistribution.map(({ _id: rating, count }) => (
            <div key={rating} className="flex items-center space-x-2">
              <span className="text-lg font-medium w-6 text-right">{rating}.0</span>
              <div className="flex-grow bg-gray-200 rounded-full h-3 w-80">
                <div
                  className="bg-green-800 h-3 rounded-full"
                  style={{ width: `${(count / summary.totalRatings) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Average Rating Section */}
      <div className="bg-gray-50 rounded-xl shadow-lg p-6 w-full max-w-[400px] h-50 text-center">
        <div className="text-[40px] font-bold">{summary.averageRating}</div>
        <div className="flex justify-center items-center space-x-1 text-green-800 mt-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.188c.969 0 1.371 1.24.588 1.81l-3.396 2.462a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.538 1.118l-3.396-2.462a1 1 0 00-1.176 0l-3.396 2.462c-.783.57-1.838-.197-1.538-1.118l1.287-3.967a1 1 0 00-.364-1.118L2.635 9.394c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 00.95-.69l1.286-3.967z" />
            </svg>
          ))}
        </div>
        <div className="text-[20px] text-gray-500 mt-2">{summary.totalRatings} ratings</div>
      </div>
    </div>
  );
};
