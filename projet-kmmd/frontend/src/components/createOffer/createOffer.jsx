import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Form.css";
import { useUser } from "../../Context/UserContext";
import Spinner from "../spinner/spinner";

const CreateOffer = () => {
  const { user } = useUser();
  console.log(user);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salaryRange: "",
    employmentType: "",
    requiredFormation: "",
    requiredExperience: "",
    linguistic_requirement: [],
    isRemote: false,
    isActive: true,
    datePosted: "",
    jobLanguage: "",
    schedule: "",
    applicationDeadline: "",

    benefits: [],
    employeur: user.userId,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = () => {
    setFormData((prev) => ({
      ...prev,
      isRemote: !prev.isRemote,
    }));
  };
  const handleCheckboxChangeIsActive = () => {
    setFormData((prev) => ({
      ...prev,
      isActive: !prev.isActive,
    }));
  };

  const createOfferSubmitHandler = async (event) => {
    event.preventDefault();

    const newOffer = {
      ...formData,
      datePosted: new Date(),
      employeur: user.userId,
    };

    setIsLoading(true);

    try {
      console.log(JSON.stringify(newOffer));

      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "jobOffer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(newOffer),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create job offer");
      }

      setSuccess(true);
      setError(null);
      console.log(newOffer.employeur);

      setFormData({
        title: "",
        description: "",
        location: "",
        salaryRange: "",
        employmentType: "",
        requiredFormation: "",
        requiredExperience: "",
        linguistic_requirement: [],
        isRemote: false,
        isActive: true,
        datePosted: "",
        jobLanguage: "",
        schedule: "",
        applicationDeadline: "",
        benefits: [],
      });
    } catch (error) {
      setError(error.message);
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      {isLoading ? (
        <Spinner />
      ) : (
        <form onSubmit={createOfferSubmitHandler}>
          <h1 className="center-h1">Créer une offre d'emploi</h1>

          {error && <p className="error">{error}</p>}
          {success && (
            <p className="success">Offre d'emploi créée avec succès!</p>
          )}

          <div className="form-group">
            <label htmlFor="title">Titre:</label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              id="description"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Emplacement:</label>
            <input
              id="location"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="salaryRange">Échelle Salariale:</label>
            <input
              id="salaryRange"
              type="text"
              name="salaryRange"
              value={formData.salaryRange}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="employmentType">Type d'emploi:</label>
            <input
              id="employmentType"
              type="text"
              name="employmentType"
              value={formData.employmentType}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="requiredFormation">Formation Requise:</label>
            <input
              id="requiredFormation"
              type="text"
              name="requiredFormation"
              value={formData.requiredFormation}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="requiredExperience">Expérience Requise:</label>
            <input
              id="requiredExperience"
              type="text"
              name="requiredExperience"
              value={formData.requiredExperience}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="isRemote">A distance:</label>
            <input
              id="isRemote"
              type="checkbox"
              checked={formData.isRemote}
              onChange={handleCheckboxChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="isActive">Active?:</label>
            <input
              id="isActive"
              type="checkbox"
              checked={formData.isActive}
              onChange={handleCheckboxChangeIsActive}
            />
          </div>

          <div className="form-group">
            <label htmlFor="jobLanguage">Langue de Travail:</label>
            <input
              id="jobLanguage"
              type="text"
              name="jobLanguage"
              value={formData.jobLanguage}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="schedule">Heures de travail (matin/nuit):</label>
            <input
              id="schedule"
              type="text"
              name="schedule"
              value={formData.schedule}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="applicationDeadline">
              Date Limite De Candidature:
            </label>
            <input
              id="applicationDeadline"
              type="date"
              name="applicationDeadline"
              value={formData.applicationDeadline}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="benefits">Avantages:</label>
            <input
              id="benefits"
              type="text"
              name="benefits"
              value={formData.benefits}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <button type="submit">Créer Offre</button>
            <Link to="/">
              <button type="button">Retourner à l'accueil</button>
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateOffer;
