const { redisClient } = require("../../config/redis");
const { LEADERBOARD_KEY, LEADERBOARD_GLOBAL_KEY, leaderboardKey } = require("../constants/leaderboard");

async function addScoreRedis({ userId, score, username, type }) {
    const scoreValue = Number(score);

    await redisClient.hSet('leaderboard:users', userId.toString(), username);


    await redisClient.zAdd(LEADERBOARD_GLOBAL_KEY, [{ score: score, value: userId.toString() }], { GT: true })

    if (type) {
        await redisClient.zAdd(leaderboardKey(type), [{ score: score, value: userId.toString() }], { GT: true })
    }
}

async function getTopUsers({ type, limit = 10, offset = 0 } = {}) {
    const key = type ? leaderboardKey(type) : LEADERBOARD_GLOBAL_KEY;

    const entries = await redisClient.zRangeWithScores(key, offset, offset + limit - 1, { REV: true })

    if (!entries.length) return [];

    const userIds = entries.map(e => e.value);
    const usernames = redisClient.hmGet('leaderbord:users', userIds);

    return entries.map((entry, i) => ({
        rank: offset + i + 1,
        userId: entry.value,
        username: usernames[i] || entry.value,
        score: entry.value
    }))
}

async function getUserRank({ userId, type }) {
    const key = type ? leaderboardKey(type) : LEADERBOARD_GLOBAL_KEY;
    const userIdStr = userId.toString();

    const rank = await redisClient.ZREVRANK(key, userIdStr);
    if (rank === null) return null;

    const score = await redisClient.zScore(key, userIdStr);

    return { rank: rank + 1, score, userId: userIdStr }
}

module.exports = { addScoreRedis, getTopUsers, getUserRank };
