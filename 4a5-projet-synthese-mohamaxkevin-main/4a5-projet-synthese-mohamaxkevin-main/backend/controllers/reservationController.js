const Reservation = require("../models/Reservation");
const User = require("../models/User");
const Car = require("../models/Car");
const Succursale = require("../models/Succursale");
const HttpError = require("../util/HttpError");
const cron = require("node-cron");
const scheduledActionsController = require("../scheduledActions");
const { sendMail } = require("../envoiDeMail");

const createReservation = async (req, res, next) => {
  const { carId, startDate, endDate, pickUpAdress, deliveryAdress } = req.body;

  //Calculer le prix de la Reservation//

  // Trouver le nbJours
  const debut = new Date(startDate);
  console.log(debut);
  const fin = new Date(endDate);
  const nbJours = (fin - debut) / (1000 * 60 * 60 * 24);

  // Recuperer la voiture
  const car = await Car.findById(carId);

  // Calculer prix
  const price = car.dailyRentalPrice * nbJours;

  //Verifier l'existence de Car, Succursale A FAIRE

  // Créer la reservation
  const createdReservation = new Reservation({
    car: carId,
    user: req.userData.userId,
    status: "Pas commencé",
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    price,
    pickUpAdress,
    deliveryAdress,
  });

  try {
    // Sauvegarder la Reservation dans la base
    await createdReservation.save();

    // Ajouter cette Reservation au User
    const user = await User.findById(req.userData.userId);
    user.locationsEnCours.push(createdReservation);
    await user.save();

    // Supprimer le véhicule de la succursale (TEMPS SYSTEME A FAIRE)
    const startDateTime = new Date(startDate);
    startDateTime.setHours(startDateTime.getHours() + 12);
    const heure = startDateTime.getHours();
    const minute = startDateTime.getMinutes();
    const month = startDateTime.getMonth() + 1;
    const dayOfMonth = startDateTime.getDate();

    console.log("DEBUT : " + heure + " : " + minute + " / " + dayOfMonth);

    scheduledActionsController.supprimerVoitureFromSuc(
      heure,
      minute,
      month,
      dayOfMonth,
      pickUpAdress,
      carId,
      createdReservation.id
    );

    // Ajouter le véhicule a deliveryAdresse (TEMPS)
    const endDateTime = new Date(endDate);
    endDateTime.setHours(endDateTime.getHours() + 12); // Decalage
    const heure2 = endDateTime.getHours();
    const minute2 = endDateTime.getMinutes();
    const month2 = endDateTime.getMonth() + 1;
    const dayOfMonth2 = endDateTime.getDate();

    console.log("FIN : " + heure2 + " : " + minute2 + " / " + dayOfMonth2);

    scheduledActionsController.ajouterVoitureASuc(
      heure2,
      minute2,
      month2,
      dayOfMonth2,
      deliveryAdress,
      carId
    );

    //Ajuster le status de la Reservation le jour du début et le jour de fin

    scheduledActionsController.ajusterStatusReservation(
      heure,
      minute,
      month,
      dayOfMonth,
      createdReservation.id,
      "En cours"
    );
    scheduledActionsController.ajusterStatusReservation(
      heure2,
      minute2,
      month2,
      dayOfMonth2,
      createdReservation.id,
      "Terminée"
    );

    // Envoi du mail de rappel 1h avant la remise du véhicule
    scheduledActionsController.rappelUneHeureAvantRemise(
      heure2,
      minute2,
      month2,
      dayOfMonth2,
      createdReservation.id,
      req.userData.email
    );
    console.log(req.userData);
    //Envoi de mail de confirmation
    const mailOptions = {
      from: "RentWheelsCorp@outlook.com",
      to: req.userData.email, //user email
      subject: "Confirmation de Reservation",
      text: "Ceci est une confirmation de Réservation \r Merci d' avoir réservé chez RentWheels",
    };

    await sendMail(mailOptions);
  } catch (err) {
    console.log(err);
    return next(
      new HttpError("Erreur survenue, veuillez réessayer plus tard", 500)
    );
  }

  res.status(201).json({
    createdReservation: createdReservation.toObject({ getters: true }),
  });
};

const deleteReservation = async (req, res, next) => {
  const reservationId = req.params.rid;

  try {
    const reservation = await Reservation.findById(reservationId);

    // Securite : Seul le user connecté peut supprimer ses reservations
    if (req.userData.userId !== reservation.user.toString()) {
      return next(
        new HttpError(
          "Erreur Survenue : L'utilisateur courant n'a pas ce droit de supression",
          401
        )
      );
    }

    const deleteReservation = await Reservation.findByIdAndDelete(
      reservationId
    );
    if (!deleteReservation) {
      return next(
        new HttpError("Erreur survenue, veuillez réessayer plus tard", 401)
      );
    }

    //Supression de la Reservation chez le User
    const user = await User.findById(req.userData.userId);
    if (!user) {
      return next(
        new HttpError("Erreur survenue, veuillez réessayer plus tard", 404)
      );
    }
    user.locationsEnCours = user.locationsEnCours.filter((res) => {
      res.toString() != reservationId;
    });

    await user.save();

    //Envoi de mail de confirmation
    const mailOptions = {
      from: "RentWheelsCorp@outlook.com",
      to: req.userData.email, //user email
      subject: "Annulation de reservation",
      text:
        "\r\nCeci est une un message confirmant votre annulation pour votre Reservation numero : " +
        reservationId +
        " . ",
    };

    await sendMail(mailOptions);
  } catch (err) {
    console.log(err);
    console.log(err);
    return next(
      new HttpError("Erreur survenue, veuillez réessayer plus tard", 500)
    );
  }

  res.json({ message: "La réservation a bien été annulé" });
};

const getReservationById = async (req, res, next) => {
  const resId = req.params.rid;
  try {
    const reservation = await Reservation.findById(resId);
    if (!reservation) {
      return next(new HttpError("Reservation non trouvé"));
    }
    res
      .status(201)
      .json({ reservation: reservation.toObject({ getters: true }) });
  } catch (err) {
    return next(
      new HttpError("Erreur survenue lors de la communication avec BD", 500)
    );
  }
};

const getReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find();
    if (reservations.length === 0) {
      return next(new HttpError("Aucune Reservations", 404));
    }

    res.status(200).json({
      reservations: reservations.map((res) => {
        return res.toObject({ getters: true });
      }),
    });
  } catch (err) {
    console.log(err);
    return next(
      new HttpError("Erreur survenue lors de la communication avec BD", 500)
    );
  }
};

exports.createReservation = createReservation;
exports.deleteReservation = deleteReservation;
exports.getReservationById = getReservationById;
exports.getReservations = getReservations;
