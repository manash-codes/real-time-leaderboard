const ScoreModel = require("../models/Score.model")
const { addScoreRedis, getTopUsers } = require("../redis/score.redis");
const { broadcastLeaderboard } = require("../websocket");

const getScore = async (req, res) => {
    try {
        const { type, page = 1, limit = 20 } = req.query;
        const query = { user: req.user._id }

        if (query) query.type = type
        const skip = (Number(page - 1) * Number(limit))

        const [scores, total] = await Promise.all([
            ScoreModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
            ScoreModel.countDocuments(query),
        ])
        res.json({ success: true, message: "Score found successfully", scores, pagination: { page: Number(page), limit: Number(limit), total } })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const addScore = async (req, res) => {
    try {
        const userId = req.user._id
        const { score, type } = req.validated.body

        const newScore = await ScoreModel.create({ score, type, user: userId })
        // console.log("userId", id, "score", score, "name", req.user.name, type)

        await addScoreRedis({ userId, username: req.user.name, score, type })

        const updated = await getTopUsers({ type })
        broadcastLeaderboard({ type: type || 'global', users: updated })
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
