import React, { useState } from "react";
import "../SearchBar/SearchBar.css";
import { useEffect } from "react";

export const SearchBar2 = ({ succursales, setDropOffLoc }) => {
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleSelectChange = (event) => {
    setSelectedLocation(event.target.value);
  };
  useEffect(() => {
    setDropOffLoc(selectedLocation);
  }, [selectedLocation]);
  return (
    <div className="input-wrp">
      <select
        className="searchBar"
        value={selectedLocation}
        onChange={handleSelectChange}
      >
        <option value="">Select Drop Location</option>
        {succursales.map((succursale) => (
          <option key={succursale._id} value={succursale.adresse}>
            {succursale.adresse}
          </option>
        ))}
      </select>
    </div>
  );
};
