const LEADERBOARD_GLOBAL_KEY = 'leaderboard:global';

const leaderboadKey = (gameType) => `leaderboard:${gameType.toLowerCase()}`

module.exports = {
    LEADERBOARD_GLOBAL_KEY,
    leaderboardKey
}
