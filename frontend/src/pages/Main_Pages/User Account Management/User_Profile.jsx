import React, { useState, useEffect } from "react";
import GlobalStyle from "../../../assets/Prototype/GlobalStyle";
import { Footer } from "../../../components/Footer";
import { IoPersonCircle } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { PiDotsThreeCircleFill } from "react-icons/pi";
import axios from "axios";
import { Mood_History_Calendar } from "../Mood Tracking/Mood_History_Calendar";
import { Header_2 } from "../../../components/Header_2";
import Swal from "sweetalert2";
import { EditJournal } from "../../Mood_Journaling/EditJournal";

export const User_Profile = () => {
  const user_data = JSON.parse(localStorage.getItem("userData"));
  const user_id = "UID-6599";
  const [activeTab, setActiveTab] = useState("Mood History");
  const [journalHistory, setJournalHistory] = useState([]);
  const [deleteStatus, setDeleteStatus] = useState("");
  const [user, setUser] = useState("");  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJournal, setSelectedJournal] = useState(null);

  //fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/${user_data.id}`
        );
        if (response.status === 200) {
          setUser(response.data);
          console.log("User data:", response.data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [user_data.id]);

  useEffect(() => {
    // Fetch journal history on component mount
    const fetchJournalHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/mood_journaling/mood-journal/${user_id}`
        );
        if (response.status === 200) {
          setJournalHistory(response.data.data);
        } else {
          console.error("Failed to fetch journal history");
        }
      } catch (error) {
        console.error("Error fetching journal history:", error);
      }
    };

    fetchJournalHistory();
  }, [user_id]);

  useEffect(() => {
    const fetchJournalHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/mood_journaling/mood-journal/${user_id}`
        );
        if (response.status === 200) {
          setJournalHistory(response.data.data);
        } else {
          console.error("Failed to fetch journal history");
        }
      } catch (error) {
        console.error("Error fetching journal history:", error);
      }
    };

    fetchJournalHistory();
  }, [user_id]);
  
  // Handle delete
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://localhost:5000/api/mood_journaling/remove/mood-journal/${id}`
          );
          if (response.status === 200) {
            setJournalHistory((prev) => prev.filter((item) => item._id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "Your record has been deleted.",
              icon: "success",
              confirmButtonColor: "#45553D",
            });
          } else {
            Swal.fire({
              title: "Failed!",
              text: "Failed to delete record.",
              icon: "error",
              confirmButtonColor: "#d33",
            });
          }
        } catch (error) {
          console.error("Error deleting record:", error);
          Swal.fire({
            title: "Error!",
            text: "An error occurred while deleting the record.",
            icon: "error",
            confirmButtonColor: "#d33",
          });
        }
      }
    });
  };

  // Handle open modal
  const handleOpenModal = (journal) => {
    setSelectedJournal(journal); // Store clicked journal entry data
    setIsModalOpen(true);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJournal(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF7]">
      <Header_2 />

      <main className="flex-grow mx-20">
        <div className={GlobalStyle.fontNunito}>
          <h1 className={GlobalStyle.headingLarge}>User Profile</h1>

          <div className="mt-20 flex items-center justify-center space-x-4">
            <IoPersonCircle className="w-60 h-60 text-gray-600" />
          </div>

          <div className="flex flex-col items-center justify-center ">
            <h3
              className={`${GlobalStyle.headingLarge} mt-10`}
              style={{ fontSize: "30px" }}
            >
              {user?.name}
            </h3>
            <h3 className={`${GlobalStyle.headingMedium} mt-5`}>
              {user?.email}
            </h3>
            <h3 className={`${GlobalStyle.headingMedium} mt-5`}>{user?.dob}</h3>
          </div>

          <div className="flex items-center justify-center mt-20">
            <div className="w-3/4 bg-[#A4CDA7] rounded-lg shadow-lg p-4">
              {/* Tabs */}
              <div className="flex">
                <button
                  onClick={() => setActiveTab("Mood History")}
                  className={`w-50 h-15 text-center py-2 font-semibold rounded-tl-lg ${
                    activeTab === "Mood History"
                      ? "bg-green-50 text-black "
                      : "bg-green-100 text-gray-500"
                  }`}
                >
                  Mood History
                </button>
                <button
                  onClick={() => setActiveTab("Journal History")}
                  className={`w-50 text-center py-2 font-semibold rounded-tr-lg ${
                    activeTab === "Journal History"
                      ? "bg-green-50 text-black"
                      : "bg-green-100 text-gray-500"
                  }`}
                >
                  Journal History
                </button>
              </div>

              {/* Content */}
              <div className="bg-green-50 p-4 rounded-b-lg overflow-y-auto h-140">
                {activeTab === "Mood History" ? (
                  // Mood History Content
                  <Mood_History_Calendar />
                ) : (
                  // Journal History Content
                  journalHistory.map((item) => (
                    <div
                      key={item._id} // Assuming `_id` is unique for each journal entry
                      className="flex items-center justify-between bg-green-100 p-5 rounded-lg mb-4 shadow h-15"
                    >
                      {/* Display specific properties of the journal entry */}
                      <div>
                        <p className="text-sm text-gray-600">
                          {new Date(item.createdAt).toLocaleString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="text-gray-600 hover:text-gray-800"
                          onClick={() => handleDelete(item._id)}
                          title="Delete"
                        >
                          <MdDelete size={20} />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-800"
                          title="More"
                          onClick={() => handleOpenModal(item)} 
                        >
                          <PiDotsThreeCircleFill size={20} />
                        </button>

                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Modal for EditJournal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[800px] relative">
            <EditJournal data={selectedJournal} onClose={handleCloseModal} />
          </div>
        </div>
      )}

    </div>
  );
};
