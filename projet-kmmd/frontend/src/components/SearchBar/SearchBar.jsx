import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

export const SearchBar = ({ onSearch }) => {
  const [offerQuery, setOfferQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [offerError, setOfferError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const navigate = useNavigate();

  const handleOfferChange = (event) => {
    setOfferQuery(event.target.value);
    if (isValidQuery(event.target.value)) {
      setOfferError(false);
    }
  };

  const handleLocationChange = (event) => {
    setLocationQuery(event.target.value);
    if (isValidQuery(event.target.value)) {
      setLocationError(false);
    }
  };

  const isValidQuery = (query) => {
    return query.trim() !== "" && !/\d/.test(query);
  };

  const handleSearch = () => {
    const offerValid = isValidQuery(offerQuery);
    const locationValid = isValidQuery(locationQuery);

    if (offerValid && locationValid) {
      onSearch({ offer: offerQuery, location: locationQuery });
      navigate("/offres");
    } else {
      setOfferError(!offerValid);
      setLocationError(!locationValid);
      setTimeout(() => {
        setOfferError(false);
        setLocationError(false);
      }, 500);
    }
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={offerQuery}
        onChange={handleOfferChange}
        placeholder="Search offers..."
        className={`search-input offer-input ${offerError ? "error" : ""}`}
      />
      <input
        type="text"
        value={locationQuery}
        onChange={handleLocationChange}
        placeholder="Search locations..."
        className={`search-input location-input ${
          locationError ? "error" : ""
        }`}
      />
      <button disabled={true} onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};
