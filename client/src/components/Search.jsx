import React, { useEffect, useRef, useState } from "react";
import "../styles/search.css";

export const Search = ({ searchValue, setSearchValue }) => {
  const inputRef = useRef(null);

  return (
    <>
      {/* <div className="search-input">
        <img
          onClick={() => setIsExpanded(!isExpanded)}
          src={searchIcon}
          alt="Search Icon"
        />
        <form className={`${isExpanded ? "d-flex" : "d-none"} text-end`}>
          <input
            ref={inputRef}
            autoFocus
            onChange={(e) => setSearchValue(e.target.value)}
            onBlur={() => setIsExpanded(false)}
            type="text"
            placeholder="Search..."
          />
        </form>
      </div> */}
      <div id="container" className="mx-auto d-table d-sm-block mx-sm-2">
        <input
          onChange={(e) => setSearchValue(e.target.value)}
          ref={inputRef}
          id="search"
          type="text"
        />
      </div>
    </>
  );
};
