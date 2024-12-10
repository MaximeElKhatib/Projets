const Succursale = require("../models/Succursale");
const Car = require("../models/Car");
const HttpError = require("../util/HttpError");

const getSuccursale = async (req, res, next) => {
  try {
    const succursales = await Succursale.find().populate({
      path: "availableCars",
      populate: {
        path: "reviews",
      },
    });
    if (succursales.length === 0) {
      return next(new HttpError("Aucune succursales trouvée", 404));
    }
    res.status(201).json({
      succursales: succursales.map((suc) => {
        return suc.toObject({ getters: true });
      }),
    });
  } catch (err) {
    return next(
      new HttpError("Erreur survenue, veuillez réessayer plus tard", 500)
    );
  }
};

const addSuccursale = async (req, res, next) => {
  const { nom, adresse, availableCars } = req.body;
  const createdSuccursale = new Succursale({
    nom,
    adresse,
    availableCars,
  });

  try {
    await createdSuccursale.save();
  } catch (err) {
    return next(
      new HttpError("Erreur survenue, veuillez réessayer plus tard", 500)
    );
  }
  res
    .status(201)
    .json({ newSuccursale: createdSuccursale.toObject({ getters: true }) });
};

const getSuccursaleById = async (req, res, next) => {
  const sucId = req.params.sid;
  try {
    const succursale = await Succursale.findById(sucId).populate({
      path: "availableCars",
      populate: {
        path: "reviews",
      },
    });
    if (!succursale) {
      return next(new HttpError("Succursale non trouvée", 404));
    }
    res
      .status(201)
      .json({ succursale: succursale.toObject({ getters: true }) });
  } catch (err) {
    return next(
      new HttpError("Erreur survenue, veuillez réessayer plus tard", 500)
    );
  }
};

const updateSuccursale = async (req, res, next) => {
  const sucId = req.params.sid;
  const updates = req.body;
  try {
    const updatedSuccursale = await Succursale.findByIdAndUpdate(
      sucId,
      updates,
      { new: true }
    );
    if (!updateSuccursale) {
      return next(new HttpError("Aucune Succursale trouvée", 404));
    }
    res.status(201).json({
      updatedSuccursale: updatedSuccursale.toObject({ getters: true }),
    });
  } catch (err) {
    return next(
      new HttpError("Erreur survenue, veuillez réessayer plus tard", 500)
    );
  }
};

const deleteSuccursale = async (req, res, next) => {
  const sucId = req.params.sid;
  try {
    suc = await Succursale.findByIdAndDelete(sucId);
    if (!suc) {
      return next(new HttpError("Aucune succursale trouvée", 404));
    }
    res
      .status(200)
      .json({ message: "la succursale a été supprimé avec succès !" });
  } catch (err) {
    return next(
      new HttpError("Erreur survenue, veuillez réessayer plus tard", 500)
    );
  }
};

const addCarToSuccursale = async (req, res, next) => {
  const sucId = req.params.sid;
  const carId = req.body.carId;
  try {
    const succursale = await Succursale.findById(sucId);
    if (!succursale) {
      return next(new HttpError("Aucune succursale trouvée", 404));
    }
    const car = await Car.findById(carId);
    if (!car) {
      return next(
        new HttpError("La voiture que vous essayez d'ajouter n'existe pas")
      );
    }
    if (succursale.availableCars.includes(carId)) {
      return next(
        new HttpError("Cette voiture est deja disponible dans la succursale")
      );
    }

    succursale.availableCars.push(car);
    await succursale.save();

    res.json({ availableCars: succursale.availableCars });
  } catch (err) {
    return next(
      new HttpError("Erreur survenue lors de la communication avec la BD")
    );
  }
};

const removeCarFromSuccursale = async (req, res, next) => {
  const sucId = req.params.sid;
  const carId = req.body.carId;
  try {
    const succursale = await Succursale.findById(sucId);
    if (!succursale) {
      return next(new HttpError("Aucune succursale trouvée", 404));
    }
    const car = await Car.findById(carId);
    if (!car) {
      return next(
        new HttpError(
          "La voiture que vous essayez de supprimer de la succursale n'existe pas"
        )
      );
    }
    if (!succursale.availableCars.includes(carId)) {
      return next(new HttpError("Cette voiture n'est pas dans la succursale"));
    }

    succursale.availableCars = succursale.availableCars.filter((c) => {
      console.log(c.toString() === carId);
      return c.toString() !== carId;
    });
    await succursale.save();
    console.log(succursale.availableCars);

    res.json({ message: "La voiture a bien été supprimé" });
  } catch (err) {
    console.log(err);
    return next(
      new HttpError("Erreur survenue lors de la communication avec la BD")
    );
  }
};

exports.getSuccursale = getSuccursale;
exports.addSuccursale = addSuccursale;
exports.getSuccursaleById = getSuccursaleById;
exports.deleteSuccursale = deleteSuccursale;
exports.updateSuccursale = updateSuccursale;
exports.addCarToSuccursale = addCarToSuccursale;
exports.removeCarFromSuccursale = removeCarFromSuccursale;
