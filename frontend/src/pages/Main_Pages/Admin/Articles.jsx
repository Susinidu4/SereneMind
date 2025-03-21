import { useState, useEffect, useRef } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";

export const Articles = () => {
  const initialCount = 6; // Number of items to show initially
  const loadMoreCount = 3; // Number of items to load on scroll
  const totalItems = 20; // Total items available (adjust as needed)

  const [visibleItems, setVisibleItems] = useState(initialCount);
  const observerRef = useRef(null);

  const data = Array(totalItems).fill({
    title: "Lorem ipsum dolor",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  });

  // Infinite Scrolling with Intersection Observer
  useEffect(() => {
    if (visibleItems >= totalItems) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleItems((prev) => Math.min(prev + loadMoreCount, totalItems));
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current && document.getElementById("load-more")) {
      observerRef.current.observe(document.getElementById("load-more"));
    }

    return () => observerRef.current?.disconnect();
  }, [visibleItems]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Scrollable Content Area */}
      <div className="w-full p-6 overflow-y-auto h-[80vh]">
        {data.slice(0, visibleItems).map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-4 mb-4 w-full"
          >
            <h2 className="font-bold text-lg mb-2">Title - {item.title}</h2>
            <p className="text-gray-700 text-sm mb-4">{item.description}</p>
            <div className="flex justify-end space-x-4">
              <button className="text-black-600 hover:text-gray-600 text-2xl">
                <MdModeEdit className="text-[25px]" />
              </button>
              <button className="text-black-900 hover:text-red-600 text-2xl">
                <MdDelete className="text-[25px]" />
              </button>
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
