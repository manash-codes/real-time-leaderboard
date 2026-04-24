var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth.controller');
const { registerValidation } = require('../validations');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, username, password]
 *             properties:
 *               name:     { type: string }
 *               email:    { type: string, format: email }
 *               username: { type: string }
 *               password: { type: string, minLength: 8 }
 *     responses:
 *       201: { description: User registered }
 *       400: { description: Validation error or email/username taken }
 */
router.post('/register', registerValidation, authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: login a user
 *     description: logs in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: user logged in
 *       400:
 *         description: invalid request
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Log out (clears auth cookie)
 *     tags: [Auth]
 */
router.post('/logout', authController.logout);

module.exports = router;

