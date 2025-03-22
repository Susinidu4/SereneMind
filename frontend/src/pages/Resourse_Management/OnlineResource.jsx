import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import GlobalStyle from "../../assets/Prototype/GlobalStyle";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { IoPersonCircle } from "react-icons/io5";
import { FaCircleArrowRight, FaCircleArrowLeft } from "react-icons/fa6";

export const OnlineResource = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Total number of items (for demonstration, we assume there are 11 items)
  const totalItems = 11;

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Function to handle "Next" button click
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle "Previous" button click
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Calculate the range of items to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF7]">
      <Header />

      <main className="flex-grow mx-20">
        <div className={GlobalStyle.fontNunito}>
          <h1 className={`${GlobalStyle.headingLarge} pb-10`}>
            Online Resources
          </h1>

          <div className="flex items-center justify-center min-h-screen">
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-20 gap-y-20">
                {[...Array(totalItems)]
                  .slice(startIndex, endIndex)
                  .map((_, index) => {
                    const resourceId = startIndex + index + 1; // Unique ID for each resource
                    return (
                      <div
                        key={resourceId}
                        className='bg-[#C0D5D5] border-none p-10 rounded-[25px] shadow w-[600px] h-[380px]'
                      >
                        <Link to={`/ResourceManagement/ReadResource`}> {/* Link to the detailed page */}
                        {/* /${resourceId} */}
                          <h3 className={`${GlobalStyle.headingMedium} underline hover:text-gray-500`}>
                            Title - Lorem ipsum dolor
                          </h3>
                        </Link>
                        <p className={`${GlobalStyle.paragraph} p-5`}>
                          Description - Lorem ipsum dolor sit amet, consectetur
                          adipiscing elit. Aenean commodo ligula eget dolor.
                          Aenean massa.Lorem ipsum dolor sit amet, consectetur
                          adipiscing elit. Aenean commodo ligula eget dolor.
                          Aenean massa.Lorem ipsum dolor sit amet, consectetur
                          adipiscing elit. Aenean commodo ligula eget dolor.
                          Aenean massa.
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div>
                              <IoPersonCircle className="w-10 h-10 text-gray-600" />
                            </div>
                            <div className="text-sm">
                              <p className="font-bold">Sahan Perera</p>
                              <p className="text-gray-500">Psychoanalyst</p>
                            </div>
                          </div>
                          <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-center mt-10 gap-10">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  <FaCircleArrowLeft className="w-8 h-10" />
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  <FaCircleArrowRight className="w-8 h-8" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};