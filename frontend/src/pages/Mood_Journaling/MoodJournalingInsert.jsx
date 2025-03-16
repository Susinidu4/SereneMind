import React, { useState } from "react";
import GlobalStyle from "../../assets/Prototype/GlobalStyle";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export const MoodJournalingInsert = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF7]">
      <Header />

      <main className="flex-grow mx-20">
        <div className={GlobalStyle.fontNunito}>
          <div className={`${GlobalStyle.pageContainer} px-25`}>
            
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
