const User = require("../models/user");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
        error: true,
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      return res.status(200).json({
        message: "User Registered Successfully",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        success: true,
      });
    } else {
      return res.status(400).json({
        message: "Invalid user data",
        error: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      return res.status(200).json({
        message: "User logged in successfully",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        },
        success: true,
      });
    } else {
      return res.status(401).json({
        message: "Invalid email or password",
        error: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Some error occurred",
      error: true,
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      return res.status(200).json({
        message: "User profile fetched successfully",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        success: true,
      });
    } else {
      return res.status(404).json({
        message: "User not found",
        error: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Some error occurred",
      error: true,
    });
  }
};

module.exports = { registerUser, authUser, getUserProfile };
