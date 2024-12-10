const express = require("express");
const router = express.Router();
const candidateController = require("../controllers/candidateController");

router.get("/", candidateController.getCandidates);
router.get("/:cid", candidateController.getCandidateById);
router.post("/login", candidateController.loginCandidate);
router.post("/signup", candidateController.signUpCandidate);

module.exports = router;
