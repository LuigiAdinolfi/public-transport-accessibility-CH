"use server";

import mongoose from "mongoose";

const connection = {
  isConnected: 0,
};

/**
 * Establishes a connection to the MongoDB database.
 * This function will use an existing connection if it is already established.
 * If not, it will create a new connection to the database using the provided URI.
 *
 * @throws {Error} Throws an error if the connection to MongoDB fails.
 */
async function connectDB() {
  // Check if there is already an existing connection
  if (connection.isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    // Connect to MongoDB using the connection URI and database name
    const db = await mongoose.connect(
      "mongodb+srv://luigiadinolfi:ip6-mongodb@ip6-cluster.ceqgh9e.mongodb.net/?retryWrites=true&w=majority&appName=ip6-Cluster",
      {
        dbName: "ip6-database",
      },
    );
    // Update connection status
    connection.isConnected = db.connections[0].readyState;
    console.log("Database connected successfully");
  } catch (error) {
    // Log error and throw exception if connection fails
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

export default connectDB;
