const mongoose = require("mongoose");

const AdminReportSchema = new mongoose.Schema({
  study_material_id: { type: mongoose.Schema.Types.ObjectId, ref: "StudyMaterial" },
  reason: { type: String, required: true },
  flagged_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["pending", "resolved"], default: "pending" },
});

module.exports = mongoose.model("AdminReport", AdminReportSchema);
