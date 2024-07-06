import jwt from "jsonwebtoken"; // Importing the jsonwebtoken library

// Function to create a JSON Web Token
const createToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: "1d" }); // Signing the token with data and secret key, setting it to expire in 1 day
};

// Function to verify a JSON Web Token
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY); // Verifying the token using the secret key
};

export { createToken, verifyToken }; // Exporting the createToken and verifyToken functions
