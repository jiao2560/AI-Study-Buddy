const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  study_material_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StudyMaterial",
    required: true,
  },
  questions: [
    {
      question_text: { type: String, required: true },
      options: [{ type: String }],
      correct_answer: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("Quiz", quizSchema);
