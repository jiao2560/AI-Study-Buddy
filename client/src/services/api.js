import axios from "axios";

import api from "../utils/axiosInstance"; // 

export const fetchStudyMaterials = () => api.get("/studyMaterials");
export const createStudyMaterial = (data) => {
  const token = localStorage.getItem("token");
  return api.post("/studyMaterials", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateStudyMaterial = (id, updatedMaterial) =>
  api.put(`/studyMaterials/${id}`, updatedMaterial);
export const deleteStudyMaterial = (id) => api.delete(`/studyMaterials/${id}`);
export const fetchStudyMaterialById = (id) => api.get(`/studyMaterials/${id}`);

// Quizzes API
export const fetchQuizzes = () => api.get("/quizzes");
export const createQuiz = (quiz) => api.post("/quizzes", quiz);
export const updateQuiz = (id, updatedQuiz) =>
  api.put(`/quizzes/${id}`, updatedQuiz);
export const deleteQuiz = (id) => api.delete(`/quizzes/${id}`);

// ✅ Corrected Admin Reports API
export const fetchReports = () => api.get("/reports");
export const createReport = (report) => api.post("/reports", report);
export const updateReport = (id, report) => api.put(`/reports/${id}`, report);
export const deleteReport = (id) => api.delete(`/reports/${id}`);

// User Authentication API
export const registerUser = (userData) => api.post("/users/register", userData);
export const loginUser = (credentials) => api.post("/users/login", credentials);
export const fetchUserProfile = (userId, token) =>
  api.get(`/users/profile/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const updateUser = (userId, updatedUser, token) =>
  api.put(`/users/${userId}`, updatedUser, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const deleteUser = (userId, token) =>
  api.delete(`/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const generateQuiz = async (materialId, content) => {
  const res = await api.post("/quizzes", {
    study_material_id: materialId,
    questions: await callCohereForQuestions(content),
  });
  return res;
};

// 📌 Bookmark a study material
export const bookmarkMaterial = (userId, materialId) =>
  api.post(`/users/bookmark/${materialId}`, { userId });

// ❌ Remove a bookmarked study material
export const unbookmarkMaterial = (userId, materialId) =>
  api.post(`/users/unbookmark/${materialId}`, { userId });

export const fetchQuizByMaterialId = async (materialId) => {
  try {
    const response = await api.get(`/quizzes?study_material_id=${materialId}`);
    return response.data;
  } catch (err) {
    if (err.response?.status === 404) {
      // ❌ Don't log 404 as an error — it's just "not found"
      return null;
    }
    console.error("Unexpected error fetching quiz:", err); // ✅ Only log unexpected errors
    throw err;
  }
};

export const callCohereForQuestions = async (content) => {
  try {
    const response = await api.post("/quizzes/generate-quiz", { content });

    const text = response.data.generations?.[0]?.text;
    if (!text) throw new Error("Invalid Cohere response from backend.");
    console.log("🔍 Raw Cohere Output:\n", text);

    const lines = text
      .split(/\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    const questions = [];
    let currentQuestion = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Start of a new question, grab the question text from the numbered line
      if (/^\d+\./.test(line)) {
        if (
          currentQuestion &&
          currentQuestion.question_text &&
          currentQuestion.options.length
        ) {
          questions.push(currentQuestion);
        }
        currentQuestion = {
          question_text: line.replace(/^\d+\.\s*/, ""), // grab question after number
          options: [],
          correct_answer: "",
        };
      } else if (/^[a-d][.)]/i.test(line)) {
        // Handle options like a) 2
        currentQuestion?.options.push(line);
      } else if (/^answer:/i.test(line)) {
        const answerText = line.replace(/^answer:\s*/i, "").trim();
        if (currentQuestion && answerText) {
          currentQuestion.correct_answer = answerText;
        } else {
          console.warn(
            "⚠️ Answer line skipped (missing question or empty):",
            line
          );
        }
      }
    }

    // Push the last question
    if (
      currentQuestion &&
      currentQuestion.question_text &&
      currentQuestion.options.length &&
      currentQuestion.correct_answer
    ) {
      questions.push(currentQuestion);
    }

    if (questions.length === 0)
      throw new Error("⚠️ No valid questions parsed from Cohere.");

    return questions;
  } catch (error) {
    console.error("Cohere API Error:", error);
    throw error;
  }
};
