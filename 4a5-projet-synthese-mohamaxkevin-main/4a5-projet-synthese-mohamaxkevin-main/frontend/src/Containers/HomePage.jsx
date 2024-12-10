import React, { useState, useEffect } from "react";
import styles from "../components/styles.modules.css";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { SearchBar2 } from "../components/SearchBar2/SearchBar2";
import { ReactDatePicker } from "../components/DatePicker/DatePicker";
import { ReactDatePicker2 } from "../components/DatePicker/DatePicker2";
import { ReactChoix } from "../components/DropOffChoice/DropOffChoice";
import { ReactFooter } from "../components/Footer/Footer";
import { Link } from "react-router-dom";
import { useHttpClient } from "../hook/http-hook";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [sameLocation, setSameLocation] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [succursales, setSuccursales] = useState([]);
  const [pickUpLoc, setPickUpLoc] = useState("");
  const [dropOffLoc, setDropOffLoc] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  const sendToVoitures = () => {
    if (pickUpLoc && startDate && endDate && (!sameLocation || dropOffLoc)) {
      const param = new URLSearchParams();
      param.append("pickUpLoc", pickUpLoc);
      param.append("dropOffLoc", dropOffLoc);
      param.append("startDate", startDate);
      param.append("endDate", endDate);
      navigate(`/voitures?${param.toString()}`);
    } else {
      console.log("Veuillez remplir tous les champs nécessaires.");
    }
  };

  useEffect(() => {
    const fetchSuccursales = async () => {
      try {
        const response = await sendRequest(
          `https://foura5-projet-synthese-mohamaxkevin-yf32.onrender.com/api/succursale`
        );
        setSuccursales(response.succursales);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSuccursales();
  }, [sendRequest]);

  return (
    <div className="body">
      <div className="App">
        <div className="bar-container">
          <div className="location-h">
            <ReactChoix
              location={sameLocation}
              modifySameLocation={setSameLocation}
            />
            <div className="searchLocation">
              <SearchBar
                succursales={succursales}
                setPickUpLoc={setPickUpLoc}
              />
              {sameLocation && (
                <SearchBar2
                  succursales={succursales}
                  setDropOffLoc={setDropOffLoc}
                />
              )}
            </div>
          </div>
          <ReactDatePicker setStartDate={setStartDate} />
          <ReactDatePicker2 setEndDate={setEndDate} />
          <button
            className="buttonRecherche"
            name="Voir Véhicules"
            onClick={sendToVoitures}
            disabled={
              !pickUpLoc ||
              !startDate ||
              !endDate ||
              (sameLocation && !dropOffLoc)
            }
          >
            Voir Véhicules
          </button>
          <div></div>
        </div>
      </div>
      <ReactFooter />
    </div>
  );
};

export default HomePage;
