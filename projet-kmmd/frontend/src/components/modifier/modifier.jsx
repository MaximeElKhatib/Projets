import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../spinner/spinner";
import "../Form.css";

const Modifier = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const offre = location.state?.offre;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salaryRange: "",
    employmentType: "",
    requiredFormation: "",
    requiredExperience: "",
    linguistic_requirement: "",
    isRemote: false,
    isActive: true,
    datePosted: "",
    jobLanguage: "",
    schedule: "",
    applicationDeadline: "",
    startDate: "",
    benefits: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Pre-fill form with existing offer data
  useEffect(() => {
    if (offre) {
      setFormData({
        title: offre.title || "",
        description: offre.description || "",
        location: offre.location || "",
        salaryRange: offre.salaryRange || "",
        employmentType: offre.employmentType || "",
        requiredFormation: offre.requiredFormation || "",
        requiredExperience: offre.requiredExperience || "",
        linguistic_requirement: offre.linguistic_requirement || "",
        isRemote: offre.isRemote || false,
        isActive: offre.isActive || true,
        datePosted: offre.datePosted || "",
        jobLanguage: offre.jobLanguage || "",
        schedule: offre.schedule || "",
        applicationDeadline: offre.applicationDeadline
          ? new Date(offre.applicationDeadline).toISOString().split("T")[0]
          : "",
        startDate: offre.startDate
          ? new Date(offre.startDate).toISOString().split("T")[0]
          : "",
        benefits: offre.benefits || "",
      });
    }
  }, [offre]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (event) => {
    console.log(process.env.REACT_APP_BACKEND_URL + "jobOffer/" + offre.id);

    console.log(offre.id); // Ensure the offer ID is correct
    event.preventDefault();
    setIsLoading(true);
    console.log(formData); // Log formData before sending the request

    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "jobOffer/" + offre.id, // Correctly form the URL
        {
          method: "PATCH", // HTTP method
          headers: {
            "Content-Type": "application/json", // Set content type
          },
          body: JSON.stringify(formData), // Correct placement of JSON.stringify
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Update failed:", errorData); // Log the error
        throw new Error(errorData.message || "Failed to modify the job offer");
      }
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
        <form onSubmit={handleSubmit}>
          <h1 className="center-h1">Modifier une offre d'emploi</h1>

          {error && <p className="error">{error}</p>}
          {success && (
            <p className="success">Offre d'emploi modifiée avec succès!</p>
          )}

          {/* Form fields */}
          <div className="form-group">
            <label htmlFor="title">Titre :</label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description :</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Emplacement :</label>
            <input
              id="location"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="salaryRange">Échelle salariale :</label>
            <input
              id="salaryRange"
              type="text"
              name="salaryRange"
              value={formData.salaryRange}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="employmentType">Type d'emploi :</label>
            <input
              id="employmentType"
              type="text"
              name="employmentType"
              value={formData.employmentType}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="requiredFormation">Formation requise :</label>
            <input
              id="requiredFormation"
              type="text"
              name="requiredFormation"
              value={formData.requiredFormation}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="requiredExperience">Expérience requise :</label>
            <input
              id="requiredExperience"
              type="text"
              name="requiredExperience"
              value={formData.requiredExperience}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="isRemote">A distance? :</label>
            <input
              id="isRemote"
              type="checkbox"
              name="isRemote"
              checked={formData.isRemote}
              onChange={() => handleCheckboxChange("isRemote")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="isActive">Actif :</label>
            <input
              id="isActive"
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={() => handleCheckboxChange("isActive")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="schedule">Horaire :</label>
            <input
              id="schedule"
              type="text"
              name="schedule"
              value={formData.schedule}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="applicationDeadline">Date limite :</label>
            <input
              id="applicationDeadline"
              type="date"
              name="applicationDeadline"
              value={formData.applicationDeadline}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="benefits">Avantages :</label>
            <textarea
              id="benefits"
              name="benefits"
              value={formData.benefits}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="submit-btn">
            Modifier l'offre
          </button>
        </form>
      )}
    </div>
  );
};

export default Modifier;
