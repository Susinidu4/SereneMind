import React from "react";
import GlobalStyle from "../../assets/Prototype/GlobalStyle";
import { Footer } from "../../components/Footer";
import { Header_3 } from "../../components/Header_3";
import meditation from "../../assets/Images/meditation.png";

export const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF7]">
      <Header_3 />

      <main className="main-section flex-grow">
        <div className="hero-section flex flex-row mt-10 items-center justify-center gap-10">
          <div className="img-section flex-1 flex flex-col items-center justify-center">
            <img
              src={meditation}
              alt="meditation"
              className="w-[300px] h-[300px]"
            />
          </div>
          <div className="para-section flex-1 flex flex-col justify-center items-center  text-center space-y-5">
            <h1 className="text-3xl font-bold ">Welcome to SERENE MIND</h1>
            <h3 className="text-xl">Your Personalized Mental Health Companion</h3>
            <p className="w-[500px]">
              SereneMind is your trusted space to track emotions, practice
              self-care, and access valuable mental health resources all in one
              place. Our AI-powered platform helps you understand your emotions
              and develop a healthier mind.
            </p>
          </div>
        </div>

        <div className="offer-section"></div>
      </main>

      <Footer />
    </div>
  );
};
