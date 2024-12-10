const express = require("express");
const router = express.Router();
const employerController = require("../controllers/employerController");

router.get("/", employerController.getEmployers);
router.get("/:eid", employerController.getEmployerById);
router.post("/login", employerController.loginEmployeur);
router.post("/signup", employerController.signUpEmployeur);
module.exports = router;
