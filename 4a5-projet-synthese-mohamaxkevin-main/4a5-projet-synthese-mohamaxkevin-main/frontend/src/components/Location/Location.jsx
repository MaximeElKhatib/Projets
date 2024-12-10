import { useState, useEffect } from "react";
import "./Location.css";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "../../hook/http-hook";

const Location = ({ isOpen, car, setIsOpen }) => {
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [succursales, setSuccursales] = useState([]);
  useEffect(() => {
    const fetchSuccursales = async () => {
      try {
        const response = await sendRequest(
          `https://foura5-projet-synthese-mohamaxkevin-yf32.onrender.com/api/succursale`
        );
        console.log(response);
        setSuccursales(response.succursales);
        console.log(succursales);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSuccursales();
  }, [sendRequest]);

  const fetchReservation = async () => {
    console.log(succursales);
    console.log(car.adresse);
    const pickUpSuc = succursales.find((suc) => suc.adresse === car.adresse);
    const dropOffSuc = succursales.find(
      (suc) => suc.adresse === car.dropOffLoc
    );
    console.log(pickUpSuc.id);

    try {
      console.log(car.startDate);
      console.log(car);
      const response = await sendRequest(
        "https://foura5-projet-synthese-mohamaxkevin-yf32.onrender.com/api/reservation",
        "POST",
        JSON.stringify({
          carId: car.id,
          startDate: car.startDate.toString(),
          endDate: car.endDate.toString(),
          pickUpAdress: pickUpSuc,
          deliveryAdress: dropOffSuc,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }

    const param = new URLSearchParams();
    param.append("model", car.model);
    param.append("pickUpLoc", car.adresse);
    param.append("dropOffLoc", car.dropOffLoc);
    param.append("startDate", car.startDate);
    param.append("endDate", car.endDate);
    navigate(`/reservations?${param.toString()}`);
  };

  if (!isOpen) {
    return;
  }
  return (
    <div className="popup">
      <div className="location">
        <div className="header-location">
          <button className="close-popup" onClick={() => setIsOpen(false)}>
            &times;
          </button>
        </div>
        <div className="car-popup">
          <div className="car-image">
            <img src={car.image} id="image-pop-up"></img>
            <div className="car-infos">
              <p className="titre-popup">{car.model}</p>
              <ul>
                <li>{car.nbPlaces} passagers</li>
                <li>{car.nbBagages} bagages</li>
                <li>{car.nbPortes} portes</li>
                <li>
                  Transmission {car.isAutomatic ? "Automatique" : "Manuel"}
                </li>
                <li>{car.isElectric ? "Électrique" : "Essence"}</li>
              </ul>
            </div>
          </div>
        </div>
        {car.startDate !== null ? (
          <div className="book-pop">
            <button
              to="/reservations"
              className="book"
              onClick={fetchReservation}
            >
              Book Now
            </button>
          </div>
        ) : (
          <div className="msgErreur">
            <p>Fill the pick up location and the dates in the home page.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Location;
