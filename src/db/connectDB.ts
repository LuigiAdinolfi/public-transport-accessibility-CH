"use server";

import mongoose from "mongoose";

const connection = {
  isConnected: 0,
};

async function connectDB() {
  if (connection.isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: "ip6-database",
    });
    connection.isConnected = db.connections[0].readyState;
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

export default connectDB;
