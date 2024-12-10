const express = require("express");
const mongoose = require("mongoose");
const errorHandler = require("./handler/errorHandler");
const HttpError = require("./util/HttpError");
const carRoutes = require("./routes/carRoutes");
const succursaleRoutes = require("./routes/succursaleRoutes");
const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const app = express();

const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://2254007:Zouzou08@carlocationdatabase.rarmiip.mongodb.net/?retryWrites=true&w=majority&appName=CarLocationDatabase";

require("./scheduledActions");
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // header et value * quels domaines peuvent acceder a notre serveur
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ); //quel header sont autorisés ( pourait etre * pour tout)
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE"); // quelles methodes HTTP sont autorisées
  next();
});

app.use("/api/car", carRoutes);
app.use("/api/succursale", succursaleRoutes);
app.use("/api/user", userRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/reservation", reservationRoutes);

mongoose
  .connect(
    "mongodb+srv://2254007:Zouzou08@carlocationdatabase.rarmiip.mongodb.net/?retryWrites=true&w=majority&appName=CarLocationDatabase"
  )
  .then(() => {
    app.listen(5000);
    console.log("Connexion BD Réussie");
  })
  .catch((err) => {
    console.log(err);
  });

app.use((req, res, next) => {
  return next(new HttpError("Route non trouvé", 404));
});

app.use(errorHandler);
