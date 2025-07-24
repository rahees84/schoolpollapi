const express = require("express");
const router = express.Router();
const voteController = require("../controllers/voteController");
const authMiddleware = require("../middlewares/authMiddleware");
const reqBodyMiddleware = require("../middlewares/otherMiddlewares");

router.post("/", authMiddleware, reqBodyMiddleware, voteController.createVote);
router.get("/count/", authMiddleware, voteController.getVoteCount);
router.delete("/", authMiddleware, voteController.clearAllVotes);

module.exports = router;