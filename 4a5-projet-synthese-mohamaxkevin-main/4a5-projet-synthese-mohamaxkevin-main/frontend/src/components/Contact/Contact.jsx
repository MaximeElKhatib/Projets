import React, { useState } from "react";
import "./Contact.css";

export const ReactContact = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nom: "",
    numéro: "",
    courriel: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.nom.trim()) {
      newErrors.nom = "Le nom est obligatoire.";
    }
    if (!formData.numéro.trim()) {
      newErrors.numéro = "Le numéro de téléphone est obligatoire.";
    }
    if (!formData.courriel.trim()) {
      newErrors.courriel = "L'adresse courriel est obligatoire.";
    } else if (!/\S+@\S+\.\S+/.test(formData.courriel)) {
      newErrors.courriel = "L'adresse courriel est invalide.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Le message est obligatoire.";
    }
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    onSubmit(formData)
      .then(() => {
        setSubmissionSuccess(true);
        setFormData({
          nom: "",
          numéro: "",
          courriel: "",
          message: "",
        });
      })
      .catch((error) => {
        setErrors({
          submission:
            "Une erreur s'est produite lors de la soumission. Veuillez réessayer.",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section className="contactSection">
      <div className="formContainer">
        <h2 className="contactHeading">CONTACTEZ-NOUS</h2>
        <form onSubmit={handleSubmit}>
          <div className="formRow">
            <input
              type="text"
              placeholder="Nom"
              name="nom"
              value={formData.nom}
              onChange={handleInputChange}
              className="formInput"
            />
            {errors.nom && <span className="formError">{errors.nom}</span>}
          </div>
          <div className="formRow">
            <input
              type="text"
              placeholder="Numéro"
              name="numéro"
              value={formData.numéro}
              onChange={handleInputChange}
              className="formInput"
            />
            {errors.numéro && (
              <span className="formError">{errors.numéro}</span>
            )}
          </div>
          <div className="formRow">
            <input
              type="email"
              placeholder="Courriel"
              name="courriel"
              value={formData.courriel}
              onChange={handleInputChange}
              className="formInput"
            />
            {errors.courriel && (
              <span className="formError">{errors.courriel}</span>
            )}
          </div>
          <div className="formRow">
            <textarea
              placeholder="Message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="formTextarea"
            />
            {errors.message && (
              <span className="formError">{errors.message}</span>
            )}
          </div>
          {errors.submission && (
            <div className="formRow">{errors.submission}</div>
          )}
          <div className="formRow">
            <button
              type="submit"
              className="formSubmit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "EN COURS..." : "ENVOYER"}
            </button>
          </div>
        </form>
        {submissionSuccess && (
          <div className="formRow formConfirmation">
            Votre message a été envoyé avec succès!
          </div>
        )}
      </div>
    </section>
  );
};
