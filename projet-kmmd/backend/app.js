const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose");
const HttpError = require("./util/HttpError");
const errorHandler = require("./handler/errorHandler");
const candidateRoutes = require("./routes/candidateRoutes");
const employerRoutes = require("./routes/employerRoutes");
const jobOfferRoutes = require("./routes/jobOfferRoutes");
const jobApplicationRoutes = require("./routes/jobApplicationRoute");
const path = require("path");
const jobApplication = require("./models/JobApplication");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/testDev";

app.use(express.json());
app.options("*", cors()); // Pour gérer toutes les requêtes OPTIONS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

// Routes
app.use("/api/employer", employerRoutes);
app.use("/api/candidate", candidateRoutes);
app.use("/api/jobOffer", jobOfferRoutes);
app.use("/api/jobApplications", jobApplicationRoutes);

uri = MONGODB_URI;

mongoose
  .connect(uri)
  //qCxDMo0Bd6HGBVCf
  .then(() => {
    app.listen(PORT);
    console.log("CONNEXION BD REUSSI");
  })
  .catch((err) => {
    console.log(err);
  });

// Handle undefined routes
app.use((req, res, next) => {
  return next(new HttpError("Route not found", 404));
});

// Error handler middleware
app.use(errorHandler);

app.use(cors());
