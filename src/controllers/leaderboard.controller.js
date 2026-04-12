const { getTopUsers } = require("../redis/score.redis");

const getLeaderboard = async (req, res) => {
    const users = await getTopUsers();
    res.json({ success: true, message: "Leaderboard found successfully", users });
}

module.exports = {
    getLeaderboard
}
