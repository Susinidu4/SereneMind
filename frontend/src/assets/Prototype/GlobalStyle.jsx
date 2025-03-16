const GlobalStyle = {
  // General Font Settings
  fontNunito: "font-nunito",

  // Text Styles
  headingLarge: "text-[40px] font-semibold",
  headingMedium: "text-[18px]",
  headingSmall: "text-[16px]",
  paragraph: "text-gray-700",
  remarkTopic: "block font-medium mb-2",

  // Button Styles
  buttonPrimary:
    "px-5 py-1 text-[#45553D] border-2 border-[#45553D] rounded-full hover:bg-[#92A079] hover:text-white transition-all",

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
    "p-4 rounded-lg shadow-xl mb-6 bg-[#C4C8AC] bg-opacity-70 border-2 border-zinc-300 w-6/12",

  // case count bar
  caseCountBar:
    "flex flex-col space-y-4 p-4 bg-[#C4C8AC] border-2 border-[#92A079] rounded-3xl mb-4 shadow-lg bg-opacity-40 ",

  // SearchBar
  searchBarContainer: "relative bg-[#92A079]-50 bg-opasity-60 rounded-full",
  searchBarIcon:
    "absolute top-1/2 right-3 transform -translate-y-1/2 text-[#92A079]-400",
  inputSearch:
    "px-4 py-2 pl-10 w-64 rounded-full border border-[#C4C8AC]-400 bg-[#C4C8AC] text-sm text-[#C4C8AC]}-900 placeholder:text-[#C4C8AC]-600 outline-none focus:ring focus:ring-[#C4C8AC]-400 focus:border-[#C4C8AC]-500 opacity-80",

  // Miscellaneous
  errorText: "text-red-500 mt-2 text-[16px] text-center",
};

export default GlobalStyle;
