import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Form.css";
import { useUser } from "../../Context/UserContext";
import { Link } from "react-router-dom";

export default function SigninEmployeur() {
  const { login } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    email: "",
    password: "",
    phoneNumber: "",
    website: "",
    companyLogo: "",
    companyDescription: "",
    location: "",
  });

  const [errors, setErrors] = useState({
    companyName: false,
    industry: false,
    email: false,
    password: false,
    phoneNumber: false,
    website: false,
    companyLogo: false,
    companyDescription: false,
    location: false,
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
        process.env.REACT_APP_BACKEND_URL + "employer/signup",
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
      const userData = { ...data, role: "entreprise" };
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
      companyName: false,
      industry: false,
      email: false,
      password: false,
      phoneNumber: false,
      website: false,
      companyLogo: false,
      companyDescription: false,
      location: false,
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1 className="center-h1">Employer Sign Up</h1>
        <div className="form-group">
          <label>
            Company Name:
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className={errors.companyName ? "error" : ""}
            />
          </label>
        </div>
        <hr />
        <div className="form-group">
          <label>
            Industry:
            <input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className={errors.industry ? "error" : ""}
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
            Website:
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className={errors.website ? "error" : ""}
            />
          </label>
        </div>
        <hr />
        <div className="form-group">
          <label>
            Company Logo:
            <input
              type="url"
              name="companyLogo"
              value={formData.companyLogo}
              onChange={handleChange}
              className={errors.companyLogo ? "error" : ""}
            />
          </label>
        </div>
        <hr />
        <div className="form-group">
          <label>
            Company Description:
            <textarea
              name="companyDescription"
              value={formData.companyDescription}
              onChange={handleChange}
              className={errors.companyDescription ? "error" : ""}
            />
          </label>
        </div>
        <hr />
        <div className="form-group">
          <label>
            Location:
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
