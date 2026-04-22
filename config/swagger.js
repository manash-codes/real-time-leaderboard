const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Real-time Leaderboard API',
            version: '1.0.0',
            description: 'JWT-authenticated leaderboard with Redis sorted sets and WebSocket push',
        },
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'token',
                },
            },
        },
        servers: [{ url: 'http://localhost:3000' }],
    },
    apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = {
    specs,
    swaggerUi
};