require("dotenv").config(); // Load environment variables
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI; // Get MongoDB URI from .env
const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas successfully!");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
}

module.exports = { client, connectDB };
