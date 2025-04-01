// src/pages/StudyMaterials.jsx

import React, { useEffect, useState } from "react";
import {
  fetchStudyMaterials,
  createStudyMaterial,
  deleteStudyMaterial,
} from "../services/api";
import { useNavigate } from "react-router-dom";
import "./StudyMaterials.css";

const StudyMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [newMaterial, setNewMaterial] = useState({ title: "", content: "" });
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const loadMaterials = async () => {
    try {
      const res = await fetchStudyMaterials();
      setMaterials(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadMaterials();
  }, []);

  const handleChange = (e) => {
    setNewMaterial({ ...newMaterial, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    if (!token) {
      setError("Please log in to add study materials.");
      return;
    }
    try {
      await createStudyMaterial(newMaterial);
      setNewMaterial({ title: "", content: "" });
      setError("");
      loadMaterials();
    } catch (err) {
      console.error(err);
      setError("Failed to create material.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteStudyMaterial(id);
      loadMaterials();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="study-materials-page">
      <h1>📚 Study Materials</h1>

      {token ? (
        <div className="add-material-form">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newMaterial.title}
            onChange={handleChange}
          />
          <textarea
            name="content"
            placeholder="Content"
            value={newMaterial.content}
            onChange={handleChange}
          ></textarea>
          <button onClick={handleCreate}>➕ Add Material</button>
        </div>
      ) : (
        <p className="auth-msg">
          🔐 Please <a onClick={() => navigate("/login")}>log in</a> to add or
          manage materials.
        </p>
      )}

      {error && <p className="error">{error}</p>}

      <div className="material-list">
        {materials.map((m) => (
          <div className="material-card" key={m._id}>
            <h3>{m.title}</h3>
            <p>{m.content}</p>
            {token && (
              <button onClick={() => handleDelete(m._id)}>🗑 Delete</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyMaterials;
