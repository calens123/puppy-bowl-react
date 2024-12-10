import React from "react";

const SearchBar = ({ query, setQuery }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search players by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
