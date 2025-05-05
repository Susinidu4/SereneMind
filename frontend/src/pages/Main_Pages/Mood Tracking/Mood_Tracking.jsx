import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import GlobalStyle from "../../../assets/Prototype/GlobalStyle";
import { SuggesionPopup } from "./SuggesionPopup";
import { Header_2 } from "../../../components/Header_2";

const user = JSON.parse(localStorage.getItem("userData"));

const emotionMap = {
  "😊": "happy",
  "😔": "sad",
  "😡": "angry",
  "😴": "tired",
  "😢": "feeling down",
  "😂": "feeling joyful",
  "😰": "feeling anxious",
  "🤢": "feeling sick",
  "🥳": "feeling excited",
  "😕": "feeling confused",
};

export const Mood_Tracking = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const buttonData = JSON.parse(localStorage.getItem("buttonStatus"));

  // Redirect if user is not logged in or is admin
  if (!userData) {
    window.location.href = "/login";
  } else if (user.role === "admin") {
    window.location.href = "/admindashboard";
  }

  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestion, setSuggestion] = useState(null);
  const [showSuggestionPopup, setShowSuggestionPopup] = useState(false);
  const [moodData, setMoodData] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [todayMoodCount, setTodayMoodCount] = useState(0);

  useEffect(() => {
    const fetchMoodData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/mood/user/${user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch mood data");
        }
        const data = await response.json();
        setMoodData(data);
        
        // Calculate today's mood count
        const today = new Date().toISOString().split('T')[0];
        const todayMoods = data.filter(mood => {
          const moodDate = new Date(mood.createdAt).toISOString().split('T')[0];
          return moodDate === today;
        });
        setTodayMoodCount(todayMoods.length);
      } catch (err) {
        console.error("Error fetching mood data:", err);
      }
    };
    
    fetchMoodData();
  }, [user.id, loading]); // Re-fetch when loading changes (after save)

  // Calculate unique emojis count
  const uniqueEmojisCount = () => {
    const uniqueEmojis = new Set();
    moodData.forEach(mood => uniqueEmojis.add(mood.emoji));
    return uniqueEmojis.size;
  };

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
  };

  const handleSave = async () => {
    if (!selectedEmoji) {
      setError("Please select an emoji first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/mood/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emoji: selectedEmoji,
          user_id: user.id,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save mood");
      }

      const data = await response.json();
      console.log("Mood saved successfully:", data);
      setSelectedEmoji(null);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your mood has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      setError(err.message);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to save mood",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Error saving mood:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (todayMoodCount < 10) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `You need ${10 - todayMoodCount} more mood entries today to generate a suggestion`,
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    setLoading(true);
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/mood/analyze/${user.id}`
      );

      if (!response.ok) {
        throw new Error("Failed to get mood analysis");
      }

      const data = await response.json();
      setSuggestion(data);
      setShowSuggestionPopup(true);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Suggestion Generated",
        showConfirmButton: false,
        timer: 1500,
      });
      
    } catch (err) {
      setError(err.message);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to get suggestions",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Error getting mood analysis:", err);
    } finally {
      setLoading(false);
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF7]">
      <Header_2 />
      <main
        className={`flex-grow mx-20 ${GlobalStyle.fontNunito}`}
        style={{ fontFamily: "Nunito" }}
      >
        <div>
          <h1 className="text-4xl font-bold">Mood Tracking</h1>
          <p>
            <b className="text-red-500">*</b> To create a personalized self-care plan, please select and upload
            your mood for the day. You need to upload at least 10 different
            moods for a comprehensive analysis. Remember, you can generate only
            one self-care plan per day. This plan will help guide you in
            maintaining and improving your mental well-being.
          </p>
          <p className="mt-2 text-blue-600">
            Today's mood entries: {todayMoodCount}/10
          </p>
        </div>
        <div className="flex flex-col items-center p-20">
          <div className="py-10">
            <button
              onClick={handleGenerate}
              disabled={todayMoodCount < 10 || loading}
              className={`${GlobalStyle.buttonPrimary} w-full ${
                todayMoodCount < 10 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isGenerating ? "Generating..." : "Generate Suggestions"}
            </button>
            {todayMoodCount < 10 && (
              <p className="text-red-500 text-center mt-2">
                You need {10 - todayMoodCount} more mood entries today to generate suggestions
              </p>
            )}
          </div>
          <div className="p-8 rounded-lg bg-[#005457] shadow-gray-400 shadow-lg w-full max-w-md">
            <h1 className="text-2xl text-white font-bold mb-6 text-center">
              Select Your Mood
            </h1>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {Object.keys(emotionMap).map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleEmojiClick(emoji)}
                  className={`flex justify-center items-center text-4xl p-4 bg-white rounded-lg shadow-md hover:bg-gray-200 transition-colors ${
                    selectedEmoji === emoji ? "ring-2 ring-blue-500" : ""
                  }`}
                  disabled={loading}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          {selectedEmoji && (
            <div className="mt-8 text-center">
              <p className="text-lg">
                You selected: <span className="text-4xl">{selectedEmoji}</span>
              </p>
              <p className="text-gray-600">{emotionMap[selectedEmoji]}</p>
              <button
                type="submit"
                onClick={handleSave}
                className={`${GlobalStyle.buttonPrimary} w-full`}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          )}
          {error && <p className="mt-4 text-red-600">Error: {error}</p>}
        </div>
      </main>

      <Footer />

      {showSuggestionPopup && (
        <SuggesionPopup
          suggestions={suggestion}
          onClose={() => setShowSuggestionPopup(false)}
        />
      )}
    </div>
  );
};