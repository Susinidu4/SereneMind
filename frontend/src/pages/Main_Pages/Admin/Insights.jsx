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
        const response = await axios.get(
          "http://localhost:5000/api/resource_management/summary"
        );
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
        <h2 className={`${GlobalStyle.headingMedium} pb-10`}>
          Customer Reviews
        </h2>
        <div className="space-y-8">
          {summary.ratingsDistribution.map(({ _id: rating, count }) => (
            <div key={rating} className="flex items-center space-x-2">
              <span className="text-lg font-medium w-6 text-right">
                {rating}.0
              </span>
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
          {Array.from({ length: 5 }).map((_, index) => {
            const averageRating = (summary.averageRating / 10) * 5;
            const fillPercentage =
              Math.min(Math.max(averageRating - index, 0), 1) * 100;

            return (
              <div key={index} className="relative w-8 h-8">
                {/* Star Outline */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-0 left-0 w-full h-full"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {/* Star Fill */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-0 left-0 w-full h-full"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{
                    clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`,
                  }}
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
            );
          })}
        </div>

        <div className="text-[20px] text-gray-500 mt-2">
          {summary.totalRatings} ratings
        </div>
      </div>
    </div>
  );
};
