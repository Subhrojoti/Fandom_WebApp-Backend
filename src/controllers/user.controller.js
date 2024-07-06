import User from "../model/user.model.js"; // Importing the User model
import { createToken } from "../utils/jwt.js"; // Importing the createToken function

// Register a new user
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body; // Extracting name, email, and password from the request body
    const user = await User.create({ name, email, password }); // Creating a new user
    return res.status(201).send({ message: "User created successfully" }); // Sending success response
  } catch (err) {
    return res.status(500).send({ message: "Error registering User" }); // Sending error response
  }
};

// Login an existing user
const login = async (req, res) => {
  try {
    const { email, password } = req.body; // Extracting email and password from the request body
    const user = await User.findOne({ email }); // Finding user by email
    if (!user) {
      return res.status(400).send({ message: "Invalid credentials" }); // Sending error response if user not found
    }
    const isMatch = await user.matchPassword(password); // Matching the password
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid credentials" }); // Sending error response if password does not match
    }
    const token = createToken({ id: user._id }); // Creating a token

    // Setting the token as a cookie
    res.cookie("authToken", token, {
      path: "/",
      expires: new Date(Date.now() + 3600000), // Setting the expiration time to 1 hour
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });

    return res
      .status(200)
      .send({ message: "user logging in successfully", token }); // Sending success response with token
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Error logging in User", err: err.message }); // Sending error response
  }
};

// Logout the user
const logout = async (req, res) => {
  res.clearCookie("authToken"); // Clearing the authToken cookie
  return res.status(200).send({ message: "User logged out successfully" }); // Sending success response
};

// Delete an existing user
const deleteUser = async (req, res) => {
  try {
    console.log(req.user); // Logging the user information
    const { id } = req.params; // Extracting user id from request parameters
    const user = await User.findByIdAndDelete(id); // Deleting the user by id
    if (!user) {
      return res.status(404).send({ message: "User not found" }); // Sending error response if user not found
    }
    return res.status(200).send({ message: "User deleted successfully" }); // Sending success response
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error in deleting user", error: error.message }); // Sending error response
  }
};

export { register, login, logout, deleteUser }; // Exporting the functions
