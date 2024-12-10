const express = require("express");
const router = express.Router();
const jobOfferController = require("../controllers/jobOfferController");

router.post("/", jobOfferController.createJobOffer);
router.delete("/:id", jobOfferController.deleteJobOffer);
router.get("/", jobOfferController.getJobOffers);
router.patch("/:id", jobOfferController.updateJobOffer);

module.exports = router;
