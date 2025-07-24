const express = require("express");
const router = express.Router();
const voterController = require("../controllers/voterController");
const authMiddleware = require("../middlewares/authMiddleware");
const reqBodyMiddleware = require("../middlewares/otherMiddlewares");

router.post("/", authMiddleware, reqBodyMiddleware, voterController.createVoter);
router.put("/:id", authMiddleware, reqBodyMiddleware, voterController.updateVoter);
router.get('/used-cd/', authMiddleware, voterController.getAllClassDivisions);
router.get('/', authMiddleware, voterController.getVoters);
router.get('/:id', authMiddleware, voterController.getVoterFromId);
router.get('/cd/:class_division', authMiddleware, voterController.getVotersByClassDivision);

module.exports = router;