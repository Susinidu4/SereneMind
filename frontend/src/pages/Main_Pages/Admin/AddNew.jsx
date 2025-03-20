import React, { useState } from "react";
import GlobalStyle from "../../../assets/Prototype/GlobalStyle";
import { FaUpload } from "react-icons/fa";

export const AddNew = () => {
  // State to handle selected images
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (e) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setSelectedImages([...selectedImages, ...newImages]);
    }
  };

  return (
    <div>
      <main className="flex items-center justify-center min-h-screen">
        <div className="rounded-lg p-8 w-full max-w-3xl">
          <form>
            {/* textbox */}
            <div className="mb-4">
              <h1 className={GlobalStyle.remarkTopic}>Title :</h1>
              <input
                type="text"
                placeholder="Text here"
                className={`${GlobalStyle.inputText} w-full`}
              />
            </div>

            {/* remark box */}
            <div className="mb-6">
              <label className={GlobalStyle.remarkTopic}>Description :</label>
              <textarea
                className={`${GlobalStyle.remark} w-full`}
                rows="5"
              ></textarea>
            </div>

            {/* content */}
            <div className="mb-6">
              <label className={GlobalStyle.remarkTopic}>Content :</label>
              <textarea
                className={`${GlobalStyle.remark} w-full`}
                rows="10"
              ></textarea>
            </div>

            {/* image upload */}
            <div className="mb-6">
              <label className={GlobalStyle.remarkTopic}>Snaps</label>
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
                  <div className="flex items-center rounded-[10px] border border-gray-300 bg-white overflow-hidden h-14">
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
            </div>

            {/* author name */}
            <div className="mb-4">
              <h1>Author Name :</h1>
              <input
                type="text"
                placeholder="Text here"
                className={`${GlobalStyle.remarkTopic} w-full`}
              />
            </div>

            {/* author designation */}
            <div className="mb-4">
              <h1>Author Designation :</h1>
              <input
                type="text"
                placeholder="Text here"
                className={`${GlobalStyle.remarkTopic} w-full`}
              />
            </div>

            {/* references */}
            <div className="mb-6">
              <label className={GlobalStyle.remarkTopic}>References :</label>
              <textarea
                className={`${GlobalStyle.remark} w-full`}
                rows="5"
              ></textarea>
            </div>

            {/* submit button */}
            <div className="flex justify-end">
              <button className={GlobalStyle.buttonPrimary}>Submit</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
