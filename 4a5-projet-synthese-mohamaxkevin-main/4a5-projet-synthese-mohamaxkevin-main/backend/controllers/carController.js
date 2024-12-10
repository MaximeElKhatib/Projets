const HttpError = require("../util/HttpError");
const Car = require("../models/Car");

const test = (req, res, next) => {
  res.json({ message: "Requete arrivé" });
};

const addNewCar = async (req, res, next) => {
  const {
    fabricator,
    model,
    categorie,
    reviews,
    year,
    isAutomatic,
    isElectric,
    dailyRentalPrice,
    doors,
    seats,
    image,
    baggage,
    rating,
    hundredKmComsommation,
    kmRange,
    fuelType,
  } = req.body;

  const createdCar = new Car({
    fabricator,
    model,
    categorie,
    reviews,
    year,
    isAutomatic,
    isElectric,
    dailyRentalPrice,
    doors,
    seats,
    image,
    baggage,
    rating,
    hundredKmComsommation,
    kmRange,
    fuelType,
  });

  try {
    await createdCar.save();
  } catch (err) {
    return next(
      new HttpError(
        "Erreur lors de la communication avec la base de données",
        500
      )
    );
  }

  res.status(201).json({ createdCar: createdCar.toObject({ getters: true }) });
};

const getCars = async (req, res, next) => {
  try {
    const cars = await Car.find().populate({
      path: "reviews",
      select:
        "user car rating comment date comfort cleanliness pickUpReturn valueForMoney",
    });
    if (cars.length === 0) {
      return next(new HttpError("Aucune voiture trouvée"), 404);
    }
    res.status(201).json({
      cars: cars.map((car) => {
        return car.toObject({ getters: true });
      }),
    });
  } catch (err) {
    return next(
      new HttpError(
        "Erreur lors de la communication avec la base de données",
        500
      )
    );
  }
};

const getCarById = async (req, res, next) => {
  const carId = req.params.cid;
  try {
    const car = await Car.findById(carId).populate({
      path: "reviews",
      select:
        "user car rating comment date comfort cleanliness pickUpReturn valueForMoney",
    });
    if (!car) {
      return next(new HttpError("Aucune voiture trouvée", 404));
    }
    res.status(201).json({ car: car.toObject({ getters: true }) });
  } catch (err) {
    console.log(err);
    return next(
      new HttpError(
        "Erreur lors de la communication avec la base de données",
        500
      )
    );
  }
};

const deleteCar = async (req, res, next) => {
  const carId = req.params.cid;
  try {
    car = await Car.findByIdAndDelete(carId);
    if (!car) {
      return next(new HttpError("Aucune voiture trouvée", 404));
    }
    res
      .status(200)
      .json({ message: "la voiture a été supprimé avec succès !" });
  } catch (err) {
    return next(
      new HttpError("Erreur survenue, veuillez réessayer plus tard", 500)
    );
  }
};

exports.addNewCar = addNewCar;
exports.getCars = getCars;
exports.getCarById = getCarById;
exports.deleteCar = deleteCar;
