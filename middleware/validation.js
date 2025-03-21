const { param, query, body, validationResult } = require("express-validator");
const moment = require("moment");

const validateRegistration = [
  body("email").isEmail().withMessage("Please enter a valid email address").normalizeEmail(),
  body("username").isLength({ min: 6 }).withMessage("Username must be at least 6 characters"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateRegistration,
};
