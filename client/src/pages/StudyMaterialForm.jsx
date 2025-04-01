import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createStudyMaterial,
  fetchStudyMaterialById,
  updateStudyMaterial,
} from "../services/api";
import "./StudyMaterialForm.css";

const StudyMaterialForm = () => {
  const { id } = useParams(); // for editing
  const [form, setForm] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchStudyMaterialById(id).then((res) => {
        setForm({ title: res.data.title, content: res.data.content });
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateStudyMaterial(id, form);
    } else {
      await createStudyMaterial(form);
    }
    navigate(`/study-materials/${id || ""}`); // Redirect to the material detail page after submit
  };

  return (
    <div className="material-form">
      <button className="back-btn" onClick={() => navigate("/study-materials")}>
        ← Back to Materials
      </button>

      <h2>{id ? "Edit" : "Add New"} Study Material</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Enter title"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="Enter content"
            required
          />
        </div>

        <button type="submit">{id ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default StudyMaterialForm;
