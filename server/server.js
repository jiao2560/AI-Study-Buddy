const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://ai-study-buddy-4.onrender.com"
  ],
  credentials: true
}));

app.use(express.json());

// routes (NO DUPLICATION)
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/studyMaterials", require("./routes/studyMaterialRoutes"));
app.use("/api/quizzes", require("./routes/quizRoutes"));
app.use("/api/reports", require("./routes/adminReportRoutes"));
app.use("/api/public", require("./routes/publicDataRoutes"));

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
