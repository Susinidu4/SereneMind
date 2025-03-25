import React, { useState, useEffect } from "react";
import GlobalStyle from "../../assets/Prototype/GlobalStyle";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { IoPersonCircle } from "react-icons/io5";
import banner1 from "../../assets/Images/banner1.png";
import { MdDownload } from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export const ReadResource = () => {
  const { id } = useParams(); // Get resource ID from the URL
  const [resource, setResource] = useState(null); // Store the fetched resource
  const [rating, setRating] = useState(0); // State to store the selected rating
  const [submitted, setSubmitted] = useState(false); // State to track if rating is submitted
  const [averageRating, setAverageRating] = useState(0);

  // Temporary hardcoded userId (Replace this with your dynamic user ID, e.g., from authentication context)
  const [userId, setUserId] = useState("user123"); // Example of hardcoded user ID

useEffect(() => {
  const fetchAverageRating = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/resource_management/ratings/${id}`
      );
      setAverageRating(response.data.averageRating || 0);
    } catch (error) {
      console.error("Error fetching average rating:", error);
    }
  };
  fetchAverageRating();
}, [id]);

  // Fetch resource data when the component mounts
  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/resource_management/getResource/${id}`
        );
        setResource(response.data); // Store resource data in state
        fetchRatings(response.data);
      } catch (error) {
        console.error("Error fetching resource:", error);
      }
    };
    fetchResource();
    
  }, [id]); // Dependency array ensures the effect runs when `id` changes

  // Function to handle rating submission
  const handleSubmit = async () => {
    if (rating === 0) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Please select a rating before submitting.",
        confirmButtonColor: "#d33",
      });
      return; // Exit the function if no rating is selected
    }

    try {
      // Send feedback data to the backend
      const response = await axios.post(
        "http://localhost:5000/api/resource_management/add-feedback",
        {
          user_id: userId, // Send the userId
          resourse_id: id, // Send the resource ID
          ratings: rating, // Send the rating value
        }
      );

      // Show success message after submission
      Swal.fire({
        icon: "success",
        title: "Article Rating Submitted",
        text: `Thank you for your feedback! You rated this article ${rating} stars.`,
        confirmButtonColor: "#007579",
      });
      setRating(0);
      setSubmitted(true); // Mark as submitted
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "There was an error submitting your feedback.",
        confirmButtonColor: "#d33",
      });
    }
  };
  
    const renderStars = (rating) => {
      const fullStars = Math.floor(rating);
      const halfStar = rating % 1 !== 0;
      const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
      return (
        <div className="flex text-yellow-500">
          {[...Array(fullStars)].map((_, index) => (
            <FaStar key={index} />
          ))}
          {halfStar && <FaStarHalfAlt />}
          {[...Array(emptyStars)].map((_, index) => (
            <FaRegStar key={index} />
          ))}
        </div>
      );
    };

  // Show loading state while fetching resource data
  if (!resource) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF7]">
      <Header />

      <main className="flex-grow mx-20">
        <div className={GlobalStyle.fontNunito}>
          <div className={`${GlobalStyle.pageContainer} px-20 pt-15 mx-auto`}>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div>
                      <IoPersonCircle className="w-20 h-20 text-gray-600" />
                    </div>
                    <div className="text-sm text-[18px]">
                      <p className="font-bold">{resource.auther_name}</p>
                      <p className="text-gray-500">
                        {resource.auther_designation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating Placeholder */}
              <div className="flex space-x-1 text-xl">
              {renderStars(averageRating)}
              </div>
            </div>

            <div>
              <h2 className={`${GlobalStyle.headingMedium} underline pt-8`}>
                {resource.title}
              </h2>
              <p className={`${GlobalStyle.paragraph} text-justify px-5`}>
                {resource.description}
              </p>
            </div>

            {/* Banner */}
            <div>
              <img
                src={banner1}
                alt="Resource Image"
                className="mx-auto mt-10"
              />
            </div>

            {/* Article Body */}
            <div className="mt-6 text-justify">
              <p className={GlobalStyle.paragraph}>{resource.content}</p>
            </div>

            {/* References and Footer Actions */}
            <div className={GlobalStyle.headingSmall}>
              <p>
                <span className={`${GlobalStyle.remarkTopic} inline`}>
                  References -
                </span>{" "}
                {resource.reference}
              </p>

              {/* Download button */}
              <div className="flex gap-4 justify-end pt-8 pb-6">
                <button
                  className={`${GlobalStyle.buttonPrimary} flex items-center gap-2`}
                >
                  <MdDownload size={20} />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>

          {/* Rate the article */}
          <div className="border p-6 rounded-lg shadow-lg w-100 mx-auto mt-10 bg-white">
            <div className="flex justify-between items-center">
              <p
                className={`text-[20px] font-semibold ${GlobalStyle.headingSmall}`}
              >
                Rate The Article
              </p>
            </div>

            {/* Star Rating */}
            <div className="flex justify-center items-center mt-4 space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`h-10 w-10 text-xl transition-colors duration-300 ${
                    star <= rating
                      ? "text-yellow-500 scale-110"
                      : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)} // Set rating value on click
                  aria-label={`Rate ${star} stars`}
                >
                  <FaStar className="h-6 w-6" />
                </button>
              ))}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-t from-[#007579] to-[#00B4A6] text-white px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
              >
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
