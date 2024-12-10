import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import "../Form.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "candidat",
  });

  const { login } = useUser();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    email: false,
    password: false,
    userType: false,
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
      const endpoint =
        formData.userType === "entreprise"
          ? process.env.REACT_APP_BACKEND_URL + "employer/login"
          : process.env.REACT_APP_BACKEND_URL + "candidate/login";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("userId:", data.userId); // Now it will work

      if (!data.userId) {
        console.error("User ID is not in the response data.");
        return;
      }

      login({
        userId: data.userId,
        email: data.email,
        role: formData.userType,
        token: data.token,
      });

      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = true;
    if (!formData.password.trim()) newErrors.password = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetErrors = () => {
    setErrors({
      email: false,
      password: false,
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1 className="center-h1">Log in</h1>
        <div className="form-groupe">
          <label>
            Courriel:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Courriel"
            />
          </label>
        </div>
        <div className="form-groupe">
          <label>
            Mot de passe:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mot de passe"
            />
          </label>
        </div>
        <div className="form-groupe">
          <label>
            <input
              type="radio"
              name="userType"
              value="candidat"
              checked={formData.userType === "candidat"}
              onChange={handleChange}
            />
            Candidat
          </label>
          <label>
            <input
              type="radio"
              name="userType"
              value="entreprise"
              checked={formData.userType === "entreprise"}
              onChange={handleChange}
            />
            Entreprise
          </label>
        </div>
        <div className="form-groupe">
          <button className="connecter-button" type="submit">
            Se connecter
          </button>
          <Link to="/signin">
            <button type="button">Sign Up</button>
          </Link>
          <Link to="/">
            <button type="button">Retour</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
