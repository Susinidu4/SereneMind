import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GlobalStyle from "../../assets/Prototype/GlobalStyle";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { IoPersonCircle } from "react-icons/io5";
import { FaCircleArrowRight, FaCircleArrowLeft } from "react-icons/fa6";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export const OnlineResource = () => {
  const [resources, setResources] = useState([]);
  const [ratings, setRatings] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/resource_management/getAllResources"
        );
        setResources(response.data);
        fetchRatings(response.data);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };
    fetchResources();
  }, []);

  const fetchRatings = async (resources) => {
    try {
      const ratingsData = {};
      await Promise.all(
        resources.map(async (resource) => {
          const response = await axios.get(
            `http://localhost:5000/api/resource_management/ratings/${resource._id}`
          );
          ratingsData[resource._id] = response.data.averageRating;
        })
      );
      setRatings(ratingsData);
    } catch (error) {
      console.error("Error fetching ratings:", error);
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

  const filteredResources = resources.filter((resource) =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.auther_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedResources = filteredResources.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF7]">
      <Header />
      <main className="flex-grow mx-20">
        <div className={GlobalStyle.fontNunito}>
          <h1 className={`${GlobalStyle.headingLarge} pb-10`}>Online Resources</h1>
          <div className="flex justify-content-right pb-10">
            <div className="flex items-center border-1 border-[#007579] hover:border-2 px-4 py-2 rounded-lg shadow-md w-70 h-10">
              <input
                type="text"
                placeholder="Search"
                className="text-[#007579] outline-none text-sm placeholder-[#007579]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-center">

            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-20 gap-y-20">
                {displayedResources.map((resource) => (
                  <div
                    key={resource._id}
                    className="bg-[#C0D5D5] border-none p-10 rounded-[25px] shadow w-[600px] h-[380px] flex flex-col justify-between"
                  >
                    <div>
                      <Link to={`/ResourceManagement/ReadResource/${resource._id}`}>
                        <h3 className={`${GlobalStyle.headingMedium} underline hover:text-gray-500`}>
                          Title: {resource.title}
                        </h3>
                      </Link>
                      <p className={`${GlobalStyle.paragraph} p-5`}>{resource.description}</p>
                    </div>
                    <div className="flex items-center justify-between pt-5">
                      <div className="flex items-center space-x-2">
                        <IoPersonCircle className="w-10 h-10 text-gray-600" />
                        <div className="text-sm">
                          <p className="font-bold">{resource.auther_name}</p>
                          <p className="text-gray-500">{resource.auther_designation}</p>
                        </div>
                      </div>
                      {renderStars(ratings[resource._id] || 0)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-10 gap-10">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                  <FaCircleArrowLeft className="w-8 h-10" />
                </button>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
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
