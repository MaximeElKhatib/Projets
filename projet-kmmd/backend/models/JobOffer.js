const mongoose = require("mongoose");

const jobOfferSchema = new mongoose.Schema({
  employeur: {
    type: mongoose.Types.ObjectId,
    ref: "Employer",
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  salaryRange: { type: String, required: true },
  employmentType: { type: String, required: true },
  skillsRequired: [{ type: String, required: true }],
  // Peut être enlever car c'Est deja dans description
  requiredFormation: { type: String, required: true },
  requiredExperience: { type: String, required: true },
  linguistic_requirement: [{ type: String }],
  isRemote: { type: Boolean, required: true },
  isActive: { type: Boolean, required: true },
  datePosted: { type: Date, required: true },
  schedule: { type: String, required: true },
  applicationDeadline: { type: Date, required: true },
  benefits: [{ type: String }],
  jobApplications: [
    {
      type: mongoose.Types.ObjectId,
      ref: "JobOffer",
    },
  ],
});

const JobOffer = mongoose.model("JobOffer", jobOfferSchema);

module.exports = JobOffer;
