import { useState } from "react";
import { Header_2 } from "../../../components/Header_2";
import Swal from 'sweetalert2'


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
  const user = JSON.parse(localStorage.getItem("userData"));
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
          createdAt: new Date().toISOString(), // Add timestamp
        }),
        
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
      if (!response.ok) {
        throw new Error("Failed to save mood");
      }

      const data = await response.json();
      console.log("Mood saved successfully:", data);
      setSelectedEmoji(null); // Reset selected emoji after saving
    } catch (err) {
      setError(err.message);
      console.error("Error saving mood:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header_2 />
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-[#C4C8AC] p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Select Your Mood</h1>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {Object.keys(emotionMap).map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleEmojiClick(emoji)}
                className={`flex justify-center items-center text-4xl p-4 bg-white rounded-lg shadow-md hover:bg-gray-200 transition-colors ${
                  selectedEmoji === emoji ? "ring-2 ring-blue-500" : ""
                }`}
                disabled={loading} // Disable buttons while loading
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
              onClick={handleSave}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
              disabled={loading} // Disable save button while loading
            >
              {loading ? "Saving..." : "Save Mood"}
            </button>
          </div>
        )}
        {error && <p className="mt-4 text-red-600">Error: {error}</p>}
      </div>
    </div>
  );
};