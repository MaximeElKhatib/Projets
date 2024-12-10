import React, { useState, useEffect } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import Spinner from "../spinner/spinner";
import "./Accueil.css";

export default function Accueil() {
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="accueil-container">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="title">Accueil</h1>
          <SearchBar onSearch={handleSearch} />
        </>
      )}
    </div>
  );
}
