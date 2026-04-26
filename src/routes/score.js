var express = require('express');
const { getScore, addScore } = require('../controllers/score.controller');
const { ScoreModel } = require('../models/Score.model');
const { scoreValidation } = require('../validations');
const { scoreRateLimit } = require('../middleware/rateLimit.middleware');
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
 *     parameters:
 *       - name: limit
 *         in: query          
 *         description: How many items to return
 *         required: false     
 *         schema:
 *           type: integer
 *           default: 20
 *       - name: page
 *         in: query          
 *         description: How many items to return
 *         required: false     
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: type
 *         in: query          
 *         description: How many items to return
 *         required: false     
 *         schema:
 *           type: string
 *           default: global
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
 *             parameters:
 *             query:
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
router.post('/', scoreRateLimit, scoreValidation, addScore);

module.exports = router;

