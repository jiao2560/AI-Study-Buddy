import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

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
    if (isLoggedIn) fetchUsername();
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        {/* Mobile hamburger icon */}
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>

        <div className={`nav-left ${menuOpen ? "show" : ""}`}>
          <div className="nav-item">
            <Link to={isLoggedIn ? "/dashboard" : "/"}>Home</Link>
          </div>
          <div className="nav-item">
            <Link to="/study-materials">Study Material</Link>
          </div>
          {role === "admin" && (
            <div className="nav-item">
              <Link to="/admin-reports">📋 Handle Reports</Link>
            </div>
          )}
        </div>

        <div className={`nav-right ${menuOpen ? "show" : ""}`}>
          {isLoggedIn ? (
            <>
              <div className="nav-item greeting">👋 Hi, {username || "User"}</div>
              <div className="nav-item">
                <Link to="/profile">Profile</Link>
              </div>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="nav-auth-btn" onClick={() => navigate("/login")}>
                Log In
              </button>
              <button className="nav-auth-btn" onClick={() => navigate("/signup")}>
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
