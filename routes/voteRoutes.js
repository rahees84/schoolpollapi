/**
 * @swagger
 * tags:
 *   name: Vote
 *   description: API endpoints for casting and managing votes
 */


const express = require("express");
const router = express.Router();
const voteController = require("../controllers/voteController");
const authMiddleware = require("../middlewares/authMiddleware");
const reqBodyMiddleware = require("../middlewares/otherMiddlewares");


/**
 * @swagger
 * /api/vote:
 *   post:
 *     summary: Cast a vote
 *     tags: [Vote]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - voter_id
 *               - candidate_id
 *             properties:
 *               voter_id:
 *                 type: string
 *                 example: "64ec6b2a9a6c10f715edf45a"
 *               candidate_id:
 *                 type: string
 *                 example: "64ec6b8e9a6c10f715edf470"
 *     responses:
 *       201:
 *         description: Vote cast successfully
 *       400:
 *         description: Validation error or duplicate vote
 *       401:
 *         description: Unauthorized
 */

router.post("/", authMiddleware, reqBodyMiddleware, voteController.createVote);

/**
 * @swagger
 * /api/vote/count:
 *   get:
 *     summary: Get vote count for each candidate
 *     tags: [Vote]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Vote counts retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   candidate_id:
 *                     type: string
 *                   candidate_name:
 *                     type: string
 *                   total_votes:
 *                     type: integer
 *       401:
 *         description: Unauthorized
 */

router.get("/count/", authMiddleware, voteController.getVoteCount);

/**
 * @swagger
 * /api/vote:
 *   delete:
 *     summary: Clear all votes (admin use)
 *     tags: [Vote]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All votes cleared successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

router.delete("/", authMiddleware, voteController.clearAllVotes);

module.exports = router;