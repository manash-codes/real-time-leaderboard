var express = require('express');
const { getLeaderboard, getMyRank } = require('../controllers/leaderboard.controller');
var router = express.Router();

/**
 * @swagger
 * /api/leaderboard:
 *   get:
 *     summary: Get the leaderboard
 *     tags: [Leaderboard]
 *     responses:
 *       200:
 *         description: The leaderboard
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   score:
 *                     type: number
 *                   type:
 *                     type: string
 */

/* GET home page. */
router.get('/', getLeaderboard);

/**
 * @swagger
 * /api/leaderboard/rank:
 *   get:
 *     summary: Get the authenticated user's current rank
 *     tags: [Leaderboard]
 *     parameters:
 *       - in: query
 *         name: gameType
 *         schema: { type: string }
 *         description: Omit for global rank
 *     responses:
 *       200:
 *         description: User's rank and score
 *       404:
 *         description: User has not submitted any scores yet
 */
router.get('/rank', getMyRank);
module.exports = router;
