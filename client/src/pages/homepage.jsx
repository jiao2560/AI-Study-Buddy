import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css"; // ✅ Import external CSS

const HomePage = () => {
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [requiredKeyword, setRequiredKeyword] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/public/homepage-data", {
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

  useEffect(() => {
    fetchData();
  }, []);

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
      <div className="top-buttons">
        <button className="login-button">Login</button>
        <button className="signup-button">Sign Up</button>
      </div>

      <h1>Welcome to AI Study Buddy</h1>
      <p>Summarize. Quiz. Master. Smarter studying starts here.</p>

      <div className="filter-toggle">
        <button onClick={() => setShowFilters((prev) => !prev)}>
          {showFilters ? "🙈 Hide Filters" : "🔍 Show Filters"}
        </button>
      </div>

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

      <h2>📈 Trending Topics from Wikipedia</h2>
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

      <h2>🤖 AI-Suggested Topics</h2>
      <ul>
        {aiSuggestions.length === 0 ? (
          <p className="error">❌ No matching AI suggestions</p>
        ) : (
          aiSuggestions.map((topic, idx) => (
            <li key={idx}>{topic}</li>
          ))
        )}
      </ul>
    </div>
  );
};

export default HomePage;
