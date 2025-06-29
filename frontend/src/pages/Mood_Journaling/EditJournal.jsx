import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import GlobalStyle from "../../assets/Prototype/GlobalStyle";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

export const EditJournal = ({ journal, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(journal || {});
  const [errorMessage, setErrorMessage] = useState("");
  const [images, setImages] = useState(journal?.image || []);
  const [newImages, setNewImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Update the handleImageRemove function
  const handleImageRemove = (index) => {
    // First check if the image exists in newImages
    if (index >= images.length) {
      // It's a new image
      setNewImages((prev) =>
        prev.filter((_, i) => i !== index - images.length)
      );
    } else {
      // It's an existing image
      setImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewImages([...newImages, ...files]);
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
    setIsUploading(true);
    try {
      let updatedImages = [...images];

      // Upload new images if any
      if (newImages.length > 0) {
        const uploadFormData = new FormData();
        newImages.forEach((image) => {
          uploadFormData.append("images", image);
        });

        const uploadResponse = await axios.post(
          "http://localhost:5000/api/mood_journaling/upload",
          uploadFormData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        updatedImages = [...updatedImages, ...uploadResponse.data.images];
      }

      // Prepare the final data to send
      const dataToSend = {
        ...formData,
        image: updatedImages,
      };

      const response = await axios.put(
        `http://localhost:5000/api/mood_journaling/update/${journal._id}`,
        dataToSend
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Journal updated successfully.",
          icon: "success",
          confirmButtonColor: "#005457",
          confirmButtonText: "OK",
        }).then(() => {
          setIsEditing(false);
          onClose();
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to update journal.",
          icon: "error",
          confirmButtonColor: "#005457",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error updating journal:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while updating the journal.",
        icon: "error",
        confirmButtonColor: "#005457",
        confirmButtonText: "OK",
      });
    } finally {
      setIsUploading(false);
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
              <div className="col-span-2">
                <div>
                  <label className="block text-lg font-semibold">
                    Overall Mood:
                  </label>

                  {/* Display selected mood separately */}
                  <div className="w-full border rounded p-2 mb-2">
                    <p className="text-md font-semibold">
                      {formData.Overall_mood || "None"}
                    </p>
                  </div>

                  {/* Radio buttons for mood selection */}
                  <div className="w-full border rounded p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {[
                      "Very Happy",
                      "Happy",
                      "Neutral",
                      "Sad",
                      "Very Sad",
                      "Stressed",
                      "Angry",
                      "Anxious",
                      "Tired",
                    ].map((mood) => (
                      <label key={mood} className="block text-[14px]">
                        <input
                          type="radio"
                          name="Overall_mood"
                          value={mood}
                          checked={formData.Overall_mood === mood}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        {mood}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-span-2">
                <div>
                  <label className="block text-lg font-semibold">
                    Mood Intensity:
                  </label>
                  <input
                    type="number"
                    name="mood_intensity"
                    value={formData.mood_intensity}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (value >= 1 && value <= 10) {
                        handleChange(e);
                        setErrorMessage("");
                      } else {
                        setErrorMessage(
                          "Mood intensity must be between 1 and 10"
                        );
                      }
                    }}
                    className="w-full border rounded p-2"
                    min="1"
                    max="10"
                  />
                  {errorMessage && (
                    <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
                  )}
                </div>
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

              <div className="col-span-2">
                <label className="block text-lg font-semibold">Images:</label>
                <div className="w-full border rounded p-2 mb-2">
                  {images.length > 0 ? (
                    images.map((img, index) => (
                      <div key={index} className="relative mb-4">
                        <img
                          src={
                            typeof img === "object"
                              ? URL.createObjectURL(img)
                              : `http://localhost:5000/uploads/${img}`
                          }
                          alt={`Journal Entry ${index + 1}`}
                          className="w-full h-auto rounded-lg max-h-40 object-contain"
                        />
                        <button
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                          onClick={() => handleImageRemove(index)}
                        >
                          ×
                        </button>
                      </div>
                    ))
                  ) : (
                    <p>No images uploaded.</p>
                  )}
                </div>
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
              {journal.image &&
                journal.image.length > 0 &&
                journal.image[0] && (
                  <div className="mt-4 bg-[#AEDBD8] p-4 rounded-lg shadow-md">
                    <h3 className="font-semibold">Journal Images:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                      {journal.image.map(
                        (img, index) =>
                          img && (
                            <div key={index} className="relative">
                              <img
                                src={
                                  img.startsWith("blob:")
                                    ? img
                                    : `http://localhost:5000/uploads/${img}`
                                }
                                alt={`Journal Entry ${index + 1}`}
                                className="w-full h-auto rounded-lg"
                              />
                            </div>
                          )
                      )}
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
