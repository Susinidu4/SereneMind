import React from "react";
import GlobalStyle from "../../assets/Prototype/GlobalStyle";

export const EditJournal = ({ data, onClose }) => {
  // Destructure the data prop with default values
  const {
    date = "2025-03-19",
    time = "2:30 PM",
    mood = "Happy",
    intensity = 5,
    emotions = ["Excited", "Content", "Relaxed"],
    triggers = "A surprise birthday party organized by friends.",
    coping = "Enjoyed the moment, expressed gratitude, and wrote about the experience in a journal.",
    notes = [
      "Met an old friend",
      "Tried a new dessert",
      "Enjoyed the ambiance",
    ],
    reflections = [
      "Grateful for the thoughtful gesture",
      "Realized the value of friendships",
      "Inspired to plan surprises for others",
    ],
    images = [
      "https://via.placeholder.com/150?text=Image1",
      "https://via.placeholder.com/150?text=Image2",
      "https://via.placeholder.com/150?text=Image3",
      "https://via.placeholder.com/150?text=Image4",
    ],
  } = data || {}; // Use passed data or fallback to default

  return (
    <div>
      <main className="flex-grow mx-20">
        <div className={GlobalStyle.fontNunito}>
          <div className={`${GlobalStyle.pageContainer}bg-[#C8E6C9] rounded-lg shadow-lg w-[90%] sm:w-[800px] p-6 relative`}>
            <button
              className="absolute top-2 right-2 text-red-500"
              onClick={onClose}
              aria-label="Close"
            >
              Edit
            </button>

            <h2
              id="moodDetailsTitle"
              className="text-2xl font-bold text-center mb-4"
            >
              Mood Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#A5D6A7] rounded-lg">
                <p>Date: {date}</p>
                <p>Time: {time}</p>
                <p>Overall Mood: {mood}</p>
                <p>Mood Intensity: {intensity}</p>
              </div>
              <div className="p-4 bg-[#A5D6A7] rounded-lg">
                <h3 className="font-semibold">What Emotions You Felt:</h3>
                <ul className="list-disc ml-5">
                  {emotions.map((emotion, index) => (
                    <li key={index}>{emotion}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 bg-[#A5D6A7] p-4 rounded-lg">
              <h3 className="font-semibold">What Triggered This Mood:</h3>
              <p>{triggers}</p>
            </div>

            <div className="mt-4 bg-[#A5D6A7] p-4 rounded-lg">
              <h3 className="font-semibold">What You Coped With This Mood:</h3>
              <p>{coping}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-[#A5D6A7] rounded-lg">
                <h3 className="font-semibold">Notes:</h3>
                <ul className="list-disc ml-5">
                  {notes.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-[#A5D6A7] rounded-lg">
                <h3 className="font-semibold">Reflections:</h3>
                <ul className="list-disc ml-5">
                  {reflections.map((reflection, index) => (
                    <li key={index}>{reflection}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex space-x-2 mt-4">
              {images.map((src, index) => (
                <div
                  key={index}
                  className="w-20 h-20 bg-gray-300 flex items-center justify-center rounded-lg relative"
                >
                  <img
                    src={src}
                    alt={`Item ${index}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    className="absolute top-1 right-1 text-red-500"
                    onClick={() => removeImage(index)}
                    aria-label="Remove"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
