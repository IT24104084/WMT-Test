// Import the User model so we can interact with the database
const User = require("../model/User");

// ---------------------- REGISTER CONTROLLER ----------------------
// This function runs when the user sends POST /api/register
exports.register = async (req, res) => {

    // Extract data sent from frontend (name, email, password)
    const { name, email, password } = req.body;

     //  Backend validation for empty fields
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

    try {
        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            // If email already exists, return an error message
            return res.status(400).json({ message: "Email already registered" });
        }

        // Create a new user object using the User model
        const newUser = new User({
            name,
            email,
            password
        });

        // Save the new user to MongoDB
        await newUser.save();

        // Send success response
        res.json({ message: "User registered successfully" });

    } catch (error) {
        // If something goes wrong, send error message
        res.status(500).json({ message: "Server error", error });
    }
};

// ---------------------- LOGIN CONTROLLER ----------------------
// This function runs when the user sends POST /api/login
exports.login = async (req, res) => {

    // Extract email and password from frontend
    const { email, password } = req.body;

     // Backend validation for empty fields
  if ( !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

    try {
        // Check if a user exists with this email + password
        const user = await User.findOne({ email, password });

        if (!user) {
            // If no match found, login fails
            return res.status(400).json({ message: "Invalid email or password,please register and try again" });
        }

        // If user exists, login successful
        res.json({ message: "Login successful" });

    } catch (error) {
        // If something goes wrong, send error message
        res.status(500).json({ message: "Server error", error });
    }
};