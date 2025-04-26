import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import GlobalStyle from "../../../assets/Prototype/GlobalStyle";
import { FaUpload, FaTimes } from "react-icons/fa";

export const AddNew = () => {
  // State to handle form data
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [auther_name, setAuthorName] = useState("");
  const [auther_designation, setAuthorDesignation] = useState("");
  const [reference, setReference] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const admin_id = "AID-2425";

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Create FormData object to handle file upload
    const formData = new FormData();
    formData.append("admin_id", admin_id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    formData.append("reference", reference);
    formData.append("auther_name", auther_name);
    formData.append("auther_designation", auther_designation);

    // Append the image if selected
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      // Submit form data to the backend
      const response = await axios.post(
        "http://localhost:5000/api/resource_management/addResource",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response);
      Swal.fire({
        icon: "success",
        title: "Resource Added!",
        text: "Your resource has been successfully saved.",
        confirmButtonColor: "#005457",
      });

      // Reset form
      setTitle("");
      setDescription("");
      setContent("");
      setSelectedImage(null);
      setAuthorName("");
      setAuthorDesignation("");
      setReference("");
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text:
          error.response?.data?.error ||
          "Failed to submit resource. Please try again.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setIsSubmitting(false);
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
                required
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className={GlobalStyle.remarkTopic}>Description :</label>
              <textarea
                value={description}
                onChange={(e) => {
                  // Limit to 250 characters
                  if (e.target.value.length <= 250) {
                    setDescription(e.target.value);
                  }
                }}
                className={`${GlobalStyle.remark} w-full`}
                rows="5"
                required
                maxLength={250} // HTML attribute for additional safety
              ></textarea>
              <div className="text-right text-sm text-gray-500 mt-1">
                Character count: {description.length}/250
                {description.length >= 250 && (
                  <span className="text-red-500 ml-2">
                    Maximum character limit reached
                  </span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="mb-6">
              <label className={GlobalStyle.remarkTopic}>Content :</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={`${GlobalStyle.remark} w-full`}
                rows="10"
                required
              ></textarea>
            </div>

            {/* Image upload - Single image only */}
            <div className="mb-6">
              <label className={GlobalStyle.remarkTopic}>Image</label>
              <div className="w-full">
                <label htmlFor="image-upload" className="cursor-pointer w-full">
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <div className="flex items-center rounded-[10px] border-2 border-[#005457] bg-white overflow-hidden h-14">
                    <div className="px-4 flex-grow truncate">
                      {selectedImage
                        ? selectedImage.name
                        : "Select an image file (JPEG, PNG, GIF)"}
                    </div>
                    <div className="flex items-center justify-center bg-gray-100 h-full border-l border-gray-300 px-5">
                      <FaUpload className="text-gray-600" />
                    </div>
                  </div>
                </label>

                {/* Image preview */}
                {selectedImage && (
                  <div className="mt-4 relative w-48 h-48">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Preview"
                      className="w-full h-full object-contain border rounded"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Author Name */}
            <div className="mb-6">
              <h1 className={GlobalStyle.remarkTopic}>Author Name :</h1>
              <input
                type="text"
                placeholder="Text here"
                value={auther_name}
                onChange={(e) => setAuthorName(e.target.value)}
                className={`${GlobalStyle.inputText} w-full`}
                required
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
                required
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
              <button
                type="submit"
                className={GlobalStyle.buttonPrimary}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Uploading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
