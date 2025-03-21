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

import { Header } from "../../../components/Header";
import { ActivityProgress } from "../../Activity_Tracking/ActivityProgress";



export const User_Profile = () => {
  const user_data = JSON.parse(localStorage.getItem("userData"));
  const user_id = "UID-6599";
  const [activeTab, setActiveTab] = useState("Mood History");
  const [journalHistory, setJournalHistory] = useState([]);
  const [deleteStatus, setDeleteStatus] = useState("");
  const [user, setUser] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedJournalDetail, setSelectedJournalDetail] = useState(null);


  if (!(user_data)) {
    window.location.href = "/";
  }

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

  // Fetch journal history on component mount
  useEffect(() => {
    const fetchJournalHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/mood_journaling/mood-journal/${user_id}`
        );
        if (response.status === 200) {
          setJournalHistory(response.data.data);
          console.log("Journal history:", response.data.data);
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

  // Handle open modal for editing
  const handleOpenModal = (journal) => {
    setSelectedJournal(journal);
    setIsModalOpen(true);
  };

  // Handle close modal for editing
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJournal(null);
  };

  // Handle open detail modal
  const handleOpenDetailModal = (journal) => {
    setSelectedJournalDetail(journal);
    setIsDetailModalOpen(true);
  };

  // Handle close detail modal
  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedJournalDetail(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF7]">
     <Header />

      <main className="flex-grow mx-20">
        <div className={GlobalStyle.fontNunito}>
          <div className="mt-10 flex items-center space-x-6">
            {/* Use flex to align items horizontally */}
            <IoPersonCircle
              className="text-gray-600"
              style={{ width: "200px", height: "200px" }}
            />
          </div>
          <table className="border-none">
            <tbody>
              <tr>
                <td
                  className={`${GlobalStyle.headingLarge} w-50`}
                  style={{ fontSize: "25px" }}
                >
                  UserName
                </td>
                <td className={`${GlobalStyle.headingMedium} pl-2`}>
                  : {user?.name}
                </td>
              </tr>
              <tr>
                <td
                  className={`${GlobalStyle.headingLarge} w-50`}
                  style={{ fontSize: "25px" }}
                >
                  Email
                </td>
                <td className={`${GlobalStyle.headingMedium} pl-2`}>
                  : {user?.email}
                </td>
              </tr>
              <tr>
                <td
                  className={`${GlobalStyle.headingLarge} w-50`}
                  style={{ fontSize: "25px" }}
                >
                  Date of Birth
                </td>
                <td className={`${GlobalStyle.headingMedium} pl-2`}>
                  : {user?.dob}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex items-center justify-center mt-20">
            <div
              className={`${GlobalStyle.pageContainer} border-none w-2000 p-4`}
            >
              {/* Tabs */}
              <div className="flex ">
                <button
                  onClick={() => setActiveTab("Mood History")}
                  className={`flex-grow text-center py-2 font-semibold rounded-tl-lg ${
                    activeTab === "Mood History"
                      ? " text-black border-b-4 border-[#005457] "
                      : " text-gray-500"
                  }`}
                >
                  Mood History
                </button>
                <button
                  onClick={() => setActiveTab("Journal History")}

                  className={`flex-grow text-center py-2 font-semibold rounded-tr-lg ${

                    activeTab === "Journal History"
                      ? "text-black border-b-4 border-[#005457]"
                      : "text-gray-500"
                  }`}
                >
                  Journal History
                </button>
                <button
                  onClick={() => setActiveTab("Activity Progress")}
                  className={`w-50 text-center py-2 font-semibold rounded-tr-lg ${
                    activeTab === "Activity Progress"
                      ? "bg-green-50 text-black"
                      : "bg-green-100 text-gray-500"
                  }`}
                >
                  Activity Progress
                </button>
              </div>

              {/* Content */}
              <div className=" p-4 rounded-b-lg overflow-y-auto h-140">
                {activeTab === "Mood History" ? (
                  // Mood History Content

                  <Mood_History_Calendar />
                ) : (

                  // Journal History Content
                  journalHistory.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between bg-white p-5 rounded-lg mb-4 shadow-md transition-shadow hover:shadow-lg w-300 mx-auto"

                    >
                      <div>
                        <p className="text-md font-medium">
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
                      <div className="flex items-center gap-3">
                        <button
                          className="p-2 rounded-full text-[#007579] hover:text-[#005457] hover:bg-red-100 transition"
                          onClick={() => handleDelete(item._id)}
                          title="Delete"
                        >
                          <MdDelete size={20} />
                        </button>
                        <button
                          className="p-2 rounded-full text-[#007579] hover:text-[#005457] hover:bg-[#AEDBD8] transition"
                          title="More"
                          onClick={() => handleOpenDetailModal(item)}
                        >
                          <PiDotsThreeCircleFill size={20} />
                        </button>
                      </div>
                    </div>
                  ))
                ): activeTab === "Activity Progress" ? (<ActivityProgress />) : ""}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Modal for Journal Details */}
      {isDetailModalOpen && (
        <EditJournal
          journal={selectedJournalDetail}
          onClose={handleCloseDetailModal}
        />
      )}
    </div>
  );
};
