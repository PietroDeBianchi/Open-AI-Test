// REQUIRES PACKAGE
require('dotenv').config();
const express = require('express');
const colors = require("colors");
// REQUIRES IMPORTS
const openaiRoutes = require('./routes/openaiRoutes');
const connectDB = require("./config/db");

// CONST
const PORT = process.env.PORT || 3000;
const V = process.env.API_VERSION || 'v1';
const PROJECT_NAME = process.env.PROJECT_NAME || 'AI';

// APP
const app = express();
app.use(express.json());

// ROUTES
app.use(`/api/${V}`, openaiRoutes);

// START
const logStartupMessage = async () => {
    console.log("=".repeat(50).blue);
    console.log(`🚀 Project: ${PROJECT_NAME}`.green);
    console.log(`🌐 Server running on port: ${PORT}`.green);
    try {
        await connectDB(); // Connect to MongoDB
    } catch (err) {
        console.error("❌ MongoDB connection failed".red);
    }
    console.log("=".repeat(50).blue);
};

// Start the server
app.listen(PORT, () => {
    logStartupMessage();
});