const mongoose = require("mongoose");

const adminReportSchema = new mongoose.Schema({
  study_material_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StudyMaterial",
    required: true,
  },
  reason: { type: String, required: true },
  flagged_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: { type: String, enum: ["pending", "resolved"], default: "pending" },
});

module.exports = mongoose.model("AdminReport", adminReportSchema);
