import React, { useState } from "react";
import GlobalStyle from "../../assets/Prototype/GlobalStyle";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { FaUpload, FaTimes } from "react-icons/fa";
import axios from "axios"; 
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


export const MoodJournalingInsert = () => {
  const user = JSON.parse(localStorage.getItem("userData"));
  const [selectedValue, setSelectedValue] = useState(null);
  const [remark, setRemark] = useState("");
  const [remark2, setRemark2] = useState("");
  const [remark3, setRemark3] = useState("");
  const [remark4, setRemark4] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [overallMood, setOverallMood] = useState("");
  const [emotions, setEmotions] = useState([]);
  const navigate = useNavigate();


  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${String(hours).padStart(2, "0")}:${minutes} ${period}`;
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      if (selectedImages.length + newImages.length > 5) {
        Swal.fire({
          icon: "error",
          title: "Too many images",
          text: "You can upload a maximum of 5 images",
          confirmButtonColor: "#d33",
        });
        return;
      }
      setSelectedImages([...selectedImages, ...newImages]);
    }
  };

  const handleMoodIntensityChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleOverallMoodChange = (event) => {
    setOverallMood(event.target.value);
  };

  const handleEmotionChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setEmotions([...emotions, value]);
    } else {
      setEmotions(emotions.filter((emotion) => emotion !== value));
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    const updatedImages = selectedImages.filter(
      (_, index) => index !== indexToRemove
    );
    setSelectedImages(updatedImages);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create FormData to handle file uploads
    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("Overall_mood", overallMood);
    formData.append("mood_intensity", selectedValue);
    formData.append("emotion", emotions.join(", "));
    formData.append("mood_trigger", remark);
    formData.append("cope_mood", remark2);
    formData.append("notes", remark3);
    formData.append("reflection", remark4);
    
    // Append each image file
    selectedImages.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/mood_journaling/mood-journal-insert", 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      Swal.fire({
        icon: "success",
        title: "Mood Journal Entry Added!",
        text: "Your mood journal has been successfully recorded.",
        confirmButtonColor: "#45553D",
      });

      // Reset form
      setOverallMood(""); 
      setSelectedValue(null); 
      setEmotions([]); 
      setRemark(""); 
      setRemark2(""); 
      setRemark3(""); 
      setRemark4(""); 
      setSelectedImages([]); 

      // Navigate to journal page
    navigate("/MoodJournaling/InstructionPage");

    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.response?.data?.message || "Failed to submit mood journal entry. Please try again.",
        confirmButtonColor: "#d33",
      });
    }
  };

  const emotionsList = [
    "Joyful", "Excited", "Relaxed", "Grateful", "Frustrated",
    "Lonely", "Confused", "Irritated", "Confident", "Overwhelmed",
    "Nervous", "Guilty", "Helpless", "Hopeful", "Motivated",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF7]">
      <Header />

      <main className="flex-grow mx-20">
        <div className={GlobalStyle.fontNunito}>
          <h1 className={`${GlobalStyle.headingLarge} `}>Mood Journaling</h1>

          <div className={`${GlobalStyle.pageContainer} px-25 mt-20 mx-auto`}>
            <form onSubmit={handleSubmit}>
              {/* Date & Time*/}
              <div className="flex justify-end mx-10 mt-6 flex-col items-end">
                <div className="gap-2 flex flex-col">
                  <h1 className={`font-semibold ${GlobalStyle.headingSmall}`}>
                    Date : {getCurrentDate()}
                  </h1>
                  <h1 className={`font-semibold ${GlobalStyle.headingSmall}`}>
                    Time : {getCurrentTime()}
                  </h1>
                </div>
              </div>

              {/* Overall mood */}
              <div>
                <label className={`font-semibold ${GlobalStyle.headingSmall}`}>
                  Overall Mood : How are you feeling right now ?
                </label>
                <label className={`${GlobalStyle.headingSmall} flex flex-col space-y-4 pt-6`}>
                  {[
                    { label: "Very Happy", value: "Very Happy" },
                    { label: "Happy", value: "Happy" },
                    { label: "Neutral", value: "Neutral" },
                    { label: "Sad", value: "Sad" },
                    { label: "Very Sad", value: "Very Sad" },
                    { label: "Stressed", value: "Stressed" },
                    { label: "Angry", value: "Angry" },
                    { label: "Anxious", value: "Anxious" },
                    { label: "Tired", value: "Tired" },
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-2 px-8">
                      <input
                        type="radio"
                        name="overallMood"
                        value={option.value}
                        className="w-4 h-4 accent-[#45553D] focus:ring-0"
                        required
                        checked={overallMood === option.value}
                        onChange={handleOverallMoodChange}
                      />
                      <span>{option.label}</span>
                    </div>
                  ))}
                </label>
              </div>
              <br />

              {/* Mood Intensity */}
              <div>
                <label className={`font-semibold ${GlobalStyle.headingSmall}`}>
                  Mood Intensity : On a scale of 1 (low) to 10 (high), how intense is your mood ?
                </label>
                <div className="flex gap-4 px-8 pt-6">
                  {Array.from({ length: 10 }, (_, index) => index + 1).map(
                    (number) => (
                      <label
                        key={number}
                        className={`cursor-pointer p-3 rounded-md ${
                          selectedValue === String(number)
                            ? "bg-[#45553D] text-white"
                            : "bg-white text-black"
                        }`}
                      >
                        <input
                          type="radio"
                          name="moodIntensity"
                          value={number}
                          onChange={handleMoodIntensityChange}
                          className="hidden"
                        />
                        {number}
                      </label>
                    )
                  )}
                </div>
              </div>
              <br />

              {/* Emotions */}
              <div>
                <label className={`font-semibold ${GlobalStyle.headingSmall}`}>
                  What emotions are you feeling?
                </label>
                <div className={GlobalStyle.headingSmall}>
                  <div className="grid grid-cols-5 gap-6 px-8 pt-6">
                    {emotionsList.map((emotion, index) => (
                      <label key={index} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="emotions"
                          value={emotion}
                          className="h-4 w-4"
                          checked={emotions.includes(emotion)}
                          onChange={handleEmotionChange}
                        />
                        <span className="ml-4">{emotion}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <br />

              {/* Trigger */}
              <div>
                <div className="mb-6">
                  <label className={`font-semibold ${GlobalStyle.headingSmall}`}>
                    What triggered your mood?
                  </label>
                  <div className="px-8 pt-6">
                    <textarea
                      className={`${GlobalStyle.remark} w-full`}
                      value={remark}
                      onChange={(e) => setRemark(e.target.value)}
                      rows="4"
                      required
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Cope */}
              <div>
                <div className="mb-6">
                  <label className={`font-semibold ${GlobalStyle.headingSmall}`}>
                    How did you cope with this mood ?
                  </label>
                  <div className="px-8 pt-6">
                    <textarea
                      className={`${GlobalStyle.remark} w-full`}
                      value={remark2}
                      onChange={(e) => setRemark2(e.target.value)}
                      rows="4"
                      required
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <div className="mb-6">
                  <label className={`font-semibold ${GlobalStyle.headingSmall}`}>Notes</label>
                  <div className="px-8 pt-6">
                    <textarea
                      className={`${GlobalStyle.remark} w-full`}
                      value={remark3}
                      onChange={(e) => setRemark3(e.target.value)}
                      rows="6"
                      required
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Reflection */}
              <div>
                <div className="mb-6">
                  <label className={`font-semibold ${GlobalStyle.headingSmall}`}>Reflection</label>
                  <div className="px-8 pt-6">
                    <textarea
                      className={`${GlobalStyle.remark} w-full`}
                      value={remark4}
                      onChange={(e) => setRemark4(e.target.value)}
                      rows="6"
                      required
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Image upload */}
              <div>
                <div className="mb-6">
                  <label className={`font-semibold ${GlobalStyle.headingSmall}`}>Snaps</label>
                  <div className="w-full px-8 pt-6">
                    <label htmlFor="image-upload" className="cursor-pointer w-full">
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        multiple
                      />
                      <div className="flex items-center rounded-[10px] border-2 border-[#005457] bg-white overflow-hidden h-14">
                        <div className="px-4 flex-grow truncate">
                          {selectedImages.length > 0
                            ? `${selectedImages.length} files selected`
                            : "Select files (max 2)"}
                        </div>
                        <div className="flex items-center justify-center bg-gray-100 h-full border-l border-gray-300 px-5">
                          <FaUpload className="text-gray-600" />
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* Display uploaded images */}
                  <div className="grid grid-cols-5 gap-4 mt-4 px-8">
                    {selectedImages.map((image, index) => (
                      <div
                        key={index}
                        className="relative border border-gray-300 rounded-lg overflow-hidden w-40 h-35"
                      >
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Uploaded ${index + 1}`}
                          className="w-full h-32 object-cover"
                        />
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 text-white p-1 text-xs"
                        >
                          <FaTimes className="text-red-500 w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <div className="flex justify-end gap-4 pt-8 pb-8">
                <button type="submit" className={GlobalStyle.buttonPrimary}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};