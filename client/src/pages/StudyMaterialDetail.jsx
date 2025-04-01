import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchStudyMaterialById } from "../services/api";
import ReportModal from "./ReportModal"; // 👈 Import the reusable modal
import "./StudyMaterialDetail.css";

const StudyMaterialDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [material, setMaterial] = useState(null);
  const [showReport, setShowReport] = useState(false); // 👈 State to toggle modal

  const token = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("userId");

  const isLoggedIn = !!token;

  useEffect(() => {
    fetchStudyMaterialById(id)
      .then((res) => setMaterial(res.data))
      .catch((err) => console.error("Failed to fetch material", err));
  }, [id]);

  if (!material) return <p>Loading...</p>;

  const isOwner = isLoggedIn && material.user_id === currentUserId;

  return (
    <>
      <div className="study-detail-page">
        <button
          className="back-btn"
          onClick={() => navigate("/study-materials")}
        >
          ← Back to Materials
        </button>

        <h1>{material.title}</h1>
        <p>{material.content}</p>

        {isLoggedIn && (
          <div className="action-buttons">
            {isOwner ? (
              <button
                className="edit-btn"
                onClick={() => navigate(`/study-materials/${id}/edit`)}
              >
                ✏️ Edit Material
              </button>
            ) : (
              <button
                className="report-btn"
                onClick={() => setShowReport(true)}
              >
                🚩 Report Invalid Content
              </button>
            )}
          </div>
        )}
      </div>

      {/* move this OUTSIDE the study-detail-page */}
      {showReport && (
        <ReportModal
          visible={showReport} // <-- ADD THIS
          studyMaterialId={id}
          onClose={() => setShowReport(false)}
        />
      )}
    </>
  );
};

export default StudyMaterialDetail;
