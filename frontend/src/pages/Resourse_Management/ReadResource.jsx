import React, { useState } from "react";
import GlobalStyle from "../../assets/Prototype/GlobalStyle";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { IoPersonCircle } from "react-icons/io5";
import banner1 from "../../assets/Images/banner1.png";
import { FaStar } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

export const ReadResource = () => {
  const [rating, setRating] = useState(0); // State to store the selected rating
  const [submitted, setSubmitted] = useState(false); // State to track if rating is submitted

  // Function to handle rating submission
  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating before submitting.");
      return;
    }
    setSubmitted(true); // Mark as submitted
    alert(
      `Thank you for your feedback! You rated this article ${rating} stars.`
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF7]">
      <Header />

      <main className="flex-grow mx-20">
        <div className={GlobalStyle.fontNunito}>
          <div className={`${GlobalStyle.pageContainer} p-20`}>
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
                <h2 className={`${GlobalStyle.remarkTopic} underline pt-8`}>
                  Title - Lorem ipsum dolor
                </h2>
                <p className={`${GlobalStyle.headingSmall} text-justify px-5`}>
                  <span className={`${GlobalStyle.remarkTopic} inline`}>
                    Description -
                  </span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean commodo ligula eget dolor. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Aenean commodo ligula eget dolor.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Aenean commodo ligula eget dolor.
                </p>
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
              <p className={GlobalStyle.headingSmall}>
                <span className={`${GlobalStyle.remarkTopic} inline`}>
                  Description -
                </span>
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
            <div className="mt-8 border-t border-[#636363] pt-4">
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

              {/* Rate the article */}
              <div className="border p-4 rounded-lg shadow-md w-80 ">
                <div className="flex justify-between items-center">
                  <p className={GlobalStyle.remarkTopic}>Rate The Article</p>

                  <span
                    onClick={handleSubmit}
                    className="text-black-600 text-xl"
                  >
                    <FaCheck className="cursor-pointer text-green-600 hover:text-green-800" />
                  </span>
                </div>
                <div className="flex justify-center items-center mt-4 space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`h-8 w-8 text-xl ${
                        star <= rating ? "text-yellow-500" : "text-black-400"
                      }`}
                      onClick={() => setRating(star)}
                      aria-label={`Rate ${star} stars`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
