const LEADERBOARD_GLOBAL_KEY = 'leaderboard:global';

const leaderboardKey = (gameType) => `leaderboard:${gameType.toLowerCase()}`

module.exports = {
    LEADERBOARD_GLOBAL_KEY,
    leaderboardKey
}
