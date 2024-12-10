const JobApplication = require("../models/JobApplication");
const Candidate = require("../models/Candidate");
const JobOffer = require("../models/JobOffer"); // Correction ici
const mongoose = require("mongoose");

exports.getJobApplications = async (req, res, next) => {
  try {
    const jobApplications = await JobApplication.find().populate({
      path: "candidate",
      select: "firstName lastName email",
    });

    if (!jobApplications || jobApplications.length === 0) {
      return res.status(404).json({ message: "Aucune Application" });
    }

    res.status(200).json({
      applications: jobApplications.map((jb) => jb.toObject({ getters: true })),
    });
  } catch (error) {
    console.log("error in fetching job applications:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getJobApplicationByJobOfferId = async (req, res, next) => {
  const jobOfferId = req.params.jid;

  try {
    const jobApplications = await JobApplication.find({ jobOffer: jobOfferId })
      .populate("candidate")
      .populate("jobOffer");

    if (!jobApplications || jobApplications.length === 0) {
      return res.status(404).json({
        message: "Aucune candidature trouvée pour cette offre d'emploi.",
      });
    }

    res.status(200).json({ jobApplications });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération des candidatures.",
    });
  }
};

exports.createJobApplication = async (req, res, next) => {
  const {
    candidateId,
    jobOfferId,
    coverLetter,
    resume,
    applicationStatus,
    employerComment,
  } = req.body;

  if (
    !candidateId ||
    !jobOfferId ||
    !coverLetter ||
    !resume ||
    !applicationStatus
  ) {
    return res
      .status(400)
      .json({ message: "Veuillez fournir toutes les informations requises." });
  }

  try {
    const candidate = await Candidate.findById(candidateId);
    const jobOffer = await JobOffer.findById(jobOfferId);

    // Vérifiez si le candidat et l'offre existent
    if (!candidate || !jobOffer) {
      return res
        .status(404)
        .json({ message: "Candidat ou offre d'emploi introuvable." });
    }

    // Créer une nouvelle candidature
    const newJobApplication = new JobApplication({
      candidate: candidateId,
      jobOffer: jobOfferId,
      coverLetter,
      resume,
      applicationStatus,
      employerComment,
      applicationDate: new Date(),
    });

    // Sauvegarder la candidature
    await newJobApplication.save();

    // Ajouter la candidature pour l'employé

    // Ajouter la candidature à l'offre d'emploi
    jobOffer.jobApplications.push(newJobApplication._id);
    await jobOffer.save();

    res.status(201).json({
      message: "Candidature créée avec succès.",
      jobApplication: newJobApplication,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la création de la candidature:",
      error.message
    );
    res.status(500).json({
      message: "Une erreur est survenue lors de la création de la candidature.",
    });
  }
};

exports.getJobApplicationForCandidateId = async (req, res, next) => {
  const candidateId = req.params.cid;

  try {
    const jobApplications = await JobApplication.find({
      candidate: candidateId,
    })
      .populate("candidate")
      .populate("jobOffer");

    if (!jobApplications || jobApplications.length === 0) {
      return res.status(400).json({
        message: "Aucune candidature trouvée pour cette offre d'emploi . ",
      });
    }

    res.status(200).json({ jobApplications });
  } catch (err) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur est survenue , veuillez réessayer plus tard ",
    });
  }
};

exports.deleteJobApplication = async (req, res) => {
  const { id } = req.params;

  try {
    await JobApplication.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Job application deleted" });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: "Job application not found" });
  }
};
