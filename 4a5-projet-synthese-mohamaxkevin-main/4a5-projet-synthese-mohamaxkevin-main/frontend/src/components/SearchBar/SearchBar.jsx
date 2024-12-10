import React, { useState } from "react";
import "../SearchBar/SearchBar.css";
import { useEffect } from "react";
export const SearchBar = ({ succursales, setPickUpLoc }) => {
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleSelectChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  useEffect(() => {
    setPickUpLoc(selectedLocation);
  }, [selectedLocation]);

  return (
    <div className="input-wrp">
      <select
        className="searchBar"
        value={selectedLocation}
        onChange={handleSelectChange}
      >
        <option value="">Select Pick-Up Location</option>
        {succursales.map((succursale) => (
          <option key={succursale._id} value={succursale.adresse}>
            {succursale.adresse}
          </option>
        ))}
      </select>
    </div>
  );
};
