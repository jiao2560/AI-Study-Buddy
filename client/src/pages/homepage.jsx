// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import robotImg from "../assets/robot.png";
import "./homepage.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [requiredKeyword, setRequiredKeyword] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/public/homepage-data`,
        {
          params: {
            search: searchTerm || "computer science",
            keyword: requiredKeyword,
          },
        }
      );

      setTrendingTopics(
        Array.isArray(res.data.trendingTopics) ? res.data.trendingTopics : []
      );
      setAiSuggestions(
        Array.isArray(res.data.aiSuggestions) ? res.data.aiSuggestions : []
      );
    } catch (err) {
      console.error("❌ Failed to fetch homepage data", err);
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
    sortedWikiTopics.sort(
      (a, b) => (b.snippet?.length || 0) - (a.snippet?.length || 0)
    );
  }

  return (
    <div className="homepage">
      <div className="content-container">
        <h1>Welcome to AI Study Buddy</h1>
        <p>Summarize. Quiz. Master. Smarter studying starts here.</p>

        <button
          className="toggle-search-btn"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          {showFilters ? "🙈 Hide Search" : "🔍 Show Search"}
        </button>

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
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="default">Original Order</option>
                <option value="alpha">Alphabetical (A → Z)</option>
                <option value="snippetLength">By Snippet Richness</option>
              </select>
            </div>
          </div>
        )}

        <div className="intro-section">
          <p>Explore the latest learning trends powered by Wikipedia and AI.</p>
          <p>
            Find topics to dive into or generate custom study content with one
            click.
          </p>
        </div>

        <div className="card-container-wrapper">
          <div className="card-container">
            <div className="card">
              <h2>📈 Trending Topics from Wikipedia</h2>
              <ul>
                {sortedWikiTopics.length === 0 ? (
                  <p className="error">❌ No matching Wikipedia topics</p>
                ) : (
                  sortedWikiTopics.map((topic, idx) => (
                    <li key={idx}>
                      <a
                        href={topic.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {topic.title}
                      </a>
                    </li>
                  ))
                )}
              </ul>
            </div>

            <div className="card">
              <h2>🤖 AI-Suggested Topics</h2>
              <ul>
                {aiSuggestions.length === 0 ? (
                  <p className="error">❌ No matching AI suggestions</p>
                ) : (
                  aiSuggestions.map((topic, idx) => <li key={idx}>{topic}</li>)
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h2>🚀 Want to unlock more?</h2>
          <p>
            Create an account to save materials, bookmark topics, and generate
            AI-powered quizzes!
          </p>
          <button className="get-started" onClick={() => navigate("/signup")}>
            Get Started
          </button>
          <p>
            Already have an account? <a href="/login">Log in here.</a>
          </p>
        </div>

        <div className="why-section">
          <h3>📚 Why use AI Study Buddy?</h3>
          <ul>
            <li>✅ Create & save study materials with AI assistance</li>
            <li>🧠 Get personalized quiz questions & summaries</li>
            <li>🔍 Search and explore trending learning topics</li>
            <li>📅 Organize content for long-term retention</li>
          </ul>
        </div>

        <div className="floating-robot">
          <img src={robotImg} alt="AI Study Bot" className="robot-image" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
