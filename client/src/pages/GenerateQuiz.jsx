import React, { useState } from "react";
import axios from "axios";

const GenerateQuiz = ({ studyMaterialId, content }) => {
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState("");

  const generateQuiz = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("https://api.cohere.ai/generate", {
        model: "command",
        prompt: `Generate 3 multiple-choice quiz questions from this study material:\n\n${content}`,
        max_tokens: 300,
        temperature: 0.7,
      }, {
        headers: {
          Authorization: `Bearer YOUR_COHERE_API_KEY`,
          "Content-Type": "application/json",
        },
      });

      const questions = res.data.generations[0].text.split("\n").filter(line => line.trim());
      const savedQuiz = await axios.post("/api/quizzes", {
        study_material_id: studyMaterialId,
        questions,
      });

      setQuiz(savedQuiz.data);
    } catch (err) {
      setError("Failed to generate quiz");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={generateQuiz} disabled={loading}>
        {loading ? "Generating..." : "🧠 Generate AI Quiz"}
      </button>

      {error && <p className="error">{error}</p>}
      {quiz && (
        <div className="quiz-preview">
          <h3>Generated Quiz:</h3>
          <ul>
            {quiz.questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GenerateQuiz;
