/**
 * @swagger
 * tags:
 *   name: PendingVote
 *   description: API endpoints for handling pending voters (before vote is cast)
 */



const express = require('express');
const router = express.Router();
const pendingVoteController = require("../controllers/pendingVoteController");
const authMiddleware = require('../middlewares/authMiddleware');


/**
 * @swagger
 * /api/pending-vote:
 *   post:
 *     summary: Set a voter as pending (allow to vote)
 *     tags: [PendingVote]
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
 *             properties:
 *               voter_id:
 *                 type: string
 *                 example: "64ec6b2a9a6c10f715edf45a"
 *     responses:
 *       200:
 *         description: Voter marked as pending
 *       400:
 *         description: Missing or invalid voter ID
 *       401:
 *         description: Unauthorized
 */

router.post('/', authMiddleware, pendingVoteController.setPendingVoter);

/**
 * @swagger
 * /api/pending-vote:
 *   delete:
 *     summary: Clear pending voter status
 *     tags: [PendingVote]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pending voter cleared
 *       401:
 *         description: Unauthorized
 */

router.delete('/', authMiddleware, pendingVoteController.deletePendingVote);

module.exports = router;