const { body } = require("express-validator");

const registerRules = [
    body('name')
        .trim()
        .isLength({ min: 2 })
        .withMessage("Name must be at least 2 characters"),

    body('email')
        .trim()
        .isEmail()
        .withMessage("Valid email is required"),

    body('username')
        .trim()
        .matches(/^[a-zA-Z0-9_]{3,20}$/)
        .withMessage("username must be 3-20 alphanumeric characters"),

    body('password')
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),
];

module.exports = { registerRules }