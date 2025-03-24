import React, { useEffect, useState } from "react";
import axios from "axios";
import robotImg from "../assets/robot.png";
import "./homepage.css";
import NavBar from "../components/NavBar";

const DashPage = () => {
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [requiredKeyword, setRequiredKeyword] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [showFilters, setShowFilters] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetchData();
    fetchUsername();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/public/homepage-data`, {
        params: {
          search: searchTerm || "computer science",
          keyword: requiredKeyword,
        },
      });

      setTrendingTopics(Array.isArray(res.data.trendingTopics) ? res.data.trendingTopics : []);
      setAiSuggestions(Array.isArray(res.data.aiSuggestions) ? res.data.aiSuggestions : []);
    } catch (err) {
      console.error("Failed to fetch homepage data", err);
      setTrendingTopics([]);
      setAiSuggestions([]);
    }
  };

  const fetchUsername = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/profile/${userId}`);
      setUsername(res.data.username);
    } catch (err) {
      console.error("Failed to load user profile", err);
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  const sortedWikiTopics = [...trendingTopics];
  if (sortOption === "alpha") {
    sortedWikiTopics.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "snippetLength") {
    sortedWikiTopics.sort((a, b) => (b.snippet?.length || 0) - (a.snippet?.length || 0));
  }

  return (
    <div className="homepage">
      <div className="content-container">
        <h1>Welcome back, {username || "User"}!</h1>
        <p>Happy studying! 🎓✨</p>

        <NavBar onToggleFilters={() => setShowFilters((prev) => !prev)} showFilters={showFilters} />

        {showFilters && (
          <div className="filter-section">
            <input
              type="text"
              placeholder="🔍 Search topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input
              type="text"
              placeholder="🧃 Must contain keyword"
              value={requiredKeyword}
              onChange={(e) => setRequiredKeyword(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            <div className="sort-dropdown">
              <label>📊 Sort Wiki Topics:</label>
              <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="default">Original Order</option>
                <option value="alpha">Alphabetical (A → Z)</option>
                <option value="snippetLength">By Snippet Richness</option>
              </select>
            </div>
          </div>
        )}

        <div className="dashboard-grid">
          <div className="grid-card ai-card">
            <h2>🤖 AI Recommended Topics</h2>
            <ul>
              {aiSuggestions.length === 0 ? (
                <p className="error">❌ No matching AI suggestions</p>
              ) : (
                aiSuggestions.map((topic, idx) => <li key={idx}>{topic}</li>)
              )}
            </ul>
          </div>

          <div className="grid-card trending-card">
            <h2>📈 Trending Study Materials</h2>
            <ul>
              {sortedWikiTopics.length === 0 ? (
                <p className="error">❌ No matching Wikipedia topics</p>
              ) : (
                sortedWikiTopics.map((topic, idx) => (
                  <li key={idx}>
                    <a href={topic.url} target="_blank" rel="noopener noreferrer">
                      {topic.title}
                    </a>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="grid-card recent-card">
            <h2>📚 Recent Study Topics</h2>
            <p>Coming soon: Your latest viewed or saved topics!</p>
          </div>
        </div>

        <div className="floating-robot">
          <img src={robotImg} alt="AI Study Bot" className="robot-image" />
        </div>
      </div>
    </div>
  );
};

export default DashPage;