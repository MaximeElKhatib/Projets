import React, { useState } from "react";
import "./itemApplication.css";

const ItemApplication = ({ application }) => {
  const [status, setStatus] = useState({
    revue: false,
    selectionne: false,
    rejete: false,
  });

  const handleStatusChange = (event) => {
    const { name, checked } = event.target;
    setStatus((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmitStatus = () => {
    console.log("Statut mis à jour :", status);
  };

  return (
    <div className="container">
      <div className="title-container">
        <h1 className="application-title">
          {application.candidate[0].firstName}{" "}
          {application.candidate[0].lastName}
        </h1>
      </div>

      <div className="info">
        <i className="info-icon fas fa-envelope"></i>
        <span className="info-text">{application.candidate[0].email}</span>
      </div>

      <div className="footer">
        <p>
          Postulée le :{" "}
          {new Date(application.applicationDate).toLocaleDateString()}
        </p>
      </div>

      <div className="status-checkboxes">
        <label>
          <input
            type="checkbox"
            name="revue"
            checked={status.revue}
            onChange={handleStatusChange}
          />
          Revue
        </label>
        <label>
          <input
            type="checkbox"
            name="selectionne"
            checked={status.selectionne}
            onChange={handleStatusChange}
          />
          Sélectionné(e)
        </label>
        <label>
          <input
            type="checkbox"
            name="rejete"
            checked={status.rejete}
            onChange={handleStatusChange}
          />
          Rejeté(e)
        </label>
      </div>

      <button onClick={handleSubmitStatus} className="submit-status-button">
        Soumettre le statut
      </button>
    </div>
  );
};

export default ItemApplication;
