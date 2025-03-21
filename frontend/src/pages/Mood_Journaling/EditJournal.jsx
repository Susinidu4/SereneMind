import React from "react";
import GlobalStyle from "../../assets/Prototype/GlobalStyle";
import { IoClose } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";

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
          <div className="flex justify-center items-center min-h-screen">
          <div
            className={`${GlobalStyle.pageContainer} rounded-lg shadow-lg w-[90%] sm:w-[800px] p-10 relative`}
          >
            <button
              className="absolute top-3 right-3 text-red-900"
              onClick={onClose}
              aria-label="Close"
            >
              <IoMdCloseCircle  size={30} />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
              <div>
                <p className="text-lg font-semibold">Date: {date}</p>
                <p className="text-lg font-semibold">Time: {time}</p>
                <div className="p-4 bg-[#A5D6A7] rounded-lg shadow-md mt-5">
                  <p className="text-lg font-semibold">Overall Mood: {mood}</p>
                  <p className="text-lg font-semibold">
                    Mood Intensity: {intensity}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[#A5D6A7] rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">
                  What Emotions You Felt:
                </h3>
                <ul className="list-disc ml-5 mt-2">
                  {emotions.map((emotion, index) => (
                    <li key={index} className="text-lg">
                      {emotion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 bg-[#A5D6A7] p-4 rounded-lg shadow-md">
              <h3 className="font-semibold">What Triggered This Mood:</h3>
              <p>{triggers}</p>
            </div>

            <div className="mt-4 bg-[#A5D6A7] p-4 rounded-lg shadow-md">
              <h3 className="font-semibold">What You Coped With This Mood:</h3>
              <p>{coping}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 ">
              <div className="p-4 bg-[#A5D6A7] rounded-lg shadow-md">
                <h3 className="font-semibold">Notes:</h3>
                <ul className="list-disc ml-5">
                  {notes.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-[#A5D6A7] rounded-lg shadow-md">
                <h3 className="font-semibold">Reflections:</h3>
                <ul className="list-disc ml-5">
                  {reflections.map((reflection, index) => (
                    <li key={index}>{reflection}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex space-x-2 mt-4 bg-[#A5D6A7] p-4 rounded-lg shadow-md">
              {images.map((src, index) => (
                <div
                  key={index}
                  className="w-20 h-20 flex items-center justify-center rounded-lg relative"
                >
                  <img
                    src={src}
                    alt={`Item ${index}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    className="absolute top-1 right-1 text-red-900"
                    onClick={() => removeImage(index)}
                    aria-label="Remove"
                  >
                    <IoMdCloseCircle  size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </main>
    </div>
  );
};
