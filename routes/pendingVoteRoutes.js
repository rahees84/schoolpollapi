const express = require('express');
const router = express.Router();
const pendingVoteController = require("../controllers/pendingVoteController");
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, pendingVoteController.setPendingVoter);
router.delete('/', authMiddleware, pendingVoteController.deletePendingVote);

module.exports = router;