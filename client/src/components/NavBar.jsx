import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ onToggleFilters, showFilters }) => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token"); // 检查是否登录

  useEffect(() => {
    const fetchUsername = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/users/profile/${userId}`
        );
        setUsername(res.data.username);
      } catch (err) {
        console.error("Failed to load user", err);
      }
    };

    if (isLoggedIn) {
      fetchUsername();
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar-wrapper">
      <nav className={`navbar ${!isLoggedIn ? "no-auth" : ""}`}>
        <div className="nav-left">
          <div className="nav-item">
            <a href="#home">Home</a>
          </div>
          <div className="nav-item">
            <a href="#study">Study Material</a>
          </div>
          <div className="nav-item">
            <button className="filter-toggle-btn" onClick={onToggleFilters}>
              {showFilters ? "🙈 Hide Search" : "🔍 Show Search"}
            </button>
          </div>
        </div>

        {isLoggedIn && (
          <div className="nav-right">
            <div className="nav-item greeting">
              <span role="img" aria-label="wave">
                👋
              </span>{" "}
              Hi, {username || "User"}
            </div>
            <div className="nav-item">
              <a href="/profile">Profile</a>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;