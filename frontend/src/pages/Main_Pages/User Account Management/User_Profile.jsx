import React, { useState, useEffect } from "react";
import GlobalStyle from "../../../assets/Prototype/GlobalStyle";
import { Footer } from "../../../components/Footer";
import { IoPersonCircle } from "react-icons/io5";
import { MdDelete, MdDownload } from "react-icons/md";
import { PiDotsThreeCircleFill } from "react-icons/pi";
import axios from "axios";
import { Mood_History_Calendar } from "../Mood Tracking/Mood_History_Calendar";
import Swal from "sweetalert2";
import { EditJournal } from "../../Mood_Journaling/EditJournal";
import { Header } from "../../../components/Header";
import { ActivityProgress } from "../../Activity_Tracking/ActivityProgress";
import Profile_banner from "../../../assets/Images/Profile_banner.png";
import profile from "../../../assets/Images/profile.png";
import { jsPDF } from "jspdf";
import { Header_2 } from "../../../components/Header_2";
import { FaSearch } from "react-icons/fa";

export const User_Profile = () => {
  const user_data = JSON.parse(localStorage.getItem("userData"));
  const [searchTerm, setSearchTerm] = useState("");

  if (user_data && user_data === "admin") {
    window.location.href = "/admindashboard";
  }

  if (!user_data) {
    window.location.href = "/login";
  }
  const [activeTab, setActiveTab] = useState("Mood History");
  const [journalHistory, setJournalHistory] = useState([]);
  const [user, setUser] = useState("");
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedJournalDetail, setSelectedJournalDetail] = useState(null);

  const [selectedJournalIds, setSelectedJournalIds] = useState([]); // Track selected journals

  // Fetch user data
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
          `http://localhost:5000/api/mood_journaling/mood-journal/${user_data.id}`
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
  }, [user_data.id]);

  // Handle delete
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#206A6C",
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

  // Handle checkbox selection/deselection
  // Handle checkbox change
  const handleCheckboxChange = (id) => {
    setSelectedJournalIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Handle PDF download
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let y = 10;
    doc.setFontSize(16);
    doc.text("Journal Entries", 10, y);
    y += 10;

    // Loop through selected journal IDs
    selectedJournalIds.forEach((journalId) => {
      const journal = journalHistory.find((item) => item._id === journalId);

      if (journal) {
        // Display journal details in PDF
        doc.setFontSize(12);
        doc.text(
          `Date: ${new Date(journal.createdAt).toLocaleString()}`,
          10,
          y
        );
        y += 10;

        doc.text(`Overall Mood: ${journal.Overall_mood}`, 10, y);
        y += 10;

        doc.text(`Mood Intensity: ${journal.mood_intensity}`, 10, y);
        y += 10;

        doc.text(`Emotion: ${journal.emotion.join(", ")}`, 10, y);
        y += 10;

        doc.text(`Mood Trigger: ${journal.mood_trigger}`, 10, y);
        y += 10;

        doc.text(`Cope Mood: ${journal.cope_mood}`, 10, y);
        y += 10;

        doc.text(`Notes: ${journal.notes}`, 10, y);
        y += 10;

        doc.text(`Reflection: ${journal.reflection}`, 10, y);
        y += 10;

        // Add space between each journal entry
        y += 10;
      }
    });

    // Save the PDF with the selected journal entries
    doc.save("Journal_Entries.pdf");
  };

  const filteredJournals = journalHistory.filter((item) =>
    new Date(item.createdAt)
      .toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF7]">
      <Header_2 />

      <main className="flex-grow mx-20">
        <div className={GlobalStyle.fontNunito}>
          {/* Cover Photo */}
          <div className="relative h-90 bg-green-600 rounded-t-3xl overflow-hidden">
            <img
              src={user?.coverPhoto || Profile_banner}
              alt="Cover"
              className="w-full h-100px object-cover"
            />
          </div>

          {/* Profile Section */}
          <div className="absolute flex items-center p-6 -mt-20">
            <div>
              <img
                src={user?.profilePhoto || profile}
                alt="Profile"
                className="w-50 h-50 object-cover rounded-full"
              // <IoPersonCircle
              //   className="text-gray-600"
              //   style={{ width: "200px", height: "200px" }}
              />
            </div>
          </div>

          {/* User Details */}
          <div className="p-6 mt-40">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="text-2xl font-semibold w-1/3">UserName</td>
                  <td className="text-xl pl-4">: {user?.name}</td>
                </tr>
                <tr>
                  <td className="text-2xl font-semibold w-1/3">Email</td>
                  <td className="text-xl pl-4">: {user?.email}</td>
                </tr>
                <tr>
                  <td className="text-2xl font-semibold w-1/3">
                    Date of Birth
                  </td>
                  <td className="text-xl pl-4">: {user?.dob}</td>
                </tr>
              </tbody>
            </table>
          </div>

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
                  className={`flex-grow text-center py-2 font-semibold ${
                    activeTab === "Journal History"
                      ? "text-black border-b-4 border-[#005457]"
                      : "text-gray-500"
                  }`}
                >
                  Journal History
                </button>
                <button
                  onClick={() => setActiveTab("Activity Progress")}
                  className={`flex-grow text-center py-2 font-semibold rounded-tr-lg ${
                    activeTab === "Activity Progress"
                      ? "text-black border-b-4 border-[#005457]"
                      : "text-gray-500"
                  }`}
                >
                  Activity Progress
                </button>
              </div>

              {/* Content */}
              <div className="p-4 rounded-b-lg overflow-y-auto h-140">
                {activeTab === "Mood History" ? (
                  // Mood History Content
                  <Mood_History_Calendar />
                ) : activeTab === "Journal History" ? (
                  // Journal History Content
                  <div>
                    {/* Search and Download Container */}
                    <div className="flex justify-between items-center w-full mb-4">
                      {/* Search Bar */}
                      <div className="flex items-center border border-[#007579] hover:border-2 px-4 py-2 rounded-lg shadow-md w-80 h-10">
                        <input
                          type="text"
                          placeholder="Search by date..."
                          className="text-[#007579] outline-none text-sm placeholder-[#007579] w-full"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="text-[#007579] ml-2">
                          <FaSearch />
                        </button>
                      </div>

                      {/* Download Button */}
                      <button
                        onClick={handleDownloadPDF}
                        className={`${GlobalStyle.buttonPrimary} flex items-center gap-2 px-4 py-2`}
                      >
                        <MdDownload size={20} />
                        <span>Download Journal Entries PDF</span>
                      </button>
                    </div>

                    {/* Journal History Entries */}
                    {filteredJournals.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center justify-between bg-white p-5 rounded-lg mb-4 shadow-md transition-shadow hover:shadow-lg w-300 mx-auto"
                      >
                        <div className="flex items-center">
                          {/* Checkbox for selecting journal entry */}
                          <input
                            type="checkbox"
                            className="mr-4"
                            checked={selectedJournalIds.includes(item._id)}
                            onChange={() => handleCheckboxChange(item._id)}
                          />
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
                        <div className="flex items-center">
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
                    ))}
                  </div>
                ) : (
                  <ActivityProgress />
                )}
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
