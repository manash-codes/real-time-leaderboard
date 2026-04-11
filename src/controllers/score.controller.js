const ScoreModel = require("../models/Score.model")

const getScore = async (req, res) => {
    try {
        const id = req.user._id
        const score = await ScoreModel.find({ user: id })
        res.json({ success: true, message: "Score found successfully", score: score })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const addScore = async (req, res) => {
    try {
        const id = req.user._id
        const { score, type } = req.body
        const newScore = new ScoreModel({ score, type, user: id })
        await newScore.save()
        res.json({ success: true, message: "Score Added successfully", scores: newScore })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

module.exports = {
    getScore,
    addScore
}
