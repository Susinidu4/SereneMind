import React from "react";
import GlobalStyle from "../../assets/Prototype/GlobalStyle";
import { Footer } from "../../components/Footer";
import meditation from "../../assets/Images/meditation.png";
import offer from "../../assets/Images/offer.png";
import cimg1 from "../../assets/Images/c-img1.png";
import cimg2 from "../../assets/Images/c-img2.png";
import cimg3 from "../../assets/Images/c-img3.png";
import work from "../../assets/Images/work.png";
import cimg4 from "../../assets/Images/c-img4.png";
import benifit from "../../assets/Images/benifit.png";
import { IoDiamond } from "react-icons/io5";
import { Header } from "../../components/Header";
import { Header_3 } from "../../components/Header_3";

export const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF7]">
      <Header />

      <main className="main-section flex-grow bg-[#FFFDF7]">
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
          <div className="w-[800px] space-x-10 mx-auto px-10 py-5 flex flex-row items-center border-2 border-black-200 rounded-2xl">
            <div className="para-">
              <h1
                className="text-3xl font-bold"
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  marginBottom: "20px",
                }}
              >
                What We Offer
              </h1>
              <ul className="w-[380px] text-[16px] space-y-1.5">
                <li>
                  🔹 Personalized Mood Tracking – Log emotions throughout the
                  day and uncover patterns in your mental health.
                </li>
                <li>
                  🔹 AI-Powered Self-Care Suggestions – Get customized self-care
                  activities based on your mood.
                </li>
                <li>
                  🔹 Mood Journaling – Write, reflect, and track your emotional
                  progress over time.
                </li>
                <li>
                  🔹 Self-Care Activity Tracking – Log your meditation, therapy,
                  exercise, and relaxation routines.
                </li>
                <li>
                  🔹 Mental Health Resources – Explore expert-curated articles,
                  videos, and podcasts for self-growth.
                </li>
              </ul>
            </div>
            <div className="img-section">
              <img src={offer} className="w-[300px] h-[300px]" alt="" />
            </div>
          </div>
        </div>

        <div className="card-container mt-20 flex justify-center">
          <div className="card-section grid grid-cols-4 gap-10">
            <div className="home-card shadow-lg w-[200px] p-2  border-2 border-black-200 rounded-2xl flex flex-col justify-center items-center">
              <div className="txt-section flex flex-col items-center justify-center">
                <h1 className="text-[13px] font-bold">
                  AI-Powered Personalization
                </h1>
                <p className="text-[12px] text-center">
                  Receive self-care recommendations tailored to your mood.
                </p>
              </div>
              <div className="img-section">
                <img className="w-[120px] h-[120px]" src={cimg1} alt="" />
              </div>
            </div>

            <div className="home-card shadow-lg w-[200px] p-2  border-2 border-black-200 rounded-2xl flex flex-col justify-center items-center">
              <div className="txt-section flex flex-col items-center justify-center">
                <h1 className="text-[13px] font-bold">
                  Comprehensive Well-being
                </h1>
                <p className="text-[12px] text-center">
                  A unique combination of mood tracking, self-care, and mental
                  health resources.
                </p>
              </div>
              <div className="img-section">
                <img className="w-[120px] h-[120px]" src={cimg2} alt="" />
              </div>
            </div>

            <div className="home-card shadow-lg w-[200px] p-2  border-2 border-black-200 rounded-2xl flex flex-col justify-center items-center">
              <div className="txt-section flex flex-col items-center justify-center">
                <h1 className="text-[13px] font-bold">Secure & Private</h1>
                <p className="text-[12px] text-center">
                  Your data is encrypted and protected for complete
                  confidentiality.
                </p>
              </div>
              <div className="img-section">
                <img className="w-[120px] h-[120px]" src={cimg3} alt="" />
              </div>
            </div>

            <div className="home-card shadow-lg w-[200px] p-2  border-2 border-black-200 rounded-2xl flex flex-col justify-center items-center">
              <div className="txt-section flex flex-col items-center justify-center">
                <h1 className="text-[13px] font-bold">
                  Real-time Mood Insights
                </h1>
                <p className="text-[12px] text-center">
                  Multiple daily entries allow detailed emotional tracking.
                </p>
              </div>
              <div className="img-section">
                <img className="w-[120px] h-[120px]" src={cimg4} alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="how-it-works-section mt-20">
          <div className="w-[850px] space-x-20 mx-auto px-10 py-5 flex flex-row items-center">
            <div className="img-section">
              <img src={work} className="w-[300px] h-[300px]" alt="" />
            </div>

            <div className="para-">
              <h1
                className="text-3xl font-bold"
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  marginBottom: "20px",
                  textAlign: "center",
                }}
              >
                How It Works?
              </h1>
              <ul className="w-[380px] text-[16px] space-y-1.5">
                <li>
                  1. Log Your Mood – Quickly enter how you feel throughout the
                  day.
                </li>
                <li>
                  2. Get AI Recommendations – Receive personalized self-care
                  suggestions based on your mood.
                </li>
                <li>
                  3. Track Self-Care Activities – Monitor wellness habits like
                  meditation and exercise.
                </li>
                <li>
                  4. Reflect & Grow – Use the mood journal and resource library
                  for self-improvement.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="benifit-section mt-20">
          <div className="w-[850px] space-x-10 mx-auto px-10 py-5 flex flex-row items-center border-2 border-black-200 rounded-2xl">
            <div className="para-">
              <h1
                className="text-3xl font-bold"
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  marginBottom: "20px",
                  textAlign: "center",
                }}
              >
                Who Can Benefit from SERENEMIND?
              </h1>
              <ul className="w-[380px] text-[16px] space-y-1.5 list-disc pl-5">
                {" "}
                {/* Added list-disc and pl-5 for bullet points and padding */}
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
            <div className="img-section">
              <img src={benifit} className="w-[350px] h-[350px]" alt="" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
