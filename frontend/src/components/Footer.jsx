import React from "react";
import GlobalStyle from "../assets/Prototype/GlobalStyle";

export const Footer = () => {
  return (
    <div className="bg-[#005457]  p-2 flex justify-center items-center mt-8">
      <p className={`text-white ${GlobalStyle.paragraph}`}>
        CopyRight © 2025 BrainyBrunch. All rights reserved.
      </p>
    </div>
  );
};
