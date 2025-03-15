import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery, darkMode }) => {
  return (
    <input
      type="text"
      value={searchQuery}
      onChange={e => setSearchQuery(e.target.value)}
      placeholder="Search tasks..."
      className={`border rounded p-2 w-64 mt-4 ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black"}`}
    />
  );
};

export default SearchBar;
