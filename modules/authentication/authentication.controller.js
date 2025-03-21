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

const login = async (req, res, next) => {
  try {
    const { email = "", password = "" } = req.body;
    if (!email.trim() || !password.trim()) {
      return res.status(400).json({ error: "email and password are required" });
    }
    const emailExists = await userModel.checkEmail(email);
    if (!emailExists) {
      return res.status(400).json({ error: "Email does not exists" });
    }
    const user = await userModel.selectOneUser(email);

    const passwordValid = await comparePassword(password, user.password);
    if (!passwordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    let token = createToken(user);
    return res.status(200).json({ token: token, username: user.username, role: user.role });
  } catch (exception) {
    error(exception);
    next(exception);
  }
};

module.exports = {
  register,
  login,
};
