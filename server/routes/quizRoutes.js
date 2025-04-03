const express = require("express");
const router = express.Router();
const axios = require("axios"); // ✅ <--- Add this
const Quiz = require("../models/Quiz");

// Create a new quiz
// POST or update quiz for a material
router.post("/", async (req, res) => {
  try {
    const { study_material_id, questions } = req.body;
    if (
      !study_material_id ||
      !Array.isArray(questions) ||
      questions.length === 0
    ) {
      return res
        .status(400)
        .json({ error: "Study material ID and questions are required" });
    }

    // Upsert: update if exists, else insert
    const updatedQuiz = await Quiz.findOneAndUpdate(
      { study_material_id },
      { questions },
      { upsert: true, new: true }
    );

    res.status(201).json(updatedQuiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET quiz by study_material_id (query-based)
router.get("/", async (req, res) => {
  try {
    const { study_material_id } = req.query;
    if (study_material_id) {
      const quiz = await Quiz.findOne({ study_material_id });
      if (!quiz) return res.status(404).json({ error: "Quiz not found" });
      return res.status(200).json(quiz);
    }

    // fallback: get all quizzes
    const all = await Quiz.find();
    return res.status(200).json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a quiz
router.put("/:id", async (req, res) => {
  try {
    const updated = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Quiz not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a quiz
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Quiz.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Quiz not found" });
    res.status(200).json({ message: "Quiz deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/generate-quiz", async (req, res) => {
  const { content } = req.body;

  try {
    const response = await axios.post(
      "https://api.cohere.ai/v1/generate", // ✅ updated
      {
        model: "command",
        prompt: `Generate 5 multiple-choice quiz questions based on the following study material. 
Each question should have 4 answer options labeled a–d and include the correct answer at the end.
Use the following format strictly:

1. Question text
a. Option A
b. Option B
c. Option C
d. Option D
Answer: Option A

Study Material:
${content}`,

        max_tokens: 400,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.VITE_COHERE_API_KEY}`, // ✅ double check this env key exists in your .env
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error("❌ Cohere error:", err.message);
    res.status(500).json({ error: "Cohere request failed" });
  }
});

module.exports = router;
