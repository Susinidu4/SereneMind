import React, { useState } from "react";
import GlobalStyle from "../../assets/Prototype/GlobalStyle";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { IoPersonCircle } from "react-icons/io5";
import banner1 from "../../assets/Images/banner1.png";
import { FaStar } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import Swal from "sweetalert2";

export const ReadResource = () => {
  const [rating, setRating] = useState(0); // State to store the selected rating
  const [submitted, setSubmitted] = useState(false); // State to track if rating is submitted

  // Function to handle rating submission
  const handleSubmit = () => {
    if (rating === 0) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Please select a rating before submitting.",
        confirmButtonColor: "#d33",
      });
      return;
    }
  
    setSubmitted(true); // Mark as submitted
  
    // Corrected to use backticks for template literals
    Swal.fire({
      icon: "success", // Changed to 'success' since the submission is successful
      title: "Article Rating Submitted",
      text: `Thank you for your feedback! You rated this article ${rating} stars.`,
      confirmButtonColor: "#007579", // Custom confirm button color
    });
  };
  

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
                      <p className="font-bold">Sahan Perera</p>
                      <p className="text-gray-500">Psychoanalyst</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="h-6 w-6 text-[#FFD700]" // Use the star icon
                      aria-label={`Rate ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h2 className={`${GlobalStyle.headingMedium} underline pt-8`}>
                Title - Lorem ipsum dolor
              </h2>
              <p className={`${GlobalStyle.paragraph} text-justify px-5`}>
                {/* <span className={`${GlobalStyle.remarkTopic} inline`}>
                  Description -
                </span> */}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                commodo ligula eget dolor. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Aenean commodo ligula eget dolor.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                commodo ligula eget dolor.Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Aenean commodo ligula eget dolor.
              </p>
            </div>

            {/* Banner */}
            <div>
              <img
                src={banner1}
                alt="Resource Image"
                className="mx-auto mt-10"
              ></img>
            </div>

            {/* Article Body */}
            <div className="mt-6 text-justify">
              <p className={GlobalStyle.paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                natoque penatibus et magnis dis parturient montes, nascetur
                ridiculus mus. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus.Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus.Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus.Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit.
              </p>
            </div>

            {/* References and Footer Actions */}
            <div className={GlobalStyle.headingSmall}>
              <p>
                <span className={`${GlobalStyle.remarkTopic} inline`}>
                  References -
                </span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                commodo ligula eget dolor. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Aenean commodo ligula eget dolor.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                commodo ligula eget dolor. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Aenean commodo ligula eget dolor.
              </p>

              {/* download button */}
              <div className="flex gap-4 justify-end pt-8">
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
                  onClick={() => setRating(star)}
                  aria-label={`Rate ${star} stars`}
                >
                  <FaStar className="h-6 w-6" />
                </button>
              ))}
            </div>

            {/* Beautiful Submit Button */}
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
