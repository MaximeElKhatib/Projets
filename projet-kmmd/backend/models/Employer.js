const mongoose = require("mongoose");

const EmployerSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  industry: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  website: { type: String, required: true },
  companyLogo: { type: String, required: true },
  companyDescription: { type: String, required: true },
  location: { type: String, required: true },
  jobOffers: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "JobOffer",
    },
  ],
});

module.exports = mongoose.model("Employer", EmployerSchema);
