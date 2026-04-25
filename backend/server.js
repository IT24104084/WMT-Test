// Load environment variables from .env file into process.env
require("dotenv").config();

// Import the Express framework to create the HTTP server and routes
const express = require("express");

// Import Mongoose to connect and interact with MongoDB
const mongoose = require("mongoose");

// Import CORS to allow requests from a different origin (e.g., Netlify frontend)
const cors = require("cors");

// Create an Express application instance
const app = express();

// -------------------- MIDDLEWARES --------------------

// Enable CORS so your frontend (different domain) can call this backend
app.use(cors());

// Parse incoming JSON request bodies and make them available as req.body
app.use(express.json());

// Import user routes (register, login)
const userRoutes = require("./routes/UserRoutes");

// Use the routes under /api prefix
// Example: POST /api/register, POST /api/login
app.use("/api", userRoutes);

// -------------------- DATABASE CONNECTION --------------------

// Connect to MongoDB using the URL stored in the environment variable MONGO_URL
// process.env.MONGO_URL comes from your .env file
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))   // If connection is successful
  .catch(err => console.log(err));                // If connection fails, log the error

// -------------------- TEST ROUTE --------------------

// Simple GET route to check if backend is running
// When you visit http://localhost:5001/ in the browser, you should see this message
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// -------------------- START SERVER --------------------

// Start the server on port 5001
// Now your backend is available at http://localhost:5001
app.listen(5000, () => {
  console.log("Server running on port 5000");
});