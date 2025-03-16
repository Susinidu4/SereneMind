const GlobalStyle = {
  // General Font Settings
  fontNunito: 
    "font-nunito",

  // Text Styles
  headingLarge: 
    "text-[40px] font-semibold",
  headingMedium: 
    "text-[18px]",
  headingSmall: 
    "text-[16px]",
  paragraph: 
    "text-gray-700 text-justify",
  remarkTopic: 
    "block font-medium mb-2",

  // Button Styles
  buttonPrimary:
    "px-6 py-2 text-[#45553D] border-2 border-[#45553D] rounded-full hover:bg-[#92A079] hover:text-white transition-all",

  // Input Styles
  inputText:
    "px-5 py-1 opacity-80 border-2 border-[#92A079] border-opacity-30 rounded-lg bg-white text-[#0B120E]-600",
  remark:
    "px-5 py-1 opacity-80 border-2 border-[#92A079] border-opacity-30 rounded-lg bg-white text-[#0B120E]-600 w-2/4",

  // Select/Dropdown Styles
  selectBox:
    "py-1 border-2 border-[#92A079] border-opacity-30 rounded-lg bg-white text-left w-40",

  // Card Styles
  cardContainer:
    "p-4 rounded-lg shadow-xl mb-6 bg-[#A4CDA7] bg-opacity-70 border-2 border-zinc-300 w-6/12 opacity-80",

  // container styles
  pageContainer:
    "flex flex-col space-y-4 p-4 bg-[#A4CDA7] border-2 border-[#92A079] rounded-3xl mb-4 shadow-lg opacity-80",

  // SearchBar
  searchBarContainer: 
    "relative bg-[#92A079]-50 bg-opacity-60 rounded-full shadow-lg shadow-gray-300",
  searchBarIcon:
    "absolute top-1/2 right-3 transform -translate-y-1/2 text-[#92A079]-400",
  inputSearch:
    "px-4 py-2 pl-10 w-64 rounded-full border border-[#A4CDA7]-400 bg-[#A4CDA7] text-sm text-[#C4C8AC]}-900 placeholder:text-[#C4C8AC]-600 outline-none focus:ring focus:ring-[#C4C8AC]-400 focus:border-[#C4C8AC]-500 opacity-80",

  // Miscellaneous
  errorText: "text-red-500 mt-2 text-[16px] text-center",
};

export default GlobalStyle;
