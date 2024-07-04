import User from "../model/user.model.js";
import { createToken } from "../utils/jwt.js";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    return res.status(201).send({ message: "User created successfully" });
  } catch (err) {
    return res.status(500).send({ message: "Error registering User" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Invalid credentials" });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid credentials" });
    }
    const token = createToken({ id: user._id });

    res.cookie("authToken", token, {
      path: "/",
      expires: new Date(Date.now() + 3600000),
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });

    return res
      .status(200)
      .send({ message: "user logging in successfully", token });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Error logging in User", err: err.message });
  }
};

const logout = async (req, res) => {
  res.clearCookie("authToken");
  return res.status(200).send({ message: "User logged out successfully" });
};

const deleteUser = async (req, res) => {
  try {
    console.log(req.user);
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error in deleting user", error: error.message });
  }
};

export { register, login, logout, deleteUser };
