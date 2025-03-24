import React from "react";
import "./NavBar.css";

const NavBar = ({ onToggleFilters, showFilters }) => {
  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        <div className="nav-item"><a href="#home">Home</a></div>
        <div className="nav-item"><a href="#study">Study Material</a></div>
        <div className="nav-item">
          <button className="filter-toggle-btn" onClick={onToggleFilters}>
            {showFilters ? "🙈 Hide Filters" : "🔍 Show Filters"}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
