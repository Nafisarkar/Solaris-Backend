require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `🚀 Database connected: ${db.connection.db.databaseName}@${db.connection.host}:${db.connection.port}`
    );
  } catch (error) {
    console.log({
      message: "Database connection error",
      error,
    });
  }
};

module.exports = connectDB;
