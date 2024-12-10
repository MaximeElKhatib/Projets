import "./Reservation.css";
import { useState, useContext, useEffect, useDebugValue } from "react";
import { car } from "../../Data/car";
import { useHttpClient } from "../../hook/http-hook";
import { AuthContext } from "../../Containers/AuthContext";
import { useLocation } from "react-router-dom";
const Reservation = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const filterSearch = (event) => {};
  const [reservationData, setReservationData] = useState([]);
  const auth = useContext(AuthContext);

  const location = useLocation();
  const getParams = new URLSearchParams(location.search);
  const model = getParams.get("model");
  const pickUpLoc = getParams.get("pickUpLoc");
  const dropOffLoc = getParams.get("dropOffLoc");
  const startDate = getParams.get("startDate");
  const endDate = getParams.get("endDate");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await sendRequest(
          `https://foura5-projet-synthese-mohamaxkevin-yf32.onrender.com/api/user/${auth.userId}`
        );
        console.log(response);
        console.log(response.user.locationsEnCours);
        setReservationData(response.user.locationsEnCours);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [sendRequest]);

  const removeReservation = async (resId) => {
    try {
      const response = await sendRequest(
        `https://foura5-projet-synthese-mohamaxkevin-yf32.onrender.com/api/reservation/${resId}`,
        "DELETE"
      );
      setReservationData((r) =>
        r.filter((res) => {
          return res.id !== resId;
        })
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1 id="reservation">My Reservations</h1>
      <div className="book-container">
        <h2 id="statusRes">Incoming Reservations</h2>
        <div className="search-box-conteneur">
          <input
            onChange={filterSearch}
            type="text"
            className="search-box"
            placeholder="Find booking..."
          />
          <div className="legende">
            <p className="legende-modele">Modèle</p>
            <p className="legende-emplacement">Start Date</p>
            <p className="legende-pick">Pick-up location</p>
            <p className="legende-drop">Drop-off location</p>
            <p className="legende-status">Status</p>
          </div>
          <div className="rechercheConteneur">
            {reservationData.map((res) =>
              res.status === "Pas commencé" ? (
                <div className="book-list">
                  <p className="book-modele">{res.car.fabricator}</p>
                  <p className="book-details">{res.startDate}</p>
                  <p className="book-details">{res.pickUpAdress.adresse}</p>
                  <p className="book-details">{res.deliveryAdress.adresse}</p>
                  <p className="book-status">Incoming</p>
                  <button
                    className="cancel-button"
                    onClick={() => removeReservation(res.id)}
                  >
                    Cancel
                  </button>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
      <div className="book-container">
        <h2 id="statusRes">Current Reservations</h2>
        <div className="search-box-conteneur">
          <input
            onChange={filterSearch}
            type="text"
            className="search-box"
            placeholder="Find booking..."
          />
          <div className="legende">
            <p className="legende-modele">Modèle</p>
            <p className="legende-emplacement">Emplacement</p>
            <p className="legende-pick">Pick-up location</p>
            <p className="legende-drop">Drop-off location</p>
            <p className="legende-status1">Status</p>
          </div>
          <div className="rechercheConteneur">
            {reservationData.map((res) =>
              res.status === "En cours" ? (
                <div className="book-list">
                  <p className="book-modele">{res.car.fabricator}</p>
                  <p className="book-details">{res.startDate}</p>
                  <p className="book-details">{res.pickUpAdress.adresse}</p>
                  <p className="book-details">{res.deliveryAdress.adresse}</p>
                  <p className="book-status">Current</p>
                  <button className="cancel-button">CancelTerminée</button>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
      <div className="book-container">
        <h2 id="statusRes">Past Reservations</h2>
        <div className="search-box-conteneur">
          <input
            onChange={filterSearch}
            type="text"
            className="search-box"
            placeholder="Find booking..."
          />
          <div className="legende">
            <p className="legende-modele">Modèle</p>
            <p className="legende-emplacement">Emplacement</p>
            <p className="legende-pick">Pick-up location</p>
            <p className="legende-drop">Drop-off location</p>
            <p className="legende-status1">Status</p>
          </div>
          <div className="rechercheConteneur">
            {reservationData.map((res) =>
              res.status === "Terminée" ? (
                <div className="book-list">
                  <p className="book-modele">{res.car.fabricator}</p>
                  <p className="book-details">{res.startDate}</p>
                  <p className="book-details">{res.pickUpAdress.adresse}</p>
                  <p className="book-details">{res.deliveryAdress.adresse}</p>
                  <p className="book-status">Finished</p>
                  <button className="cancel-button">Cancel</button>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Reservation;
