const validate = require("../middleware/validate.middleware")
const { registerRules } = require("./rules/auth.rules")
const { scoreRules } = require("./rules/score.rules")


module.exports = {
    registerValidation: [registerRules, validate],
    scoreValidation: [scoreRules, validate]
}