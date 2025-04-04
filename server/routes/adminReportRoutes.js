const express = require("express");
const router = express.Router();
const AdminReport = require("../models/AdminReport");
const { verifyToken, isAdmin } = require("../middleware/auth");

// ✅ Create a new report (user can access)
router.post("/", verifyToken, async (req, res) => {
  try {
    const { study_material_id, reason, flagged_by } = req.body;

    if (!study_material_id || !reason || !flagged_by) {
      return res.status(400).json({ error: "All fields required" });
    }

    const existingReports = await AdminReport.countDocuments({
      study_material_id,
      flagged_by,
      status: "pending",
    });
    if (existingReports >= 3) {
      return res.status(429).json({
        error: "Limit reached. You can report this material only up to 3 times.",
      });
    }

    const report = new AdminReport({
      study_material_id,
      reason,
      flagged_by,
      status: "pending",
    });
    const saved = await report.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all reports – Admin only
router.get("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const reports = await AdminReport.find(filter).sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update report status – Admin only
router.put("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const updated = await AdminReport.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Report not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete a report – Admin only
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const deleted = await AdminReport.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Report not found" });
    res.status(200).json({ message: "Report deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
