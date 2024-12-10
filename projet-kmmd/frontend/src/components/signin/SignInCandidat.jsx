import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Form.css";
import { useUser } from "../../Context/UserContext";

export default function SigninCandidat() {
  const { login } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    location: "",
    profilePicture: "",
  });

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    phoneNumber: false,
    location: false,
    profilePicture: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      setTimeout(() => {
        resetErrors();
      }, 500);
      return;
    }

    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "candidate/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const userData = { ...data, role: "candidat" };
      login(userData);

      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = true;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetErrors = () => {
    setErrors({
      firstName: false,
      lastName: false,
      email: false,
      password: false,
      phoneNumber: false,
      location: false,
      profilePicture: false,
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1 className="center-h1">Sign Up</h1>
        <div className="form-group">
          <label>
            Prénom:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={errors.firstName ? "error" : ""}
            />
          </label>
        </div>
        <hr />
        <div className="form-group">
          <label>
            Nom:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={errors.lastName ? "error" : ""}
            />
          </label>
        </div>
        <hr />
        <div className="form-group">
          <label>
            Courriel:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />
          </label>
        </div>
        <hr />
        <div className="form-group">
          <label>
            Cree un Mot de Passe:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "error" : ""}
            />
          </label>
        </div>
        <hr />
        <div className="form-group">
          <label>
            Numéro de téléphone:
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={errors.phoneNumber ? "error" : ""}
            />
          </label>
        </div>
        <hr />
        <div className="form-group">
          <label>
            Emplacement:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={errors.location ? "error" : ""}
            />
          </label>
        </div>
        <hr />
        <div className="form-group">
          <label>
            Profile Picture:
            <input
              type="url"
              name="profilePicture"
              value={formData.profilePicture}
              onChange={handleChange}
              className={errors.profilePicture ? "error" : ""}
            />
          </label>
        </div>
        <hr />
        <div className="form-group">
          <button type="submit">Sign Up</button>
          <Link to="/login">
            <button type="button">Log in</button>
          </Link>
          <Link to="/signin">
            <button type="button">Retour</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
