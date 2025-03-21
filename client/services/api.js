import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5001/api" });

export const fetchStudyMaterials = () => API.get("/studyMaterials");
export const createStudyMaterial = (newMaterial) => API.post("/studyMaterials", newMaterial);
export const updateStudyMaterial = (id, updatedMaterial) => API.put(`/studyMaterials/${id}`, updatedMaterial);
export const deleteStudyMaterial = (id) => API.delete(`/studyMaterials/${id}`);
