const GlobalStyle = {
  // General Font Settings
  fontNunito: 
    "font-nunito",

  // Text Styles
  headingLarge: 
    "text-[40px] font-bold",
  headingMedium: 
    "text-[22px] font-semibold",
  headingSmall: 
    "text-[18px] ",
  paragraph: 
    "text-gray-700 text-justify text-[18px]",
  remarkTopic: 
    "block mb-2 text-[20px]",

  // Button Styles
  buttonPrimary:
    "bg-gradient-to-t from-[#007579] to-[#00B4A6] text-white px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform duration-300",

  buttonSecondary:
    "px-4 py-0.5 text-[#45553D] border-2 border-[#005457] rounded-[15px] hover:bg-[#007579] hover:text-white transition-all",

  // Input Styles
  inputText:
    "px-5 py-1 opacity-80 border-2 border-[#005457] border-opacity-30 rounded-lg bg-white text-[#0B120E]-600",
  remark:
    "px-5 py-1 opacity-80 border-2 border-[#005457] border-opacity-30 rounded-lg bg-white text-[#0B120E]-600 w-300",

  // Select/Dropdown Styles
  selectBox:
    "py-1 border-2 border-[#005457] border-opacity-30 rounded-lg bg-white text-left w-40",

  // Card Styles
  cardContainer:
    "p-4 rounded-lg shadow-xl mb-6 bg-[#E9F1F1] bg-opacity-70 border-2 border-zinc-300 w-6/12 opacity-80",

  // container styles
  pageContainer:
    "flex flex-col space-y-4 p-4 bg-[#E9F1F1] border-2 border-[#005457] rounded-3xl w-6/8 mb-4 shadow-lg opacity-80",

  // SearchBar
  searchBarContainer: 
    "relative bg-[#E6E9F2]-50 bg-opacity-60 rounded-full shadow-lg shadow-gray-300",
  searchBarIcon:
    "absolute top-1/2 right-3 transform -translate-y-1/2 text-[#92A079]-400",
  inputSearch:
    "px-4 py-2 pl-10 w-64 rounded-full border border-[#005457]-400 bg-[#E6E9F2] text-sm text-[#C4C8AC]}-900 placeholder:text-[#C4C8AC]-600 outline-none focus:ring focus:ring-[#005457]-400 focus:border-[#005457]-500 opacity-80",

  // Miscellaneous
  errorText: "text-red-500 mt-2 text-[16px] text-center",
};

export default GlobalStyle;
