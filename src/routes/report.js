const express = require('express');
const { getTopPlayersReport } = require('../controllers/report.controller');

const router = express.Router();

/**
 * @swagger
 * /api/report/top-players:
 *   get:
 *     summary: Top players report for a time period
 *     tags: [Report]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema: { type: string, format: date-time }
 *         description: start date
 *       - in: query
 *         name: endDate
 *         schema: { type: string, format: date-time }
 *         description: end date
 *       - in: query
 *         name: gameType
 *         schema: { type: string }
 *         description: Omit to report across all games
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: Top players with best score, average, and submission count
 */
router.get('/top-players', getTopPlayersReport);

module.exports = router;