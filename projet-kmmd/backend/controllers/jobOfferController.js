const JobOffer = require("../models/JobOffer");
const mongoose = require("mongoose");

exports.createJobOffer = async (req, res) => {
  console.log("Received job offer data:", req.body);

  const jobOfferData = {
    ...req.body,
    datePosted: new Date(),
  };

  const newJobOffer = new JobOffer(jobOfferData);

  try {
    await newJobOffer.save();
    res.status(201).json({ success: true, data: newJobOffer });
  } catch (error) {
    console.error("Error in create job offer:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message || error,
    });
  }
};

exports.deleteJobOffer = async (req, res) => {
  const { id } = req.params;

  try {
    await JobOffer.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Job offer deleted" });
  } catch (error) {
    res.status(404).json({ success: false, message: "Job offer not found" });
  }
};

exports.getJobOffers = async (req, res, next) => {
  try {
    const jobOffers = await JobOffer.find().populate({
      path: "employeur",
      select: "phoneNumber companyName",
    });
    res.status(200).json({
      offers: jobOffers.map((offer) => {
        return offer.toObject({ getters: true });
      }),
    });
  } catch (error) {
    console.log("error in fetching job offers:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Inside your controller method
exports.updateJobOffer = async (req, res) => {
  const offerId = req.params.id;
  const offerUpdates = req.body;

  try {
    const updatedOffer = await JobOffer.findByIdAndUpdate(
      offerId,
      offerUpdates,
      {
        new: true,
      }
    );
    if (!updatedOffer) {
      return res.status(404).json({ message: "Job offer not found" });
    }
    res.status(200).json({ offer: updatedOffer.toObject({ getters: true }) });
  } catch (error) {
    console.error("Error in update job offer:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message || error,
    });
  }
};
