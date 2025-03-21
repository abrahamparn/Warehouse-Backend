const jwt = require("jsonwebtoken");
const userModel = require("./authentication.model");
const { hashPassword, comparePassword, createToken } = require("../../utils/password");
const { error } = require("../../middleware/logger");

// Controller Function: Register
const register = async (req, res, next) => {
  try {
    const { username = "", password = "", email = "" } = req.body;

    // Check if Username Exists
    const userExists = await userModel.checkUsername(username);
    if (userExists) {
      return res.status(400).json({ error: "username already exists, please choose another one." });
    }

    // Check if email Exists
    const emailExists = await userModel.checkEmail(email);
    if (emailExists) {
      return res.status(400).json({ error: "email already exists, please choose another one." });
    }

    // Hash Password and Create User
    const hashedPassword = await hashPassword(password);
    const newUser = await userModel.createUser(email, username, hashedPassword);
    return res.status(201).json({
      success: true,
      message: "user successfully created",
      username: newUser,
    });
  } catch (exception) {
    error(exception);
    next(exception);
  }
};

module.exports = {
  register,
};
