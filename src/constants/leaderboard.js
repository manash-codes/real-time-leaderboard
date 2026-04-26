const LEADERBOARD_GLOBAL_KEY = 'leaderboard:global';

const leaderboardKey = (type) => `leaderboard:${type.toLowerCase()}`

module.exports = {
    LEADERBOARD_GLOBAL_KEY,
    leaderboardKey
}
