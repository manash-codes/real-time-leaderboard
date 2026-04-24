const { body } = require("express-validator");

const scoreRules = [
    body("score")
        .notEmpty().withMessage("Score is required")
        .isFloat({ min: 0 }).withMessage("Score must be a non-negative number")
        .toFloat(),

    body("type")
        .notEmpty().withMessage("Type is required")
        .isString()
        .trim()
        .toLowerCase(),
]

module.exports = { scoreRules }