// Import mongoose so we can create a schema and interact with MongoDB
const mongoose = require("mongoose");

// Create a Schema (structure) for the User collection
// A Schema defines what fields a user must have
const UserSchema = new mongoose.Schema({

  // User's full name
  name: {
    type: String,        // Data type
    required: true       // Must be provided
  },
  // User's email address
  email: {
    type: String,
    required: true,
    unique: true         // No two users can have the same email
  },

  // User's password
  password: {
    type: String,
    required: true
  }
});

// Export the model so controllers can use it to create/find users
// "User" = collection name (MongoDB will create "users" collection)
module.exports = mongoose.model("User", UserSchema);