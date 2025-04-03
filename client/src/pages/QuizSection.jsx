import React, { useState, useEffect, useCallback } from "react";
import { generateQuiz, fetchQuizByMaterialId } from "../services/api";
import "./QuizSection.css";

const QuizSection = ({ studyMaterialId, content, isOwner, token }) => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [noQuizFound, setNoQuizFound] = useState(false); // 👈 new flag

  const loadQuiz = useCallback(async () => {
    try {
      const res = await fetchQuizByMaterialId(studyMaterialId);
      if (res) {
        setQuiz(res);
        setNoQuizFound(false);
      } else {
        setQuiz(null);
        setNoQuizFound(true); // 👈 mark as not found
      }
    } catch (err) {
      console.error("Failed to load quiz", err);
      setError("Quiz not found.");
      setQuiz(null);
      setNoQuizFound(true);
    }
  }, [studyMaterialId]);

  useEffect(() => {
    loadQuiz();
  }, [loadQuiz]);

  const handleGenerate = async () => {
    if (!token) return alert("Please log in to generate a quiz.");
    setLoading(true);
    setError("");

    try {
      const res = await generateQuiz(studyMaterialId, content);
      setQuiz(res.data);
      setNoQuizFound(false); // reset flag on success
    } catch (err) {
      console.error("Quiz generation failed", err);
      setError("Quiz generation failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quiz-section">
      <h2>📝 Quiz Section</h2>

      {quiz ? (
        <ul className="quiz-list">
        {quiz.questions.map((q, i) => (
          <li key={i}>
            <strong>Q{i + 1}: {q.question_text}</strong>
            <ul className="quiz-options">
              {q.options.map((opt, idx) => (
                <li key={idx} style={{ color: opt === q.correct_answer ? "green" : "inherit" }}>
                {opt}
              </li>
              
              ))}
            </ul>
          </li>
        ))}
      </ul>
      
      ) : isOwner ? (
        <>
          {noQuizFound && (
            <p className="no-quiz-msg">No quiz found for this material.</p>
          )}
          <button
            className="generate-quiz-btn"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate AI Quiz"}
          </button>
        </>
      ) : (
        <p className="no-quiz-msg">No quiz available for this material.</p>
      )}

      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default QuizSection;
