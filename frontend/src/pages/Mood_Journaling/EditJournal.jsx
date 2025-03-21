import React from "react";
import { IoMdCloseCircle } from "react-icons/io";
import GlobalStyle from "../../assets/Prototype/GlobalStyle";
import { FaEdit } from "react-icons/fa";

export const EditJournal = ({ journal, onClose }) => {
  if (!journal) return null;
  console.log(journal);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg backdrop-blur-sm z-50">
      {/* <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[800px] relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Journal Details</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            &times;
          </button>
        </div>
        <div>
          <p>
            <strong>Overall Mood:</strong> {journal.Overall_mood}
          </p>
          <p>
            <strong>Mood Intensity:</strong> {journal.mood_intensity}
          </p>
          <p>
            <strong>Emotions:</strong> {journal.emotion.join(", ")}
          </p>
          <p>
            <strong>Journal Entry:</strong> {journal.journal_entry}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(journal.createdAt).toLocaleString()}
          </p>
        </div>
      </div> */}

      <div className="mt-10">
        <main className="flex-grow mx-20">
          <div className={GlobalStyle.fontNunito}>
            <div className="flex justify-center items-center min-h-screen">
              <div
                className={`${GlobalStyle.pageContainer} rounded-lg shadow-lg w-[90%] sm:w-[800px] p-10 relative`}
              >
                <div>
                  <button className="absolute top-3 left-3 rounded-full text-[#007579] hover:text-[#005457] hover:bg-[#AEDBD8] text-2xl p-3">
                    <FaEdit />
                  </button>
                </div>

                <button
                  className="absolute top-3 right-3 text-red-900"
                  onClick={onClose}
                  aria-label="Close"
                >
                  <IoMdCloseCircle size={30} />
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                  <div>
                    <p className="text-lg font-semibold">
                      Date: {new Date(journal.updatedAt).toLocaleDateString()}
                    </p>
                    <p className="text-lg font-semibold">
                      Time: {new Date(journal.updatedAt).toLocaleTimeString()}
                    </p>
                    <div className="p-4 bg-[#AEDBD8] rounded-lg shadow-md mt-5">
                      <p className="text-lg font-semibold">
                        Overall Mood: {journal.Overall_mood}{" "}
                      </p>
                      <p className="text-lg font-semibold">
                        Mood Intensity: {journal.mood_intensity}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-[#AEDBD8] rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold">
                      What Emotions You Felt:
                    </h3>
                    <ul className="list-disc ml-5 mt-2">
                      {journal.emotion.map((emotion, index) => (
                        <li key={index}>{emotion}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 bg-[#AEDBD8] p-4 rounded-lg shadow-md">
                  <h3 className="font-semibold">What Triggered This Mood:</h3>
                  <p>{journal.mood_trigger}</p>
                </div>

                <div className="mt-4 bg-[#AEDBD8] p-4 rounded-lg shadow-md">
                  <h3 className="font-semibold">
                    What You Coped With This Mood:
                  </h3>
                  <p>{journal.cope_mood}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 ">
                  <div className="p-4 bg-[#AEDBD8] rounded-lg shadow-md">
                    <h3 className="font-semibold">Notes:</h3>
                    <ul className="list-disc ml-5">
                      <li>{journal.notes}</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-[#AEDBD8] rounded-lg shadow-md">
                    <h3 className="font-semibold">Reflections:</h3>
                    <ul className="list-disc ml-5">
                      <li>{journal.reflection}</li>
                    </ul>
                  </div>
                </div>

                <div className="flex space-x-2 mt-4 bg-[#AEDBD8] p-4 rounded-lg shadow-md"></div>
                {/* button 2*/}
                <div className="flex gap-4">
                  <button
                    className={`${GlobalStyle.buttonPrimary} px-2 py-1 text-sm ml-auto`}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
