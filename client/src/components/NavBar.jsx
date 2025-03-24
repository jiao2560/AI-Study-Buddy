import React from "react";
import "./NavBar.css";

const NavBar = ({ onToggleFilters, showFilters }) => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><a href="#topics">Topics</a></li>
        <li><a href="#ai-suggested">Suggestions</a></li>
        {/* Toggle filter button */}
        <li>
          <button className="filter-toggle-btn" onClick={onToggleFilters}>
            {showFilters ? "🙈 Hide Filters" : "🔍 Show Filters"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
