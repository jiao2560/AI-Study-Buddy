import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchStudyMaterialById } from "../services/api";
import "./StudyMaterialDetail.css";

const StudyMaterialDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [material, setMaterial] = useState(null);

  useEffect(() => {
    fetchStudyMaterialById(id)
      .then((res) => setMaterial(res.data))
      .catch((err) => console.error("Failed to fetch material", err));
  }, [id]);

  if (!material) return <p>Loading...</p>;

  return (
    <div className="study-detail-page">
      <button className="back-btn" onClick={() => navigate("/study-materials")}>
        ← Back to Materials
      </button>

      <h1>{material.title}</h1>
      <p>{material.content}</p>
      {/* Edit Button */}
      <button
        className="edit-btn"
        onClick={() => navigate(`/study-materials/${id}/edit`)}
      >
        ✏️ Edit Material
      </button>
    </div>
  );
};

export default StudyMaterialDetail;
