import User from "../model/user.model.js"; // Importing the User model
import { verifyToken } from "../utils/jwt.js"; // Importing the verifyToken function

// Middleware for user authentication
const authentication = async (req, res, next) => {
  try {
    const token = req.cookies.authToken; // Getting the authToken from cookies
    if (!token) {
      return res.status(401).send({ message: "Unauthorized" }); // Sending error response if token is not found
    }
    const decoded = verifyToken(token); // Verifying the token
    const user = await User.findById(decoded.id); // Finding the user by the id from the decoded token
    req.user = user; // Assigning the user to the request object
    next(); // Proceeding to the next middleware or route handler
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error in authorizing the user", error: error.message }); // Sending error response
  }
};

export { authentication }; // Exporting the authentication middleware
