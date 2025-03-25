const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({
  origin: [
    "http://localhost:5173",               // your dev frontend
    "https://ai-study-buddy-4.onrender.com"       // your production site (e.g., Vercel, Netlify, etc.)
  ],
  credentials: true
}));

app.use(express.json());
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);
const studyMaterialRoutes = require("./routes/studyMaterialRoutes");
app.use("/api/studyMaterials", studyMaterialRoutes);
const quizRoutes = require("./routes/quizRoutes");
app.use("/api/quizzes", quizRoutes);
const adminReportRoutes = require("./routes/adminReportRoutes");
app.use("/api/reports", adminReportRoutes);

const publicDataRoutes = require("./routes/publicDataRoutes");
app.use("/api/public", publicDataRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => res.send("API is running"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
