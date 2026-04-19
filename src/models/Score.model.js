const { Schema, model } = require("mongoose");

const scoreSchema = new Schema({
    score: {
        required: true,
        type: Number,
        min: ['0', "Score cannot be negative"],
    },
    type: {
        required: true,
        trim: true,
        type: String,
        lowercase: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true,
        index: true,
    }
})

module.exports = model("ScoreModel", scoreSchema)
