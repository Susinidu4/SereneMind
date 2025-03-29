import { useState, useEffect } from "react";
import { Header_2 } from "../../../components/Header_2";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import GlobalStyle from "../../../assets/Prototype/GlobalStyle";

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

export const Mood_Tracking_Update = () => {
  

  const { id } = useParams(); // Get moodId from the URL
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userData"));
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  // Redirect if user is already logged in
  if (!user){
    window.location.href = '/login';
  } else if (user.role === "admin") {
    window.location.href = '/admindashboard';
  }

  // Fetch the existing mood entry
  useEffect(() => {
    const fetchMood = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/mood/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch mood data");
        }
        const data = await response.json();
        setSelectedEmoji(data.emoji); // Pre-fill the selected emoji
      } catch (err) {
        setError(err.message);
        console.error("Error fetching mood:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMood();
  }, [id]);

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
  };

  const handleUpdate = async () => {
    if (!selectedEmoji) {
      setError("Please select an emoji first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/mood/${id}`, {
        method: "PUT", // Use PUT or PATCH for updating
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emoji: selectedEmoji,
          user_id: user.id,
          updatedAt: new Date().toISOString(), // Add updated timestamp
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update mood");
      }

      const data = await response.json();
      console.log("Mood updated successfully:", data);
      Swal.fire({
        title: `${selectedEmoji} Updated Successfully `,
        text: "Your mood has been updated successfully.",
        icon: "success",
        draggable: true
      });
      navigate("/userprofile"); // Redirect to mood tracking page after update
    } catch (err) {
      setError(err.message);
      console.error("Error updating mood:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header_2 />
      <main className="min-h-screen flex flex-col items-center justify-center p-4" style={{ fontFamily: "Nunito" }}>
      <div className="p-8 rounded-lg bg-[#005457] shadow-gray-400 shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-white">Update Your Mood</h1>
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
                type="submit"
                onClickCapture={handleUpdate}
                className={`${GlobalStyle.buttonPrimary} w-full`}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </button>
          </div>
        )}
        {error && <p className="mt-4 text-red-600">Error: {error}</p>}
      </main>
    </div>
  );
};