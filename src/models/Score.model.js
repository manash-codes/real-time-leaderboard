const { Schema, model } = require("mongoose");

const scoreSchema = new Schema({
    score: {
        required: true,
        type: Number
    },
    type: {
        required: true,
        type: String,
        default: 'game'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel'
    }
})

module.exports = model("ScoreModel", scoreSchema)
