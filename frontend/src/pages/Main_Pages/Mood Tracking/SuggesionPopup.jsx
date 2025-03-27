import React, { useState, useEffect } from "react";
import GlobalStyle from "../../../assets/Prototype/GlobalStyle";
import { IoCloseCircleOutline } from "react-icons/io5";
import axios from "axios";
import Swal from "sweetalert2";

export const SuggesionPopup = ({ suggestions, onClose }) => {
  const user = JSON.parse(localStorage.getItem("userData"));
  const [message, setMessage] = useState({ text: "", type: "" });
  const [randomSuggestions, setRandomSuggestions] = useState([]);

  // Function to get random suggestions
  const getRandomSuggestions = (allSuggestions, count) => {
    if (!allSuggestions || !Array.isArray(allSuggestions)) return [];
    const shuffled = [...allSuggestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };


  // Initialize random suggestions when component mounts or suggestions prop changes
  useEffect(() => {
    if (suggestions?.suggestions) {
      const random = getRandomSuggestions(suggestions.suggestions, 6);
      setRandomSuggestions(random);
    }
  }, [suggestions]);

  const handleSubmit = async () => {
    if (!user?.id) {
      setMessage({
        text: "User not authenticated",
        type: "error",
      });
      return;
    }

    if (randomSuggestions.length === 0) {
      setMessage({
        text: "No suggestions to save",
        type: "error",
      });
      return;
    }

    try {
      const payload = {
        user_id: user.id,
        suggestions: randomSuggestions.map((suggestion) => ({
          id: suggestion.id,
          title: suggestion.title,
          plane: suggestion.plane,
        })),
      };

      const response = await axios.post(
        "http://localhost:5000/suggestions/add",
        payload
      );

      setMessage({
        text: "Suggestions bundle created successfully!",
        type: "success",
      });
      Swal.fire({
        title: "Login Successful!",
        text: "Login successfully!",
        icon: "success",
      });
       //set expire date for 1 week
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 7); // 7 days = 1 week
      
            const buttonStatus = 
              {status: false,
              expireDate: expirationDate.toISOString(),};
          
            localStorage.setItem('buttonStatus', JSON.stringify(buttonStatus));
            window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMessage =
        error.response?.data?.message || "Internal server error";
      setMessage({
        text: errorMessage,
        type: "error",
      });
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
      <main
        className={`bg-[#005457] p-6 rounded-xl shadow-lg shadow-gray-500 max-h-[500px] overflow-y-auto max-w-md w-full`}
        style={{ fontFamily: "Nunito" }}
      >
        <div className="flex justify-end">
          <IoCloseCircleOutline
            size={25}
            onClick={onClose}
            color="#E9F1F1"
            className="cursor-pointer"
          />
        </div>
        <h2 className="text-xl font-bold mb-4 text-white">
          Your Mood Suggestions
        </h2>

        {message.text && (
          <div
            className={`mb-4 p-2 rounded ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        {randomSuggestions.length > 0 ? (
          <div>
            <p className="font-semibold mb-3 text-white">
              Here are some activities that might help:
            </p>
            <ul className="space-y-4">
              {randomSuggestions.map((activity) => (
                <li
                  key={activity.id}
                  className="bg-[#E9F1F1] shadow-sm shadow-gray-400 p-3 rounded-[5px]"
                >
                  <h3 className="font-medium text-lg">{activity.title}</h3>
                  <p className="mt-1">{activity.plane}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <p className="text-gray-200">
              No suggestions available at the moment.
            </p>
            {suggestions?.pattern && (
              <p className="mt-2 text-white">
                <strong>Pattern:</strong> {suggestions.pattern}
              </p>
            )}
            {suggestions?.recommendation && (
              <p className="mt-2 text-white">
                <strong>Recommendation:</strong> {suggestions.recommendation}
              </p>
            )}
          </div>
        )}

        {randomSuggestions.length > 0 && (
          <button
            onClick={handleSubmit}
            className={`${GlobalStyle.buttonPrimary} mt-6 w-full`}
          >
            Save Suggestions
          </button>
        )}
      </main>
    </div>
  );
};
