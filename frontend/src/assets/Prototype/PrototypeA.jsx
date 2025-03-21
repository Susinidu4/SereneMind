import GlobalStyle from "./GlobalStyle";
import React from "react";
import { MdDownload } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

export const PrototypeA = () => {
  return (
    <div>
      {/* font styles */}
      <p className={GlobalStyle.fontNunito}>Hello</p>
      <p className={GlobalStyle.headingLarge}>Hello</p>
      <p className={GlobalStyle.headingMedium}>Hello</p>
      <p className={GlobalStyle.headingSmall}>Hello</p>
      <p className={GlobalStyle.paragraph}>Hello</p>
      <p className={GlobalStyle.remarkTopic}>Hello</p>
      <br />

      {/* button */}
      <div className="flex gap-4">
        <h1>Button 01</h1>
        <button className={GlobalStyle.buttonPrimary}>Submit</button>
      </div>

      {/* button 2*/}
      <div className="flex gap-4">
        <h1>Button 02</h1>
        <button className={GlobalStyle.buttonSecondary}>Save</button>
      </div>

      {/* download button */}
      <div className="flex gap-4">
        <h1>Download</h1>
        <button
          className={`${GlobalStyle.buttonPrimary} flex items-center gap-2`}
        >
          <MdDownload size={20} />
          <span>Download</span>
        </button>
      </div>

      {/* textbox */}
      <div className="flex gap-4">
        <h1>Textbox</h1>
        <input
          type="text"
          placeholder="Text here"
          className={GlobalStyle.inputText}
        />
      </div>

      {/* remark box */}
      <div className="mb-6">
        <label className={GlobalStyle.remarkTopic}>Remark</label>
        <textarea
          value=""
          className={`${GlobalStyle.remark}`}
          rows="5"
        ></textarea>
      </div>

      {/* dropdown */}
      <div className="flex gap-4">
        <h1>Select Box</h1>
        <select className={GlobalStyle.selectBox}>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>

      {/* container 1*/}
      <div className={`${GlobalStyle.cardContainer}`}>
        <h1>Card Box</h1>
        <p>Card Content</p>
        <p>Card Content</p>
        <p>Card Content</p>
        <p>Card Content</p>
      </div>

      {/* container 2 */}
      <div className={`${GlobalStyle.pageContainer}`}>
        <h1>Case Count Bar</h1>
        <h1>Case Count Bar</h1>
        <h1>Case Count Bar</h1>
        <h1>Case Count Bar</h1>
        <h1>Case Count Bar</h1>
        <h1>Case Count Bar</h1>
        <h1>Case Count Bar</h1>
        <h1>Case Count Bar</h1>
      </div>

      {/* search bar */}
      <div className="mb-4 flex justify-start">
        <div className={GlobalStyle.searchBarContainer}>
          <input
            type="text"
            placeholder=""
            // value={searchQuery}
            // onChange={(e) => setSearchQuery(e.target.value)}
            className={GlobalStyle.inputSearch}
          />
          <FaSearch className={GlobalStyle.searchBarIcon} />
        </div>
      </div>
    </div>
  );
};
