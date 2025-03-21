import React from "react";
import GlobalStyle from "../../assets/Prototype/GlobalStyle";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import bg_image1 from "../../assets/Images/instructionbgImage.png";

export const InstructionPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/MoodJournaling/MoodJournalingInsert");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF7]">
      <Header />
      <main className="flex-grow mx-20">
        <div className={GlobalStyle.fontNunito}>
          <h1 className={`${GlobalStyle.headingLarge} `}>Mood Journaling</h1>
        </div>

        {/* Page Content */}
        <div className="mx-25 mt-12">
          <p className={GlobalStyle.paragraph}>
            Take a moment to reflect on your current emotional state and record
            your thoughts. Mood journaling is a powerful tool that helps you
            gain clarity and awareness about your feelings. By identifying and
            understanding your emotions, you can uncover patterns, triggers, and
            coping strategies that work best for you. This practice not only
            supports your mental well-being but also fosters personal growth,
            resilience, and self-compassion. Whether you're celebrating a joyful
            moment, processing a challenging experience, or simply checking in
            with yourself, journaling provides a safe space to express and
            explore your emotions. Remember, there’s no right or wrong way to
            feel—this is your journey to self-discovery and emotional balance.
            <br />
            <br />
          </p>
          <p className={`font-semibold ${GlobalStyle.headingMedium}`}>
            Follow these steps to begin:
          </p>
          <ul className="list-disc ml-20 space-y-3 pt-3">
            <li>
              Rate Your Mood: Indicate how you’re feeling overall and select
              your mood intensity on a scale of 1 to 10.
            </li>
            <li>
              Identify Your Emotions: Choose the specific emotions you’re
              experiencing right now.
            </li>
            <li>
              Discover Triggers: Write down any events, thoughts, or
              circumstances that might have triggered your mood.
            </li>
            <li>
              Express Your Coping Methods: Reflect on how you managed or are
              managing this mood.
            </li>
            <li>
              Add Notes and Reflections: Use the space to jot down additional
              thoughts, insights, or observations.
            </li>
            <li>
              Capture the Moment: Optionally, upload a photo or snap to
              represent this mood.
            </li>
          </ul>
          <p className={`${GlobalStyle.paragraph} pt-8`}>
            Take your time, be honest with yourself, and let this journaling
            session guide you toward self-awareness and growth.
          </p>
        </div>

        {/* button */}
        <div className="flex gap-4 pt-16 justify-center">
          <button
            className={GlobalStyle.buttonPrimary}
            onClick={handleButtonClick}
          >
            Add Journal
          </button>
        </div>

        {/* Ad Banner */}
        <div>
          <img 
            src={bg_image1}
            alt="Ad"
            className="w-200 h-200 mx-auto mt-16"
          />
        </div>

      </main>

      <Footer />
    </div>
  );
};
