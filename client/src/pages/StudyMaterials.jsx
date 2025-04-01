import React, { useEffect, useState } from "react";
import {
  fetchStudyMaterials,
  createStudyMaterial,
  deleteStudyMaterial,
  createReport,
} from "../services/api";
import { useNavigate } from "react-router-dom";
import "./StudyMaterials.css";

const StudyMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [newMaterial, setNewMaterial] = useState({ title: "", content: "" });
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const token = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("userId"); // 👈 get current user ID
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
      setShowForm(false); // 👈 hide form after adding
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

  // Inside the component:
  const handleReport = async (materialId) => {
    try {
      await createReport({
        study_material_id: materialId,
        reason: "Inappropriate or incorrect content",
        flagged_by: currentUserId,
      });
      alert("🚩 Report submitted successfully!");
    } catch (err) {
      console.error("Failed to report material", err);
      alert("❌ Failed to submit report.");
    }
  };

  return (
    <div className="study-materials-page">
      <h1>📚 Study Materials</h1>

      {token ? (
        <>
          <button
            className="toggle-form-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "➖ Cancel" : "➕ Add New Material"}
          </button>

          {showForm && (
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
              <button onClick={handleCreate}>✅ Submit</button>
            </div>
          )}
        </>
      ) : (
        <p className="auth-msg">
          🔐 Please <a onClick={() => navigate("/login")}>log in</a> to add or
          manage materials.
        </p>
      )}

      {error && <p className="error">{error}</p>}

      <div className="material-list">
        {materials.map((m) => {
          const isOwner = currentUserId && m.user_id === currentUserId;
          return (
            <div className="material-card" key={m._id}>
              <h3>{m.title}</h3>
              <p>
                {m.content.length > 225 ? (
                  <>
                    {m.content.slice(0, 225)}...{" "}
                    <span
                      className="read-more"
                      onClick={() => navigate(`/study-materials/${m._id}`)}
                    >
                      Read more
                    </span>
                  </>
                ) : (
                  m.content
                )}
              </p>

              <div className="card-actions">
                <button onClick={() => navigate(`/study-materials/${m._id}`)}>
                  👁 View
                </button>

                {token && !isOwner && (
                  <button onClick={() => handleReport(m._id)}>🚩 Report</button>
                )}

                {token && isOwner && (
                  <>
                    <button
                      onClick={() => navigate(`/study-materials/${m._id}/edit`)}
                    >
                      ✏️ Edit
                    </button>
                    <button onClick={() => handleDelete(m._id)}>
                      🗑 Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudyMaterials;
