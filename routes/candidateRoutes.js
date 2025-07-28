/**
 * @swagger
 * tags:
 *   name: Candidate
 *   description: Endpoints for managing election candidates
 */


const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const candidateController = require("../controllers/candidateController");
const reqBodyMiddleware = require("../middlewares/otherMiddlewares");


/**
 * @swagger
 * /api/candidate:
 *   post:
 *     summary: Create a new candidate
 *     tags: [Candidate]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - code
 *               - symbol
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               code:
 *                 type: string
 *                 example: CAND01
 *               symbol:
 *                 type: string
 *                 example: 🐘
 *     responses:
 *       201:
 *         description: Candidate created
 *       400:
 *         description: Validation error or missing fields
 *       401:
 *         description: Unauthorized
 */

router.post('/', authMiddleware, reqBodyMiddleware, candidateController.createCandidate);

/**
 * @swagger
 * /api/candidate/{id}:
 *   put:
 *     summary: Update a candidate by ID
 *     tags: [Candidate]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Candidate ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Doe
 *               code:
 *                 type: string
 *                 example: CAND02
 *               symbol:
 *                 type: string
 *                 example: 🦅
 *     responses:
 *       200:
 *         description: Candidate updated
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Candidate not found
 */

router.put('/:id', authMiddleware, reqBodyMiddleware, candidateController.updateCandidate);

/**
 * @swagger
 * /api/candidate/{code}:
 *   get:
 *     summary: Get a candidate by code
 *     tags: [Candidate]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Candidate code (unique)
 *     responses:
 *       200:
 *         description: Candidate data
 *       404:
 *         description: Candidate not found
 *       401:
 *         description: Unauthorized
 */

router.get('/:code', authMiddleware, candidateController.getOneCandidateFromCode);


/**
 * @swagger
 * /api/candidate/id/{id}:
 *   get:
 *     summary: Get a candidate by ID
 *     tags: [Candidate]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Candidate ID
 *     responses:
 *       200:
 *         description: Candidate found
 *       404:
 *         description: Candidate not found
 *       401:
 *         description: Unauthorized
 */

router.get('/id/:id', authMiddleware, candidateController.getOneCandidateFromId);

/**
 * @swagger
 * /api/candidate:
 *   get:
 *     summary: Get all candidates
 *     tags: [Candidate]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of candidates
 *       401:
 *         description: Unauthorized
 */

router.get('/', authMiddleware, candidateController.getCandidates);

module.exports = router;