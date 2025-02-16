const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require('path');
const convertCsvToJsonAndImport = require('../utils/csvParser');

// Load environment variables from .env file
dotenv.config();
// create path
const CSV_FILE_PATH = path.join(__dirname, '..', 'data', 'TMDB_movie_dataset_v11.csv'); // Percorso al file CSV

// Async function to connect to MongoDB
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {});

    // Log a success message with the host information
    console.log(`✅ MongoDB connected: ${connection.connection.host}`.green);
    // Access the current database instance
    const db = mongoose.connection.db;
  } catch (err) {
    console.error("Moviebase connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;