import React from "react";
import "./NavBar.css"; // 我们等下会加样式

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo">🤖 AI Study Buddy</div>
      <ul className="nav-links">
        <li><a href="#topics">Topics</a></li>
        <li><a href="#ai-suggested">AI Suggestions</a></li>
        {/* 你可以添加更多导航项 */}
      </ul>
    </nav>
  );
};

export default NavBar;
