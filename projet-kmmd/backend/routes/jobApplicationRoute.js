const express = require("express");
const router = express.Router();
const jobApplicationsController = require("../controllers/jobApplicationController");

router.get("/", jobApplicationsController.getJobApplications);
router.get("/:jid", jobApplicationsController.getJobApplicationByJobOfferId);
router.post("/", jobApplicationsController.createJobApplication);
router.get(
  "/candidate/:cid",
  jobApplicationsController.getJobApplicationForCandidateId
);
router.delete("/:id", jobApplicationsController.deleteJobApplication);
module.exports = router;
