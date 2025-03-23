const express = require("express");
const router = express.Router();
const AdminReport = require("../models/AdminReport");

// Create a new report
router.post("/", async (req, res) => {
  try {
    const report = new AdminReport(req.body);
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all reports
router.get("/", async (req, res) => {
  try {
    const reports = await AdminReport.find();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update report status
router.put("/:id", async (req, res) => {
  try {
    const updatedReport = await AdminReport.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedReport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a report
router.delete("/:id", async (req, res) => {
  try {
    await AdminReport.findByIdAndDelete(req.params.id);
    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
