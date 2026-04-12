var express = require('express');
const { getScore, addScore } = require('../controllers/score.controller');
const { ScoreModel } = require('../models/Score.model');
var router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Score:
 *       type: object
 *       required:
 *         - score
 *         - type
 *       properties:
 *         score:
 *           type: number
 *           description: The score
 *         type:
 *           type: string
 *           description: The type of score
 */

/**
 * @swagger
 * /api/score:
 *   get:
 *     summary: Get all scores
 *     tags: [Score]
 *     responses:
 *       200:
 *         description: A list of scores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Score'
 */
router.get('/', getScore);

/**
 * @swagger
 * /api/score:
 *   post:
 *     summary: Add a new score
 *     tags: [Score]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - score
 *               - type
 *             properties:
 *               score:
 *                 type: number
 *                 description: The score
 *               type:
 *                 type: string
 *                 description: The type of score
 *     responses:
 *       201:
 *         description: The added score
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 scores:
 *                   type: object
 *                   properties:
 *                     score:
 *                       type: number
 *                     type:
 *                       type: string
 */
router.post('/', addScore);

module.exports = router;

