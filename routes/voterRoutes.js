/**
 * @swagger
 * tags:
 *   name: Voter
 *   description: API endpoints for managing voters
 */


const express = require("express");
const router = express.Router();
const voterController = require("../controllers/voterController");
const authMiddleware = require("../middlewares/authMiddleware");
const reqBodyMiddleware = require("../middlewares/otherMiddlewares");

/**
 * @swagger
 * /api/voter:
 *   post:
 *     summary: Create a new voter
 *     tags: [Voter]
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
 *               - roll_number
 *               - class_division
 *             properties:
 *               name:
 *                 type: string
 *               roll_number:
 *                 type: integer
 *               class_division:
 *                 type: string
 *               gender:
 *                 type: string
 *             example:
 *               name: Rahul
 *               roll_number: 12
 *               class_division: "10A"
 *               gender: M
 *     responses:
 *       201:
 *         description: Voter created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

router.post("/", authMiddleware, reqBodyMiddleware, voterController.createVoter);

/**
 * @swagger
 * /api/voter/{id}:
 *   put:
 *     summary: Update a voter's information
 *     tags: [Voter]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Voter ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               roll_number:
 *                 type: integer
 *               class_division:
 *                 type: string
 *               gender:
 *                 type: string
 *     responses:
 *       200:
 *         description: Voter updated
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Voter not found
 */

router.put("/:id", authMiddleware, reqBodyMiddleware, voterController.updateVoter);

/**
 * @swagger
 * /api/voter/used-cd:
 *   get:
 *     summary: Get all used class divisions
 *     tags: [Voter]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of class divisions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       401:
 *         description: Unauthorized
 */

router.get('/used-cd/', authMiddleware, voterController.getAllClassDivisions);

/**
 * @swagger
 * /api/voter:
 *   get:
 *     summary: Get list of all voters
 *     tags: [Voter]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of voters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   roll_number:
 *                     type: integer
 *                   class_division:
 *                     type: string
 *                   gender:
 *                     type: string
 *       401:
 *         description: Unauthorized
 */

router.get('/', authMiddleware, voterController.getVoters);

/**
 * @swagger
 * /api/voter/{id}:
 *   get:
 *     summary: Get voter by ID
 *     tags: [Voter]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Voter ID
 *     responses:
 *       200:
 *         description: Voter details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Voter not found
 */

router.get('/:id', authMiddleware, voterController.getVoterFromId);

/**
 * @swagger
 * /api/voter/cd/{class_division}:
 *   get:
 *     summary: Get voters by class division
 *     tags: [Voter]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: class_division
 *         required: true
 *         schema:
 *           type: string
 *         description: Class division to filter voters
 *     responses:
 *       200:
 *         description: List of voters
 *       401:
 *         description: Unauthorized
 */

router.get('/cd/:class_division', authMiddleware, voterController.getVotersByClassDivision);

module.exports = router;