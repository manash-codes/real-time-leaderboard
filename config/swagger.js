const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My Express API',
            version: '1.0.0',
            description: 'A simple Express API with Swagger documentation',
        },
        servers: [{ url: 'http://localhost:3000' }],
    },
    // Path to the API docs (files containing @swagger comments)
    apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = {
    specs,
    swaggerUi
};