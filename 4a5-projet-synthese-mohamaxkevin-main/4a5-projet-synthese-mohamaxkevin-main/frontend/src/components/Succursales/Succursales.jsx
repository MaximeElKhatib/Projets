import React, { useState, useEffect } from "react";
import "./Succursales.css";
import { useHttpClient } from "../../hook/http-hook";

const ReactSuccursales = () => {
  const { isLoading, error, sendRequest } = useHttpClient();
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

  return (
    <div className="succursales-container">
      <h1 className="succursales-title">Nos succursales</h1>
      <div className="branches-container">
        {succursales.map((succursale) => (
          <div key={succursale._id} className="branch-card">
            <h2 className="branch-name">{succursale.nom}</h2>
            <p className="branch-address">{succursale.adresse}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReactSuccursales;
