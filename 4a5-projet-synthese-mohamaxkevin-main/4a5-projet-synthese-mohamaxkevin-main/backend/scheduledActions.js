// Ce fichier va contenir toutes nos actions prévus
const cron = require("node-cron");
const Car = require("./models/Car");
const Succursale = require("./models/Succursale");
const User = require("./models/User");
const Reservation = require("./models/Reservation");
const HttpError = require("./util/HttpError");
const { sendMail } = require("./envoiDeMail");

cron.schedule("02 0 * * *", () => {
  // Effectuer votre action ici
  console.log("Action prévue à 23h20");
});

// Methode utilisé pour supprimer la voiture de la succursale lorsque
// la reservation commence (Simuler que la voiture quitte la station)
const supprimerVoitureFromSuc = (
  heure,
  minute,
  month,
  dayOfMonth,
  pickUpAdress,
  carId,
  reservationId
) => {
  console.log(heure);
  console.log(minute);

  cron.schedule(`${minute} ${heure} ${dayOfMonth} ${month} *`, async () => {
    console.log("Supprime la voiture de la succursale");
    const succursale = await Succursale.findById(pickUpAdress);
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      console.error("Erreur : Reservation non existante");
      return;
    }
    if (!succursale) {
      console.error("Succursale non existante");
      return;
    }
    succursale.availableCars = succursale.availableCars.filter((car) => {
      return car.toString() !== carId;
    });
    succursale.save();
  });
};

const ajouterVoitureASuc = (
  heure,
  minute,
  month,
  dayOfMonth,
  deliveryAdress,
  carId
) => {
  cron.schedule(`${minute} ${heure} ${dayOfMonth} ${month} *`, async () => {
    console.log("Ajoute la voiture à la succursale");
    const succursale = await Succursale.findById(deliveryAdress);
    const car = await Car.findById(carId);
    if (!succursale) {
      console.error("Erreur Survenue");
      return;
    }
    succursale.availableCars.push(car);
    succursale.save();
  });
};

const ajusterStatusReservation = (
  heure,
  minute,
  month,
  dayOfMonth,
  reservationId,
  nouveauStatus
) => {
  console.log(heure);
  console.log(minute);
  cron.schedule(`${minute} ${heure} ${dayOfMonth} ${month} *`, async () => {
    console.log("Ajustement du status");
    console.log(reservationId);
    try {
      const reservation = await Reservation.findById(reservationId);
      if (!reservation) {
        console.error("Erreur Survenue, cette Reservation n'existe plus");
        return;
      }
      reservation.status = nouveauStatus;
      reservation.save();
    } catch (err) {
      console.error(err);
    }
  });
};

const rappelUneHeureAvantRemise = (
  heure,
  minute,
  month,
  dayOfMonth,
  reservationId,
  email
) => {
  cron.schedule(`${minute} ${heure - 1} ${dayOfMonth} ${month} *`, async () => {
    console.log("Envoi du rappel de retour par mail 1h avant la remise");

    try {
      const reservation = await Reservation.findById(reservationId);
      if (!reservation) {
        console.error("Erreur, cette Reservation n'existe pas");
        return;
      }
    } catch (err) {
      console.error("ERREUR SURVENUE");
      return;
    }

    const mailOptions = {
      from: "RentWheelsCorp@outlook.com",
      to: email, //user email
      subject: "Rappel pour le retour du véhicule",
      text:
        "Attention, le véhicule de la Reservation " +
        reservationId +
        " Doit être remis dans 1 heure ! \r\n\r le véhicule doit être en Succursale avant " +
        heure +
        ":" +
        minute,
    };

    await sendMail(mailOptions);
  });
};

exports.supprimerVoitureFromSuc = supprimerVoitureFromSuc;
exports.ajouterVoitureASuc = ajouterVoitureASuc;
exports.ajusterStatusReservation = ajusterStatusReservation;
exports.rappelUneHeureAvantRemise = rappelUneHeureAvantRemise;
