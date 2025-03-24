import { useState, useEffect, useRef } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";

export const Articles = () => {
  const initialCount = 6; // Number of items to show initially
  const loadMoreCount = 3; // Number of items to load on scroll
  const totalItems = 20; // Total items available (adjust as needed)

  const [articles, setArticles] = useState([]); // State to store fetched articles
  const [visibleItems, setVisibleItems] = useState(initialCount);
  const observerRef = useRef(null);

  // Fetch Articles from Backend
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/resource_management/getAllResources"
        );
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  // Infinite Scrolling with Intersection Observer
  useEffect(() => {
    if (visibleItems >= articles.length) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleItems((prev) =>
            Math.min(prev + loadMoreCount, articles.length)
          );
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current && document.getElementById("load-more")) {
      observerRef.current.observe(document.getElementById("load-more"));
    }

    return () => observerRef.current?.disconnect();
  }, [visibleItems, articles]);

  // Handle Delete Article
  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        await axios.delete(
          `http://localhost:5000/api/resource_management/deleteResource/${id}`
        );
        setArticles(articles.filter((article) => article._id !== id));
        Swal.fire("Deleted!", "The article has been removed.", "success");
      } catch (error) {
        console.error("Error deleting article:", error);
        Swal.fire("Error!", "Failed to delete the article.", "error");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Scrollable Content Area */}
      <div className="w-full p-6 overflow-y-auto h-[80vh]">
        {articles.slice(0, visibleItems).map((article, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-4 mb-4 w-full"
          >
            <h2 className="font-bold text-lg mb-2">Title - {article.title}</h2>
            <p className="text-gray-700 text-sm mb-4">{article.description}</p>

            <div className="flex justify-between items-center">
              {/* Date on the Left */}
              <p className="text-gray-600 text-sm">
                {new Date(article.createdAt).toLocaleString()}
              </p>

              {/* Buttons on the Right */}
              <div className="flex space-x-4">
                <button className="text-black-600 hover:text-gray-600 text-2xl">
                  <MdModeEdit className="text-[25px]" />
                </button>
                <button
                  onClick={() => handleDelete(article._id)}
                  className="text-black-900 hover:text-red-600 text-2xl"
                >
                  <MdDelete className="text-[25px]" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {visibleItems < totalItems && (
          <div id="load-more" className="h-10"></div>
        )}
      </div>
    </div>
  );
};
