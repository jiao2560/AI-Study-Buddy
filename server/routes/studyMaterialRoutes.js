const express = require("express");
const router = express.Router();
const StudyMaterial = require("../models/StudyMaterial");
const authenticate = require("../middleware/authenticate");
const AdminReport = require("../models/AdminReport");
const Quiz = require("../models/Quiz"); 

// Create study material
router.post("/", authenticate, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }
    console.log("Creating new material for user:", req.user?._id);

    const newMaterial = new StudyMaterial({
      title,
      content,
      user_id: req.user._id, // ✅ now this works
    });
    const saved = await newMaterial.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
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

// Get a single study material by ID
router.get("/:id", async (req, res) => {
  try {
    const material = await StudyMaterial.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ error: "Study material not found" });
    }
    res.json(material);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update study material
router.put("/:id", async (req, res) => {
  try {
    const updated = await StudyMaterial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete study material
router.delete("/:id", async (req, res) => {
  try {
    const deletedMaterial = await StudyMaterial.findByIdAndDelete(req.params.id);
    if (!deletedMaterial) {
      return res.status(404).json({ error: "Study material not found" });
    }

    // ✅ Clean up related data
    await AdminReport.deleteMany({ study_material_id: req.params.id });
    await Quiz.deleteOne({ study_material_id: req.params.id });

    res.status(200).json({ message: "Study material, report(s), and quiz deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
