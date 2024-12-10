import { useState, useEffect } from "react"; // Import useEffect for initial state setup
import CreateCopie from "../createOffer/createCopie";
import "./itemOffre.css";
import { useUser } from "../../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";

const ItemOffre = ({ offre, onDelete }) => {
  const { user } = useUser();
  const [isActive, setIsActive] = useState(offre.isActive); // Local state for isActive
  const navigate = useNavigate();

  // Ensure local state is in sync with the incoming props (if it can change)
  useEffect(() => {
    setIsActive(offre.isActive);
  }, [offre.isActive]);

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}jobOffer/${offre.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.ok) {
        onDelete(offre.id);
      } else {
        console.error("Impossible de supprimer l'offre");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleNavigation = (paramValue) => {
    navigate(`/JobApplications/${paramValue}`);
  };
  const handleNavigationCopie = (paramValue) => {
    navigate(`/createCopie/${paramValue}`, { state: { offre: offre } });
  };
  const handleNavigationModifier = (paramValue) => {
    navigate(`/modifier/${paramValue}`, { state: { offre: offre } });
  };

  const handleToggle = async (e) => {
    const newIsActive = e.target.checked;
    setIsActive(newIsActive);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}jobOffer/${offre.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ isActive: newIsActive }),
        }
      );

      if (!response.ok) {
        console.error("Failed to update job offer status");

        setIsActive(offre.isActive);
      }
    } catch (err) {
      console.error(err);

      setIsActive(offre.isActive);
    }
  };

  return (
    <div className="container">
      <div className="title-container">
        <h1 className="offer-title">{offre.title}</h1>
        {user && user.role === "entreprise" && (
          <label className="toggle-control">
            <input type="checkbox" checked={isActive} onChange={handleToggle} />
            <span className="control"></span>
          </label>
        )}
      </div>

      <div className="info">
        <i className="info-icon fas fa-map-marker-alt"></i>
        <span className="info-text">{offre.employer}</span>
      </div>

      <div className="info">
        <i className="info-icon fas fa-location-arrow"></i>
        <span className="info-text">{offre.location}</span>
      </div>

      <div className="buttons">
        <button className="button primary">{offre.salaryRange}</button>
        <button className="button">{offre.employmentType}</button>
        <button className="button">{offre.schedule}</button>
      </div>

      <div className="description">
        <p>{offre.description.substring(0, 200)}...</p>
      </div>

      <div className="footer">
        <p>Posted: {offre.datePosted}</p>
      </div>

      {user && user.role === "entreprise" && (
        <button className="delete-button" onClick={handleDelete}>
          Supprimer
        </button>
      )}
      {user && user.role === "entreprise" && (
        <button
          className="delete-button"
          onClick={() => handleNavigation(offre.id)}
        >
          Voir Candidatures
        </button>
      )}
      {user && user.role === "entreprise" && (
        <button
          className="button"
          onClick={() => handleNavigationCopie(offre.id)}
        >
          Faire une copie
        </button>
      )}
      {user && user.role === "entreprise" && (
        <button
          className="button"
          onClick={() => handleNavigationModifier(offre.id)}
        >
          Modifier
        </button>
      )}
    </div>
  );
};

export default ItemOffre;
