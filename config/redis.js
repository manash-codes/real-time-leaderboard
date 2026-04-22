const { createClient } = require('redis');

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
})

// basic events (optional but useful)
redisClient.on('error', (err) => {
    console.log('❌ Redis error:', err);
});

async function connectRedis() {
    if (!redisClient.isOpen) {
        await redisClient.connect();
        console.log('✅ Redis Connected');
    }
}

module.exports = {
    connectRedis,
    redisClient
}
