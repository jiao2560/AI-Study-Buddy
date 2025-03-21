const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
const studyMaterialRoutes = require("./routes/studyMaterialRoutes");
app.use("/api/studyMaterials", studyMaterialRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.get("/", (req, res) => res.send("API is running"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Ensure `MONGO_URI` is loaded
// const mongoURI = process.env.MONGO_URI;
// if (!mongoURI) {
//   console.error("❌ MONGO_URI is missing in .env file!");
//   process.exit(1);
// }

// // Connect to MongoDB
// mongoose
//   .connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 10000, // Timeout if MongoDB is not reachable
//   })
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err);
//     process.exit(1);
//   });

// app.get("/", (req, res) => res.send("API is running"));

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
