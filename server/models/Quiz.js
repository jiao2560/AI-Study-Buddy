const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  study_material_id: { type: mongoose.Schema.Types.ObjectId, ref: "StudyMaterial" },
  questions: [
    {
      question_text: String,
      options: [String],
      correct_answer: String,
    },
  ],
});

module.exports = mongoose.model("Quiz", QuizSchema);
