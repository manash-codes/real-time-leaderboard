const ScoreModel = require("../models/Score.model");

const getTopPlayersReport = async (req, res) => {
    try {
        const { gameType, limit = 10 } = req.query;
        const endDate = req.query.endDate ? new Date(req.query.endDate) : new Date();
        const startDate = req.query.startDate
            ? new Date(req.query.startDate)
            : new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

        if (isNaN(startDate) || isNaN(endDate)) {
            return res.status(400).json({ success: false, message: 'Invalid date format. Use ISO 8601.' });
        }

        const matchStage = { createdAt: { $gte: startDate, $lte: endDate } };
        if (gameType) matchStage.gameType = gameType;

        // Aggregate: per user, find their best score and total submissions in the period
        const report = await ScoreModel.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: '$user',
                    bestScore: { $max: '$score' },
                    totalSubmissions: { $sum: 1 },
                    avgScore: { $avg: '$score' },
                },
            },
            { $sort: { bestScore: -1 } },
            { $limit: Math.min(Number(limit), 100) },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    _id: 0,
                    userId: '$_id',
                    username: '$user.username',
                    name: '$user.name',
                    bestScore: 1,
                    avgScore: { $round: ['$avgScore', 2] },
                    totalSubmissions: 1,
                },
            },
        ]);

        return res.json({
            success: true,
            report,
            meta: {
                startDate,
                endDate,
                gameType: gameType || 'all',
                totalPlayers: report.length,
            },
        });
    } catch (err) {
        console.error('[getTopPlayersReport]', err);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = { getTopPlayersReport };
