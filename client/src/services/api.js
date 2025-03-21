import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5001/api" });

export const fetchStudyMaterials = () => API.get("/studyMaterials");
export const createStudyMaterial = (newMaterial) => API.post("/studyMaterials", newMaterial);
export const updateStudyMaterial = (id, updatedMaterial) => API.put(`/studyMaterials/${id}`, updatedMaterial);
export const deleteStudyMaterial = (id) => API.delete(`/studyMaterials/${id}`);

// Quizzes API
export const fetchQuizzes = () => API.get("/quizzes");
export const createQuiz = (quiz) => API.post("/quizzes", quiz);

// Admin Reports API
export const fetchReports = () => API.get("/reports");
export const createReport = (report) => API.post("/reports", report);
export const updateReport = (id, report) => API.put(`/reports/${id}`, report);
export const deleteReport = (id) => API.delete(`/reports/${id}`);
