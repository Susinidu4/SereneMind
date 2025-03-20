import React from "react";
import GlobalStyle from "../../assets/Prototype/GlobalStyle";
import { Footer } from "../../components/Footer";
import meditation from "../../assets/Images/meditation.png";
import offer from "../../assets/Images/offer.png";
import { IoDiamond } from "react-icons/io5";
import { Header } from "../../components/Header";
import { Header_3} from "../../components/Header_3";

export const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF7]">
     <Header />

      <main className="main-section flex-grow">
        <div className="hero-section flex flex-row mt-10 items-center justify-center gap-10">
          <div className="img-section flex-1 flex flex-col items-end">
            <img
              src={meditation}
              alt="meditation"
              className="w-[400px] h-[400px] justify-self-end"
            />
          </div>
          <div
            className="para-section flex-1 flex flex-col items-center space-y-5"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            <h1 className="text-3xl font-bold ">Welcome to SERENE MIND</h1>
            <h3 className="text-xl font-semibold">
              Your Personalized Mental Health Companion
            </h3>
            <p className="w-[500px] text-center">
              SereneMind is your trusted space to track emotions, practice
              self-care, and access valuable mental health resources all in one
              place. Our AI-powered platform helps you understand your emotions
              and develop a healthier mind.
            </p>
          </div>
        </div>

        <div className="offer-section">
          <div className="w-[800px] mx-auto px-10 py-5 flex flex-row items-center border-2 border-black-200 rounded-2xl">
            <div className="para-">
              <h1
                className="text-3xl font-bold"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                What We Offer
              </h1>
              <ul className="w-[400px] text-[16px]">
                <li>🔹 Personalized Mood Tracking – Log emotions throughout the day and uncover patterns in your mental health.</li>
                <li>🔹 AI-Powered Self-Care Suggestions – Get customized self-care activities based on your mood.</li>
                <li>🔹 Mood Journaling – Write, reflect, and track your emotional progress over time.</li>
                <li>🔹 Self-Care Activity Tracking – Log your meditation, therapy, exercise, and relaxation routines.</li>
                <li>🔹 Mental Health Resources – Explore expert-curated articles, videos, and podcasts for self-growth.</li>
              </ul>
            </div>
            <div className="img-section">
              <img src={offer} className="w-[300px] h-[300px]" alt="" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
