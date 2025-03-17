import React from "react";
import GlobalStyle from "../assets/Prototype/GlobalStyle";

export const Footer = () => {
  return (
    <div className="bg-[#92A079] p-2 flex justify-center items-center mt-8">
      <p className={GlobalStyle.paragraph}>
        CopyRight © 2025 BrainyBrunch. All rights reserved.
      </p>
    </div>
  );
};
