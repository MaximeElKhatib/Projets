import "./Voitures.css";
import CarItem from "../CarItem/CarItem";
import { useState, useEffect } from "react";
import { IoTrashBin } from "react-icons/io5";
import { useHttpClient } from "../../hook/http-hook";
const Voitures = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [listVoitures, setListVoitures] = useState([]);
  const [listSuccursales, setListSuccursales] = useState([]);
  useEffect(() => {
    const fetchVoitures = async () => {
      try {
        const response = await sendRequest(
          "https://foura5-projet-synthese-mohamaxkevin-yf32.onrender.com/api/succursale"
        );
        setListSuccursales(response.succursales);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVoitures();
  }, []);

  useEffect(() => {
    const cars = [];
    listSuccursales.forEach((succursale) => {
      succursale.availableCars.forEach((car) => {
        cars.push({ ...car, adresse: succursale.adresse });
      });
    });
    setListVoitures(cars);
  }, [listSuccursales]);
  useEffect(() => {
    setCarFilter([...listVoitures]);
  }, [listVoitures]);
  const [carFilter, setCarFilter] = useState([...listVoitures]);
  const [transmission, setTransmission] = useState("defaut");
  const [taille, setTaille] = useState("defaut");
  const [capacite, setCapacite] = useState("defaut");
  const [bagages, setBagages] = useState("defaut");
  const [nbPortes, setNbPortes] = useState("defaut");
  const [prix, setPrix] = useState("defaut");
  const [type, setType] = useState("defaut");

  useEffect(() => {
    filtreVoiture();
  }, [transmission, taille, capacite, bagages, nbPortes, prix, type]);

  const filtreTaille = (event) => {
    setTaille(event.target.value);
    filtreVoiture();
  };
  const filtreCapacite = (event) => {
    setCapacite(event.target.value);
    filtreVoiture();
  };

  const filtreBagage = (event) => {
    setBagages(event.target.value);
    filtreVoiture();
  };
  const filtrePortes = (event) => {
    setNbPortes(event.target.value);
    filtreVoiture();
  };

  const filtrePrix = (event) => {
    setPrix(event.target.value);
    filtreVoiture();
  };

  const filtreTransmisson = (event) => {
    setTransmission(event.target.value);
    filtreVoiture();
  };
  const filtreType = (event) => {
    setType(event.target.value);
    filtreVoiture();
  };

  const croissant = () => {
    const croissantTab = [...listVoitures].sort((premier, deuxieme) => {
      console.log(premier.dailyRentalPrice);
      const a = premier.dailyRentalPrice;
      const b = deuxieme.dailyRentalPrice;

      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    });
    setListVoitures(croissantTab);
  };

  const decroissant = () => {
    const decroissantTab = [...listVoitures].sort((premier, deuxieme) => {
      const a = premier.dailyRentalPrice;
      const b = deuxieme.dailyRentalPrice;

      if (a < b) {
        return 1;
      } else if (a > b) {
        return -1;
      } else {
        return 0;
      }
    });
    setListVoitures(decroissantTab);
  };
  const filtreVoiture = () => {
    const filtreCar = carFilter.filter((car) => {
      return (
        (taille === "defaut" || car.model === taille) &&
        (transmission === "defaut" || car.isAutomatic
          ? "Automatique"
          : "Manuel" === transmission) &&
        (capacite === "defaut" ||
          (parseInt(capacite) < 6
            ? car.seats === parseInt(capacite)
            : car.seats >= parseInt(capacite))) &&
        (bagages === "defaut" ||
          (parseInt(bagages) < 5
            ? car.baggage === parseInt(bagages)
            : car.baggage >= parseInt(bagages))) &&
        (nbPortes === "defaut" || car.doors === parseInt(nbPortes)) &&
        (type === "defaut" || car.isElectric
          ? "Electrique"
          : "Essence" === type) &&
        (prix === "defaut" ||
          (prix == "peu"
            ? car.dailyRentalPrice >= 50 && car.dailyRentalPrice <= 100
            : prix == "moyen"
            ? car.dailyRentalPrice > 100 && car.dailyRentalPrice <= 200
            : car.dailyRentalPrice > 200))
      );
    });

    setListVoitures(filtreCar);
  };
  const clear = () => {
    setTransmission("defaut");
    setTaille("defaut");
    setCapacite("defaut");
    setBagages("defaut");
    setNbPortes("defaut");
    setPrix("defaut");
    setType("defaut");
  };
  return (
    <div className="fond">
      <div className="recherche">
        <button className="flush" onClick={clear}>
          <IoTrashBin />
        </button>
        <select
          value={taille}
          className="type"
          onChange={(event) => {
            filtreTaille(event);
          }}
        >
          <option value="defaut">Catégorie</option>
          <option value="Petit">Petit</option>
          <option value="Moyen">Moyen</option>
          <option value="Grand">Grand</option>
          <option value="SUV">SUV</option>
        </select>

        <select
          value={capacite}
          className="type"
          onChange={(event) => {
            filtreCapacite(event);
          }}
        >
          <option value="defaut" selected>
            Capacité
          </option>
          <option value="2">2 passagers</option>
          <option value="5">5 passagers</option>
          <option value="6">6 ou plus</option>
        </select>

        <select
          value={bagages}
          className="type"
          onChange={(event) => {
            filtreBagage(event);
          }}
        >
          <option value="defaut" selected>
            Bagages
          </option>
          <option value="2">2 bagages</option>
          <option value="4">4 bagages</option>
          <option value="5">5 ou plus</option>
        </select>

        <select
          value={nbPortes}
          className="type"
          onChange={(event) => {
            filtrePortes(event);
          }}
        >
          <option value="defaut" selected>
            Nombre de portes
          </option>
          <option value="2">2</option>
          <option value="4">4</option>
        </select>

        <select
          value={prix}
          className="type"
          onChange={(event) => {
            filtrePrix(event);
          }}
        >
          <option value="defaut" selected>
            Prix
          </option>
          <option value="peu">50$ à 100$</option>
          <option value="moyen">100$ à 200$</option>
          <option value="bcp">200$ ou plus</option>
        </select>

        <select
          value={transmission}
          className="type"
          onChange={(event) => {
            filtreTransmisson(event);
          }}
        >
          <option value="defaut">Transmission</option>
          <option value="Automatique">Automatique</option>
          <option value="Manuel">Manuel</option>
        </select>

        <select
          value={type}
          className="type"
          onChange={(event) => {
            filtreType(event);
          }}
        >
          <option value="defaut" selected>
            Type voiture
          </option>
          <option value="Electrique">Électrique</option>
          <option value="Essence">Essence</option>
        </select>
      </div>
      <div className="headSearch">
        <span className="result">{carFilter.length} résultats</span>
        <div className="tri">
          <label id="trier">Trier : </label>
          <button className="sort" onClick={croissant}>
            Croissant
          </button>
          <label> | </label>
          <button className="sort" onClick={decroissant}>
            Décroissant
          </button>
        </div>
      </div>
      {listVoitures.length !== 0 ? (
        <CarItem car={listVoitures} />
      ) : (
        <div className="aucun">Aucun résultat.</div>
      )}
    </div>
  );
};
export default Voitures;
