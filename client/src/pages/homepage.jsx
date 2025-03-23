import React, { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [aiSuggestions, setAiSuggestions] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [requiredKeyword, setRequiredKeyword] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [showFilters, setShowFilters] = useState(false); // NEW: toggle visibility

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
    fetchData(); // initial load
  }, []);

  const handleSearch = () => {
    fetchData(); // refetch with updated query
  };

  const sortedWikiTopics = [...trendingTopics];
  if (sortOption === "alpha") {
    sortedWikiTopics.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "snippetLength") {
    sortedWikiTopics.sort((a, b) => (b.snippet?.length || 0) - (a.snippet?.length || 0));
  }

  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif", color: "#333" }}>
        {/* 🔐 Top-right Login / Signup */}
<div style={{
  position: "absolute",
  top: "20px",
  right: "40px",
  display: "flex",
  gap: "12px"
}}>
  <button style={{
    padding: "8px 16px",
    border: "1px solid #007bff",
    backgroundColor: "#fff",
    color: "#007bff",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
  }}>
    Login
  </button>
  <button style={{
    padding: "8px 16px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
  }}>
    Sign Up
  </button>
</div>
      <h1>Welcome to AI Study Buddy</h1>
      <p>Summarize. Quiz. Master. Smarter studying starts here.</p>

      {/* 🔘 Toggle Filters Button */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          style={{
            padding: "8px 16px",
            background: "#444",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {showFilters ? "🙈 Hide Filters" : "🔍 Show Filters"}
        </button>
      </div>

      {/* 🔍 Search + Filter Section */}
      {showFilters && (
        <div style={{ marginBottom: "20px", transition: "all 0.3s ease-in-out" }}>
          <input
            type="text"
            placeholder="🔍 Search topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: "8px", width: "60%", marginRight: "10px" }}
          />
          <input
            type="text"
            placeholder="🧃 Must contain keyword"
            value={requiredKeyword}
            onChange={(e) => setRequiredKeyword(e.target.value)}
            style={{ padding: "8px", width: "30%" }}
          />
          <button onClick={handleSearch} style={{ marginLeft: "10px", padding: "8px 12px" }}>
            Search
          </button>

          {/* 🧠 Sort Dropdown */}
          <div style={{ marginTop: "20px" }}>
            <label>📊 Sort Wiki Topics: </label>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              style={{ padding: "6px", marginLeft: "10px" }}
            >
              <option value="default">Original Order</option>
              <option value="alpha">Alphabetical (A → Z)</option>
              <option value="snippetLength">By Snippet Richness</option>
            </select>
          </div>
        </div>
      )}

      {/* 📰 Wiki Topics */}
      <h2>📈 Trending Topics from Wikipedia</h2>
      <ul>
        {sortedWikiTopics.length === 0 ? (
          <p style={{ color: "red" }}>❌ No matching Wikipedia topics</p>
        ) : (
          sortedWikiTopics.map((topic, idx) => (
            <li key={idx}>
              <a
                href={topic.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1a0dab", textDecoration: "underline" }}
              >
                {topic.title}
              </a>
            </li>
          ))
        )}
      </ul>

      {/* 🤖 AI Suggestions */}
      <h2>🤖 AI-Suggested Topics</h2>
      <ul>
        {aiSuggestions.length === 0 ? (
          <p style={{ color: "red" }}>❌ No matching AI suggestions</p>
        ) : (
          aiSuggestions.map((topic, idx) => (
            <li key={idx} style={{ marginBottom: "10px" }}>
              {topic}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default HomePage;
