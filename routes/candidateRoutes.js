const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const candidateController = require("../controllers/candidateController");

router.post('/', authMiddleware, candidateController.createCandidate);

module.exports = router;