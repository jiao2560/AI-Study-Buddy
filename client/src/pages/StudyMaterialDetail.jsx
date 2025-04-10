import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchStudyMaterialById,
  bookmarkMaterial,
  unbookmarkMaterial,
  fetchUserProfile,
} from "../services/api";
import ReportModal from "./ReportModal";
import QuizSection from "./QuizSection";
import "./StudyMaterialDetail.css";

const StudyMaterialDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [material, setMaterial] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userRole, setUserRole] = useState("");

  const token = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("userId");
  const isLoggedIn = !!token;
  const isOwner = isLoggedIn && material?.user_id === currentUserId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchStudyMaterialById(id);
        setMaterial(res.data);

        if (currentUserId) {
          const profileRes = await fetchUserProfile(currentUserId, token);
          const bookmarks = profileRes.data.bookmarks || [];
          setIsBookmarked(bookmarks.includes(res.data._id));
          setUserRole(profileRes.data.role); // ✅ add this line
        }
      } catch (err) {
        console.error("Failed to fetch material or profile", err);
      }
    };

    fetchData();
  }, [id, currentUserId, token]);

  const handleBookmarkToggle = async () => {
    try {
      if (isBookmarked) {
        await unbookmarkMaterial(currentUserId, id);
        setIsBookmarked(false);
      } else {
        await bookmarkMaterial(currentUserId, id);
        setIsBookmarked(true);
      }
    } catch (err) {
      console.error("Bookmark toggle failed", err);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this study material?"
    );
    if (!confirmDelete) return;

    try {
      await fetch(`/api/study-materials/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/study-materials");
    } catch (err) {
      console.error("Failed to delete material", err);
    }
  };

  if (!material) return <p>Loading...</p>;

  return (
    <div className="study-detail-wrapper">
      <div className="study-detail-card">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h1>{material.title}</h1>
        <p>{material.content}</p>

        {isLoggedIn && (
          <div className="action-buttons">
            {isOwner || userRole === "admin" ? (
              <>
                <button
                  className="edit-btn"
                  onClick={() => navigate(`/study-materials/${id}/edit`)}
                >
                  ✏️ Edit Material
                </button>
                <button className="delete-btn" onClick={handleDelete}>
                  🗑 Delete
                </button>
              </>
            ) : (
              <>
                <button className="bookmark-btn" onClick={handleBookmarkToggle}>
                  {isBookmarked ? "➖ Unbookmark" : "➕ Bookmark"}
                </button>

                <button
                  className="report-btn"
                  onClick={() => setShowReport(true)}
                >
                  🚩 Report Invalid Content
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <QuizSection
        studyMaterialId={id}
        content={material.content}
        isOwner={isOwner}
        token={token}
      />

      {showReport && (
        <ReportModal
          visible={showReport}
          studyMaterialId={id}
          onClose={() => setShowReport(false)}
        />
      )}
    </div>
  );
};

export default StudyMaterialDetail;
