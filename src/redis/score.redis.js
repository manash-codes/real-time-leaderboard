const { redisClient } = require("../../config/redis");
const { LEADERBOARD_KEY } = require("../constants/leaderboard");

async function addScoreRedis({ score, name, type }) {
    await redisClient.zAdd(LEADERBOARD_KEY, [
        { score: score, value: name, type: type }
    ]);
}

async function getTopUsers(limit = 10) {
    const users = await redisClient.zRangeWithScores(
        LEADERBOARD_KEY,
        0,
        limit - 1,
        { REV: true, WITHSCORES: true }
    );

    return users;
}

module.exports = { addScoreRedis, getTopUsers };
