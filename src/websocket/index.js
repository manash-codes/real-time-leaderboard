const { Server } = require("socket.io");

let io;

function initWebSocekt(server) {
    io = new Server(server, {
        cors: { origin: process.env.CLIENT_URL || "*", credentials: true }
    })

    io.on("connection", (socket) => {
        console.log('Client connected', socket.id)

        socket.on("get:leaderboard", async () => {
            const { getTopUsers } = require("../redis/score.redis");
            const users = await getTopUsers();
            socket.emit('leaderboad:update', { users })
        })

        socket.on("disconnect", async () => {
            console.log('Client disconnected', socket.id)
        })
    })

    return io;
}

function broadcastLeaderboard(leaderboardData) {
    if (!io) return;
    io.emit('leaderboad:update', leaderboardData)
}

module.exports = { initWebSocekt, broadcastLeaderboard }
