import React, { useState, useEffect } from "react";
import { createReport } from "../services/api";
import "./ReportModal.css";

const ReportModal = ({ visible, studyMaterialId, onClose }) => {
  const [reason, setReason] = useState("Inappropriate content");
  const [customReason, setCustomReason] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (visible) {
      setReason("Inappropriate content");
      setCustomReason("");
    }
  }, [visible]);

  const handleSubmit = async () => {
    const finalReason = reason === "Other" ? customReason : reason;
    if (!finalReason.trim()) {
      alert("Please provide a reason before submitting.");
      return;
    }

    try {
      await createReport({
        study_material_id: studyMaterialId,
        reason: finalReason,
        flagged_by: userId,
      });
      alert("✅ Report submitted!");
      onClose();
    } catch (err) {
      console.error("Report failed:", err);
      if (err.response?.status === 429) {
        alert(
          "⚠️ You cannot submitted more than 3 reports for this material. Admin is working on it."
        );
        onClose();
      } else {
        alert("❌ Failed to report.");
      }
    }
  };

  if (!visible) return null;

  return (
    <div className="report-modal">
      <div className="report-modal-content">
        <h3>🚩 Report Study Material</h3>
        <label>Select a reason:</label>
        <select value={reason} onChange={(e) => setReason(e.target.value)}>
          <option>Inappropriate content</option>
          <option>Incorrect information</option>
          <option>Spam or promotional</option>
          <option>Plagiarized content</option>
          <option>Other</option>
        </select>

        {reason === "Other" && (
          <textarea
            placeholder="Enter custom reason"
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
          />
        )}

        <div className="modal-buttons">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
