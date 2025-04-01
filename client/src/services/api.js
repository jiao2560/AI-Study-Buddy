import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5001/api" });

export const fetchStudyMaterials = () => API.get("/studyMaterials");
export const createStudyMaterial = (newMaterial) =>
  API.post("/studyMaterials", newMaterial);
export const updateStudyMaterial = (id, updatedMaterial) =>
  API.put(`/studyMaterials/${id}`, updatedMaterial);
export const deleteStudyMaterial = (id) => API.delete(`/studyMaterials/${id}`);
export const fetchStudyMaterialById = (id) =>
  API.get(`/studyMaterials/${id}`);

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
