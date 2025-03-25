import React, { useState } from "react";
import axios from "axios"; // Don't forget to import axios
import Swal from "sweetalert2"; // Import Swal for alert
import GlobalStyle from "../../../assets/Prototype/GlobalStyle";
import { FaUpload } from "react-icons/fa";

export const AddNew = () => {
  // State to handle form data
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  // const [selectedImages, setSelectedImages] = useState([]);
  const [auther_name, setAuthorName] = useState("");
  const [auther_designation, setAuthorDesignation] = useState("");
  const [reference, setReference] = useState("");

  const admin_id = "AID-2425";

  // const handleImageChange = (e) => {
  //   if (e.target.files) {
  //     const newImages = Array.from(e.target.files);
  //     setSelectedImages([...selectedImages, ...newImages]);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      admin_id: admin_id,
      title: title,
      description: description,
      content: content,
      // image: selectedImages.map((image) => URL.createObjectURL(image)),
      reference: reference,
      auther_name: auther_name,
      auther_designation: auther_designation,
    };

    console.log("Form data:", formData);

    try {
      // Submit form data to the backend
      const response = await axios.post(
        "http://localhost:5000/api/resource_management/addResource", // Correct backend URL
        formData
      );
      console.log("Response:", response);
      Swal.fire({
        icon: "success",
        title: "Mood Journal Entry Added!",
        text: "Your mood journal has been successfully recorded.",
        confirmButtonColor: "#45553D",
      });

      setTitle("");
      setDescription("");
      setContent("");
      // setSelectedImages([]);
      setAuthorName("");
      setAuthorDesignation("");
      setReference("");
      
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Failed to submit mood journal entry. Please try again.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div>
      <main className="flex items-center justify-center min-h-screen">
        <div className="rounded-lg p-8 w-full max-w-3xl">
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-6">
              <h1 className={GlobalStyle.remarkTopic}>Title :</h1>
              <input
                type="text"
                placeholder="Text here"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`${GlobalStyle.inputText} w-full`}
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className={GlobalStyle.remarkTopic}>Description :</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`${GlobalStyle.remark} w-full`}
                rows="5"
              ></textarea>
            </div>

            {/* Content */}
            <div className="mb-6">
              <label className={GlobalStyle.remarkTopic}>Content :</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={`${GlobalStyle.remark} w-full`}
                rows="10"
              ></textarea>
            </div>

            {/* Image upload
            <div className="mb-6">
              <label className={GlobalStyle.remarkTopic}>Snaps</label>
              <div className="w-full">
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
                        : "Select files"}
                    </div>
                    <div className="flex items-center justify-center bg-gray-100 h-full border-l border-gray-300 px-5">
                      <FaUpload className="text-gray-600" />
                    </div>
                  </div>
                </label>
              </div>
            </div> */}

            {/* Author Name */}
            <div className="mb-6">
              <h1 className={GlobalStyle.remarkTopic}>Author Name :</h1>
              <input
                type="text"
                placeholder="Text here"
                value={auther_name}
                onChange={(e) => setAuthorName(e.target.value)}
                className={`${GlobalStyle.inputText} w-full`}
              />
            </div>

            {/* Author Designation */}
            <div className="mb-6">
              <h1 className={GlobalStyle.remarkTopic}>Author Designation :</h1>
              <input
                type="text"
                placeholder="Text here"
                value={auther_designation}
                onChange={(e) => setAuthorDesignation(e.target.value)}
                className={`${GlobalStyle.inputText} w-full`}
              />
            </div>

            {/* References */}
            <div className="mb-6">
              <label className={GlobalStyle.remarkTopic}>References :</label>
              <textarea
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className={`${GlobalStyle.remark} w-full`}
                rows="5"
              ></textarea>
            </div>

            {/* Submit button */}
            <div className="flex justify-end">
              <button type="submit" className={GlobalStyle.buttonPrimary}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
