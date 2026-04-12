var express = require('express');
const { getLeaderboard } = require('../controllers/leaderboard.controller');
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

module.exports = router;
