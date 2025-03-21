const express = require("express");
const router = express.Router();
const StudyMaterial = require("../models/StudyMaterial");

// Create study material
router.post("/", async (req, res) => {
  try {
    const studyMaterial = new StudyMaterial(req.body);
    await studyMaterial.save();
    res.status(201).json(studyMaterial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read all study materials
router.get("/", async (req, res) => {
  try {
    const studyMaterials = await StudyMaterial.find();
    res.json(studyMaterials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update study material
router.put("/:id", async (req, res) => {
  try {
    const updatedStudyMaterial = await StudyMaterial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStudyMaterial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete study material
router.delete("/:id", async (req, res) => {
  try {
    await StudyMaterial.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
