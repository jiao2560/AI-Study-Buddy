const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

router.get("/homepage-data", async (req, res) => {
  try {
    console.log("📡 Incoming request to /homepage-data");

    const searchTerm = req.query.search || "computer science"; // default
    const keyword = req.query.keyword || "";

    // Wikipedia search
    const wikiResponse = await axios.get("https://en.wikipedia.org/w/api.php", {
      params: {
        action: "query",
        list: "search",
        srsearch: searchTerm,
        srlimit: 5,
        format: "json",
        origin: "*",
      },
    });

    console.log("✅ Wikipedia data fetched");

    let trendingFromWiki = wikiResponse.data?.query?.search?.map((item) => ({
        title: item.title,
        snippet: item.snippet, // 🆕 Include snippet here
        url: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title.replace(/ /g, "_"))}`,
      })) || [];

    // Apply keyword filter (backend-side)
    if (keyword.trim()) {
      trendingFromWiki = trendingFromWiki.filter((item) =>
        item.title.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    // Gemini API call
    const geminiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Give me 5 trending study topics for: ${searchTerm}, no more than one line`,
              },
            ],
          },
        ],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("✅ Gemini data fetched");

    const rawText = geminiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const aiSuggestions = rawText
      .split("\n")
      .filter((line) => line.trim() !== "");

    console.log("✅ Cleaned Suggestions:", aiSuggestions);

    res.json({
      trendingTopics: trendingFromWiki,
      aiSuggestions,
    });
  } catch (error) {
    console.error("❌ Failed to fetch homepage data");
    if (error.response) {
      console.error("Response error:", error.response.data);
    } else {
      console.error("Error message:", error.message);
    }
    res.status(500).json({ error: "Failed to fetch homepage data" });
  }
});

module.exports = router;
