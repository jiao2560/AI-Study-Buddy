const mongoose = require("mongoose");

const AdminReportSchema = new mongoose.Schema(
  {
    study_material_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudyMaterial",
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    flagged_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "resolved"],
      default: "pending",
    },
    // 可选：附加说明或证据（如截图 URL）
    description: {
      type: String,
    },
    screenshot_url: {
      type: String,
    },
  },
  {
    timestamps: true, // ✅ 自动添加 createdAt 和 updatedAt
  }
);

module.exports = mongoose.model("AdminReport", AdminReportSchema);
