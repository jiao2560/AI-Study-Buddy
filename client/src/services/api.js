import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5001/api" });

export const fetchStudyMaterials = () => API.get("/studyMaterials");
export const createStudyMaterial = (data) => {
  const token = localStorage.getItem("token");
  return API.post("/studyMaterials", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateStudyMaterial = (id, updatedMaterial) =>
  API.put(`/studyMaterials/${id}`, updatedMaterial);
export const deleteStudyMaterial = (id) => API.delete(`/studyMaterials/${id}`);
export const fetchStudyMaterialById = (id) => API.get(`/studyMaterials/${id}`);

// Quizzes API
export const fetchQuizzes = () => API.get("/quizzes");
export const createQuiz = (quiz) => API.post("/quizzes", quiz);
export const updateQuiz = (id, updatedQuiz) =>
  API.put(`/quizzes/${id}`, updatedQuiz);
export const deleteQuiz = (id) => API.delete(`/quizzes/${id}`);

// Admin Reports API
export const fetchReports = () => API.get("/reports");
export const createReport = (report) => API.post("/reports", report);
export const updateReport = (id, report) => API.put(`/reports/${id}`, report);
export const deleteReport = (id) => API.delete(`/reports/${id}`);

// User Authentication API
export const registerUser = (userData) => API.post("/users/register", userData);
export const loginUser = (credentials) => API.post("/users/login", credentials);
export const fetchUserProfile = (userId, token) =>
  API.get(`/users/profile/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const updateUser = (userId, updatedUser, token) =>
  API.put(`/users/${userId}`, updatedUser, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const deleteUser = (userId, token) =>
  API.delete(`/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const generateQuiz = async (materialId, content) => {
  const res = await API.post("/quizzes", {
    study_material_id: materialId,
    questions: await callCohereForQuestions(content),
  });
  return res;
};

// 📌 Bookmark a study material
export const bookmarkMaterial = (userId, materialId) =>
  API.post(`/users/bookmark/${materialId}`, { userId });

// ❌ Remove a bookmarked study material
export const unbookmarkMaterial = (userId, materialId) =>
  API.post(`/users/unbookmark/${materialId}`, { userId });


export const fetchQuizByMaterialId = async (materialId) => {
  try {
    const response = await API.get(`/quizzes?study_material_id=${materialId}`);
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
    const response = await API.post("/quizzes/generate-quiz", { content });

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
