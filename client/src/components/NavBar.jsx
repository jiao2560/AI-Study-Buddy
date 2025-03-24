import React from "react";
import "./NavBar.css";

const NavBar = ({ onToggleFilters, showFilters }) => {
    return (
        <div className="navbar-wrapper">
          <nav className="navbar">
            <ul className="nav-links">
              <li><a href="#topics">Topics</a></li>
              <li><a href="#ai-suggested">Suggestions</a></li>
              <li>
                <button className="filter-toggle-btn" onClick={onToggleFilters}>
                  {showFilters ? "🙈 Hide Filters" : "🔍 Show Filters"}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      );
};

export default NavBar;
