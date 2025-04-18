import React, { useEffect, useState } from "react";
import {
  fetchStudyMaterials,
  createStudyMaterial,
  deleteStudyMaterial,
  bookmarkMaterial,
  unbookmarkMaterial,
  fetchUserProfile,
} from "../services/api";
import { useNavigate } from "react-router-dom";
import "./StudyMaterials.css";
import ReportModal from "./ReportModal";

const StudyMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [newMaterial, setNewMaterial] = useState({ title: "", content: "" });
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [reportingId, setReportingId] = useState(null);
  const [showReportForm, setShowReportForm] = useState(false);
  const [userRole, setUserRole] = useState("");

  const token = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const loadMaterials = async () => {
    try {
      const res = await fetchStudyMaterials();
      setMaterials(res.data);

      if (currentUserId && token) {
        const userRes = await fetchUserProfile(currentUserId, token);
        setBookmarks(userRes.data.bookmarks || []);
        setUserRole(userRes.data.role);
      }
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
      setShowForm(false);
      loadMaterials();
    } catch (err) {
      console.error(err);
      setError("Failed to create material.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this study material?"
    );
    if (!confirmDelete) return;

    try {
      await deleteStudyMaterial(id);
      loadMaterials();
    } catch (err) {
      console.error(err);
    }
  };

  const handleBookmark = async (materialId) => {
    try {
      await bookmarkMaterial(currentUserId, materialId);
      setBookmarks((prev) => [...prev, materialId]);
    } catch (err) {
      console.error("Bookmark failed", err);
    }
  };

  const handleUnbookmark = async (materialId) => {
    try {
      await unbookmarkMaterial(currentUserId, materialId);
      setBookmarks((prev) => prev.filter((id) => id !== materialId));
    } catch (err) {
      console.error("Unbookmark failed", err);
    }
  };

  return (
    <div className="study-materials-page">
      <h1>📚 Study Materials</h1>

      {token && userRole !== "admin" ? (
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
              />
              <button onClick={handleCreate}>✅ Submit</button>
            </div>
          )}
        </>
      ) : token ? (
        <p className="auth-msg">⚠️ Admins cannot create new materials.</p>
      ) : (
        <p className="auth-msg">
          🔐 Please <a onClick={() => navigate("/login")}>log in</a> to add or
          manage materials.
        </p>
      )}

      {error && <p className="error">{error}</p>}

      <div className="material-list">
        {materials.map((m) => {
          const isAdmin = userRole === "admin";
          const isOwner = currentUserId && m.user_id === currentUserId;
          const canEdit = isOwner || isAdmin;

          const isBookmarked = bookmarks.includes(m._id);

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

                {token && !canEdit && (
                  <>
                    <button
                      onClick={() => {
                        setReportingId(m._id);
                        setShowReportForm(true);
                      }}
                    >
                      🚩 Report
                    </button>

                    <button
                      onClick={() =>
                        isBookmarked
                          ? handleUnbookmark(m._id)
                          : handleBookmark(m._id)
                      }
                    >
                      {isBookmarked ? "❌ Unbookmark" : "📌 Bookmark"}
                    </button>
                  </>
                )}

                {token && canEdit && (
                  <>
                    <button
                      onClick={() => navigate(`/study-materials/${m._id}/edit`)}
                    >
                      ✏️ Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(m._id)}>
                      🗑 Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <ReportModal
        visible={showReportForm}
        studyMaterialId={reportingId}
        onClose={() => {
          setShowReportForm(false);
          setReportingId(null);
        }}
      />
    </div>
  );
};

export default StudyMaterials;
