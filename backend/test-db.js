const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

if (process.env.MONGODB_URI)
  console.log("Environment variables loaded successfully!");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connection successful!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  });
