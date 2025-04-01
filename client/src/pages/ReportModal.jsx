import React from "react";
import "./ReportModal.css";

const ReportModal = ({
  selectedReason,
  setSelectedReason,
  customReason,
  setCustomReason,
  onSubmit,
  onCancel,
  visible = false,
}) => {
  const reportReasons = [
    "Inappropriate content",
    "Incorrect information",
    "Spam or promotional",
    "Plagiarized content",
    "Other",
  ];

  if (!visible) return null;

  const isOther = selectedReason === "Other";

  return (
    <div className="report-form-popup global-popup">
      <h3>🚩 Report Study Material</h3>
      <p>Please select a reason:</p>
      <select
        value={selectedReason}
        onChange={(e) => setSelectedReason(e.target.value)}
      >
        {reportReasons.map((reason, i) => (
          <option key={i} value={reason}>
            {reason}
          </option>
        ))}
      </select>

      {isOther && (
        <textarea
          placeholder="Please explain your reason..."
          value={customReason}
          onChange={(e) => setCustomReason(e.target.value)}
          style={{
            marginTop: "10px",
            width: "100%",
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            resize: "vertical",
          }}
        />
      )}

      <div className="report-buttons">
        <button onClick={onSubmit}>Submit Report</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default ReportModal;
