require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// For Vercel serverless functions, we need to handle connections differently
let cachedDb = null;

const connectToDatabase = async () => {
  if (cachedDb) {
    return cachedDb;
  }

  const db = await mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
  });

  console.log(`🚀 Connected to MongoDB: ${db.connection.name}`);
  cachedDb = db;
  return db;
};

// Connect to DB immediately for serverless environment
if (process.env.NODE_ENV === "production") {
  connectToDatabase().catch((err) =>
    console.error("MongoDB connection error:", err.message)
  );
}

// Only start the server if we're not in a serverless environment
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, async () => {
    console.log(`🎯 Server started on port http://localhost:${PORT}`);
    await connectToDatabase();
  });
}

// For serverless environment, export the handler
module.exports = app;

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  // In serverless we don't want to exit the process
  if (process.env.NODE_ENV !== "production") {
    process.exit(1);
  }
});
