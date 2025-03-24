import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import GlobalStyle from "../../assets/Prototype/GlobalStyle";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2"; 

export const EditJournal = ({ journal, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(journal || {});

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle checkbox change for emotions
  const handleEmotionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        emotion: [...formData.emotion, value], // Add emotion
      });
    } else {
      setFormData({
        ...formData,
        emotion: formData.emotion.filter((emotion) => emotion !== value), // Remove emotion
      });
    }
  };

  // Handle removing an emotion
  const handleRemoveEmotion = (emotionToRemove) => {
    setFormData({
      ...formData,
      emotion: formData.emotion.filter(
        (emotion) => emotion !== emotionToRemove
      ),
    });
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/mood_journaling/update/${journal._id}`,
        formData
      );
      if (response.status === 200) {
        // Show success alert
        Swal.fire({
          title: "Success!",
          text: "Journal updated successfully.",
          icon: "success",
          confirmButtonColor: "#005457",
          confirmButtonText: "OK",
        }).then(() => {
          // Close the modal and reset editing state
          setIsEditing(false);
          onClose();
        });
      } else {
        // Show error alert if the response status is not 200
        Swal.fire({
          title: "Error!",
          text: "Failed to update journal.",
          icon: "error",
          confirmButtonColor: "#005457",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      // Show error alert for exceptions
    Swal.fire({
      title: "Error!",
      text: "An error occurred while updating the journal.",
      icon: "error",
      confirmButtonColor: "#005457",
      confirmButtonText: "OK",
    });
    }
  };

  if (!journal) return null;

  // List of all available emotions
  const emotionsList = [
    "Joyful",
    "Excited",
    "Relaxed",
    "Grateful",
    "Frustrated",
    "Lonely",
    "Confused",
    "Irritated",
    "Confident",
    "Overwhelmed",
    "Nervous",
    "Guilty",
    "Helpless",
    "Hopeful",
    "Motivated",
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg backdrop-blur-sm z-50">
      <div className="bg-[#E9F1F1] rounded-lg shadow-lg w-[90%] sm:w-[800px] p-10 relative border-1 border-[#005457]">
        {!isEditing && (
          <div>
            <button
              className="absolute top-3 left-3 rounded-full text-[#007579] hover:text-[#005457] hover:bg-[#AEDBD8] text-2xl p-3"
              onClick={handleEditClick}
            >
              <FaEdit title="Edit" />
            </button>
          </div>
        )}

        <button
          className="absolute top-3 right-3 text-red-900"
          onClick={onClose}
          title="Close"
          aria-label="Close"
        >
          <IoMdCloseCircle size={30} />
        </button>

        {/* Scrollable Content */}
        <div className="max-h-[80vh] overflow-y-auto">
          {isEditing ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
              <div>
                <label className="block text-lg font-semibold">
                  Overall Mood:
                </label>
                <input
                  type="text"
                  name="Overall_mood"
                  value={formData.Overall_mood}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold">
                  Mood Intensity:
                </label>
                <input
                  type="number"
                  name="mood_intensity"
                  value={formData.mood_intensity}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-lg font-semibold">Emotions:</label>

                {/* Display selected emotions as tags with remove buttons */}
                <div className="w-full border rounded p-2 mb-2">
                  {formData.emotion.length > 0 ? (
                    formData.emotion.map((emotion) => (
                      <span
                        key={emotion}
                        className="inline-flex items-center bg-gray-200 rounded px-2 py-1 mr-2 mb-2"
                      >
                        {emotion}
                        <button
                          onClick={() => handleRemoveEmotion(emotion)}
                          className="ml-2 text-red-500 hover:text-red-700 "
                        >
                          ×
                        </button>
                      </span>
                    ))
                  ) : (
                    <span>No emotions selected</span>
                  )}
                </div>

                {/* Checkboxes for selecting emotions */}
                <div className="w-full border rounded p-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {emotionsList.map((emotion) => (
                      <label key={emotion} className="block text-[10px]">
                        <input
                          type="checkbox"
                          value={emotion}
                          checked={formData.emotion.includes(emotion)}
                          onChange={handleEmotionChange}
                          className="mr-2"
                        />
                        {emotion}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-lg font-semibold">
                  Mood Trigger:
                </label>
                <textarea
                  name="mood_trigger"
                  value={formData.mood_trigger}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold">
                  Cope Mood:
                </label>
                <textarea
                  name="cope_mood"
                  value={formData.cope_mood}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold">Notes:</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-lg font-semibold">
                  Reflections:
                </label>
                <textarea
                  name="reflection"
                  value={formData.reflection}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
              </div>

              <div className="flex col-span-2 justify-end mt-4">
                <button
                  className={`${GlobalStyle.buttonPrimary} px-2 py-1 text-sm ml-auto`}
                  onClick={handleSaveClick}
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                <div>
                  <p className="text-lg font-semibold">
                    Date: {new Date(journal.updatedAt).toLocaleDateString()}
                  </p>
                  <p className="text-lg font-semibold">
                    Time: {new Date(journal.updatedAt).toLocaleTimeString()}
                  </p>
                  <div className="p-4 bg-[#AEDBD8] rounded-lg shadow-md mt-5">
                    <p className="text-lg font-semibold">
                      Overall Mood: {journal.Overall_mood}
                    </p>
                    <p className="text-lg font-semibold">
                      Mood Intensity: {journal.mood_intensity}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-[#AEDBD8] rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold">
                    What Emotions You Felt:
                  </h3>
                  <ul className="list-disc ml-5 mt-2">
                    {journal.emotion.map((emotion, index) => (
                      <li key={index}>{emotion}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 bg-[#AEDBD8] p-4 rounded-lg shadow-md">
                <h3 className="font-semibold">What Triggered This Mood:</h3>
                <p>{journal.mood_trigger}</p>
              </div>

              <div className="mt-4 bg-[#AEDBD8] p-4 rounded-lg shadow-md">
                <h3 className="font-semibold">
                  What You Coped With This Mood:
                </h3>
                <p>{journal.cope_mood}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 ">
                <div className="p-4 bg-[#AEDBD8] rounded-lg shadow-md">
                  <h3 className="font-semibold">Notes:</h3>
                  <ul className="list-disc ml-5">
                    <li>{journal.notes}</li>
                  </ul>
                </div>
                <div className="p-4 bg-[#AEDBD8] rounded-lg shadow-md">
                  <h3 className="font-semibold">Reflections:</h3>
                  <ul className="list-disc ml-5">
                    <li>{journal.reflection}</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
