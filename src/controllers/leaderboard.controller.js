/**
 * src/controllers/leaderboard.controller.js
 *
 * NEW: getUserRank — previously missing entirely.
 * Supports ?gameType, ?limit, ?offset query params.
 */

const { getTopUsers, getUserRank } = require('../redis/score.redis');

const getLeaderboard = async (req, res) => {
    try {
        const { gameType, limit = 10, offset = 0 } = req.query;

        const users = await getTopUsers({
            gameType,
            limit: Math.min(Number(limit), 100),   // cap at 100 entries per page
            offset: Number(offset),
        });

        return res.json({ success: true, gameType: gameType || 'global', users });
    } catch (err) {
        console.error('[getLeaderboard]', err);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

/**
 * GET /api/leaderboard/rank
 * Returns the authenticated user's current rank and score.
 * Optional ?gameType query param for per-game rank.
 */
const getMyRank = async (req, res) => {
    try {
        const { gameType } = req.query;
        const result = await getUserRank({ userId: req.user._id, gameType });

        if (!result) {
            return res.status(404).json({ success: false, message: 'No score submitted yet' });
        }

        return res.json({ success: true, ...result, gameType: gameType || 'global' });
    } catch (err) {
        console.error('[getMyRank]', err);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = { getLeaderboard, getMyRank };
