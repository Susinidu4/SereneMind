import React from "react";
import GlobalStyle from "../../assets/Prototype/GlobalStyle";
import { Footer } from "../../components/Footer";
import meditation from "../../assets/Images/meditation.png";





import { IoDiamond } from "react-icons/io5";
import { Header } from "../../components/Header";
import { Header_3 } from "../../components/Header_3";

import welcome from "../../assets/Images/welcome.png";
import offer from "../../assets/Images/offer.png";
import cimg1 from "../../assets/Images/c-img1.png";
import cimg2 from "../../assets/Images/c-img2.png";
import cimg3 from "../../assets/Images/c-img3.png";
import cimg4 from "../../assets/Images/c-img4.png";
import work from "../../assets/Images/work.png";
import benifit from "../../assets/Images/benefit.png";

export const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF7]">
      <Header />

      {/* 1st section */}
      <main className="main-section flex-grow bg-[#FFFDF7]">
        <div className="hero-section flex items-center justify-center px-20 pb-10">
          <div className="img-section flex-1 flex flex-col ">
            <img
              src={welcome}
              alt="welcome"
              className="w-150 h-150"
            />
          </div>
          <div
            className="para-section flex-1 flex flex-col items-center space-y-5"
            style={{ fontFamily: "Nunito" }}
          >
            <h1 className={GlobalStyle.headingLarge}>Welcome to SERENE MIND</h1>
            <h3 className={GlobalStyle.headingMedium}>
              Your Personalized Mental Health Companion
            </h3>
            <p className={`text-center ${GlobalStyle.headingSmall}`}>
              SereneMind is your trusted space to track emotions, practice
              self-care, and access valuable mental health resources all in one
              place. Our AI-powered platform helps you understand your emotions
              and develop a healthier mind.
            </p>
          </div>
        </div>

        {/* 2ns section */}
        <div className="bg-gradient-to-t via-green-50 to-[#007579] py-16">
          <div className="w-full max-w-6xl mx-auto pt-40 flex flex-col md:flex-row items-center gap-20">
            {/* Text Section */}
            <div className="para-section flex-1">
              <h1
                className="text-4xl font-bold text-gray-800 mb-6"
                style={{ fontFamily: "Nunito" }}
              >
                What We Offer
              </h1>
              <ul className="space-y-4 text-gray-700 text-lg">
                <li>
                  🔹{" "}
                  <span className="font-semibold">
                    Personalized Mood Tracking
                  </span>{" "}
                  – Log emotions throughout the day and uncover patterns in your
                  mental health.
                </li>
                <li>
                  🔹{" "}
                  <span className="font-semibold">
                    AI-Powered Self-Care Suggestions
                  </span>{" "}
                  – Get customized self-care activities based on your mood.
                </li>
                <li>
                  🔹 <span className="font-semibold">Mood Journaling</span> –
                  Write, reflect, and track your emotional progress over time.
                </li>
                <li>
                  🔹{" "}
                  <span className="font-semibold">
                    Self-Care Activity Tracking
                  </span>{" "}
                  – Log your meditation, therapy, exercise, and relaxation
                  routines.
                </li>
                <li>
                  🔹{" "}
                  <span className="font-semibold">Mental Health Resources</span>{" "}
                  – Explore expert-curated articles, videos, and podcasts for
                  self-growth.
                </li>
              </ul>
            </div>

            {/* What we offer section image */}
            <div className="img-section flex-1 flex justify-center">
              <img
                src={offer}
                className="w-[450px] h-[450px] "
                alt="What we offer"
              />
            </div>
          </div>
        </div>

        {/* 3rd section */}
        <div className="card-container mt-40 flex justify-center pb-40">
          <div className="card-section grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Card 1 */}
            <div className="home-card bg-gradient-to-br from-[#C0D5D5] to-[#E0EAEA] shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-[400px] h-[375px] p-6 rounded-2xl flex flex-col justify-between items-center">
              <div className="txt-section text-center pt-5">
                <h1 className={GlobalStyle.headingMedium}>
                  AI-Powered Personalization
                </h1>
                <p className="text-[13px] pt-4">
                  Receive self-care recommendations tailored to your mood.
                </p>
              </div>
              <div className="img-section">
                <img
                  className="w-[200px] h-[200px] "
                  src={cimg1}
                  alt="AI-Powered Personalization"
                />
              </div>
            </div>

            {/* Card 2 */}
            <div className="home-card bg-gradient-to-bl from-[#C0D5D5] to-[#E0EAEA] shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-[400px] h-[375px] p-6 rounded-2xl flex flex-col justify-between items-center">
              <div className="txt-section text-center pt-5">
                <h1 className={GlobalStyle.headingMedium}>
                  Comprehensive Well-being
                </h1>
                <p className="text-[13px] pt-4">
                  A unique combination of mood tracking, self-care, and mental
                  health resources.
                </p>
              </div>
              <div className="img-section">
                <img
                  className="w-[200px] h-[200px]"
                  src={cimg2}
                  alt="Comprehensive Well-being"
                />
              </div>
            </div>

            {/* Card 3 */}
            <div className="home-card bg-gradient-to-bl from-[#E0EAEA] to-[#C0D5D5] shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-[400px] h-[375px] p-6 rounded-2xl flex flex-col justify-between items-center">
              <div className="txt-section text-center pt-5">
                <h1 className={GlobalStyle.headingMedium}>Secure & Private</h1>
                <p className="text-[13px] pt-4">
                  Your data is encrypted and protected for complete
                  confidentiality.
                </p>
              </div>
              <div className="img-section">
                <img
                  className="w-[250px] h-[250px]"
                  src={cimg3}
                  alt="Secure & Private"
                />
              </div>
            </div>

            {/* Card 4 */}
            <div className="home-card bg-gradient-to-br from-[#E0EAEA] to-[#C0D5D5] shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-[400px] h-[375px] p-6 rounded-2xl flex flex-col justify-between items-center">
              <div className="txt-section text-center pt-5">
                <h1 className={GlobalStyle.headingMedium}>
                  Real-time Mood Insights
                </h1>
                <p className="text-[13px] pt-4">
                  Multiple daily entries allow detailed emotional tracking.
                </p>
              </div>
              <div className="img-section">
                <img
                  className="w-[300px] h-[200px]"
                  src={cimg4}
                  alt="Real-time Mood Insights"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4th Section */}
        <div className="how-it-works-section py-40 bg-gradient-to-r from-white via-[#C0D5D5] to-[#005459] ">
          <div
            className="container mx-auto px-6 lg:px-20 flex flex-col md:flex-row items-center gap-12 "
            style={{ fontFamily: "Nunito" }}
          >
            {/* Image Section */}
            <div className="img-section flex-1 flex justify-center">
              <img
                src={work}
                className="w-[600px] h-[550px]  "
                alt="How It Works"
              />
            </div>

            {/* Text Section */}
            <div className="text-section flex-1 text-white">
              <h1 className="text-4xl font-bold mb-8 text-center md:text-left">
                How It Works
              </h1>
              <ul className="text-lg leading-relaxed space-y-6">
                <li className="flex items-start">
                  <span className="bg-white text-[#1A5D44] font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4">
                    1
                  </span>
                  <p>
                    Log Your Mood – Quickly enter how you feel throughout the
                    day.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="bg-white text-[#1A5D44] font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4">
                    2
                  </span>
                  <p>
                    Get AI Recommendations – Receive personalized self-care
                    suggestions based on your mood.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="bg-white text-[#1A5D44] font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4">
                    3
                  </span>
                  <p>
                    Track Self-Care Activities – Monitor wellness habits like
                    meditation and exercise.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="bg-white text-[#1A5D44] font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4">
                    4
                  </span>
                  <p>
                    Reflect & Grow – Use the mood journal and resource library
                    for self-improvement.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 5th Section */}
        <div className="benefit-section py-16 pt-30 pb-30">
          <div
            className="container mx-auto flex flex-col items-center gap-12 px-6 lg:px-20"
            style={{ fontFamily: "Nunito" }}
          >
            {/* Content Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Text Section */}
              <div className="text-section flex flex-col justify-center ">
                {/* Title Section */}
                <h1 className="text-4xl font-bold text-center text-[#004D40]">
                  Who Can Benefit from SERENEMIND?
                </h1><br/><br/>
                <ul className="text-lg leading-relaxed space-y-4 list-disc pl-6">
                  <li>
                    Individuals looking to track and manage their mental health.
                  </li>
                  <li>
                    Students and professionals dealing with stress and anxiety.
                  </li>
                  <li>
                    People struggling with emotional fluctuations or burnout.
                  </li>
                  <li>Anyone seeking a structured self-care routine.</li>
                </ul>
              </div>

              {/* Image Section */}
              <div className="img-section flex justify-center items-center">
                <img
                  src={benifit}
                  className="w-[600px] h-[600px] "
                  alt="Benefit Illustration"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
