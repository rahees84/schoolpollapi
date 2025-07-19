const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const candidateController = require("../controllers/candidateController");
const reqBodyMiddleware = require("../middlewares/otherMiddlewares");

router.post('/', authMiddleware, reqBodyMiddleware, candidateController.createCandidate);
router.put('/:id', authMiddleware, reqBodyMiddleware, candidateController.updateCandidate);
router.get('/:code', authMiddleware, candidateController.getOneCandidateFromCode);
router.get('/id/:id', authMiddleware, candidateController.getOneCandidateFromId);
router.get('/', authMiddleware, candidateController.getCandidates);

module.exports = router;