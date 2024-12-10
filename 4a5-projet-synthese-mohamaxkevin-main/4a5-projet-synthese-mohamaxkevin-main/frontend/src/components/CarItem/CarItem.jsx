import "./CarItem.css";
import { car } from "../../Data/car";
import { GiCarDoor } from "react-icons/gi";
import { IoPerson } from "react-icons/io5";
import { BsFillSuitcaseLgFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { useState, useContext } from "react";
import Location from "../Location/Location";
import Review from "../Reviews/Reviews";
import { useHttpClient } from "../../hook/http-hook";
import { AuthContext } from "../../Containers/AuthContext";

const CarItem = (props) => {
  const [open, setOpen] = useState(false);
  const [carInfos, setCarInfos] = useState({});
  const [openReview, setOpenReview] = useState(false);
  const [carReviewInfos, setCarReviewInfos] = useState({});
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  const send = (infos) => {
    setOpen(true);
    setCarInfos(infos);
  };
  const sendReview = (infos) => {
    setOpenReview(true);
    setCarReviewInfos(infos);
  };

  const removeCar = async (carId) => {
    try {
      const response = await sendRequest(
        `https://foura5-projet-synthese-mohamaxkevin-yf32.onrender.com/api/car/${carId}`,
        "DELETE"
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="lesVoitures">
        {props.car.map((car) => (
          <div className="voiture">
            <div className="imageAndRate">
              <div className="voitureImage">
                <img src={car.image} />
              </div>
              <div className="carRate">
                <span id="rating" onClick={() => sendReview(car)}>
                  {car.rating}
                </span>
              </div>
            </div>
            <div className="infos">
              <h1 className="modele">{car.model}</h1>
              <div className="icon">
                <div className="nbPlaces">
                  <IoPerson id="person" /> {car.seats}
                </div>
                <div className="nbBagages">
                  <BsFillSuitcaseLgFill id="bagages" /> {car.baggage}
                </div>
                <div className="nbPortes">
                  <GiCarDoor id="door" />
                  {car.doors}
                </div>
              </div>
              <div className="emplacement">
                <FaLocationDot />
                {car.adresse}
              </div>
              <hr id="ligne" />
              <p className="descriptionVoiture">
                - {car.isElectric ? "Électrique" : "Essence"}
              </p>
              <p className="descriptionVoiture">
                {" "}
                - {car.isAutomatic ? "Automatique" : "Manuel"}
              </p>
            </div>
            <div className="prixVoiture">
              <div id="priceline">Priceline</div>
              <div className="prix">C$ {car.dailyRentalPrice}</div>
              <button id="offre" onClick={() => send(car)}>
                Voir la voiture
              </button>
              {auth.isAdmin && (
                <button id="delete" onClick={() => removeCar(car.id)}>
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Location isOpen={open} car={carInfos} setIsOpen={setOpen} />
      <Review
        isOpen={openReview}
        car={carReviewInfos}
        setIsOpen={setOpenReview}
      />
    </>
  );
};

export default CarItem;
