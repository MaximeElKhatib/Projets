import React, { useState } from "react";
import "./ReviewP.css";
import { useHttpClient } from "../../hook/http-hook";
import { useLocation } from "react-router-dom";
const ReviewForm = ({ onSubmit }) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const location = useLocation();
  const getParams = new URLSearchParams(location.search);
  const carId = getParams.get("carId");

  const [formData, setFormData] = useState({
    carId: carId,
    rating: "",
    comment: "",
    date: new Date().toISOString().split("T")[0],
    comfort: "",
    cleanliness: "",
    pickUpReturn: "",
    valueForMoney: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    const requiredFields = [
      "rating",
      "comfort",
      "cleanliness",
      "pickUpReturn",
      "valueForMoney",
    ];

    requiredFields.forEach((field) => {
      const value = formData[field];
      if (!value.trim()) {
        newErrors[field] = `The ${field} rating is required.`;
      } else if (
        isNaN(Number(value)) ||
        Number(value) < 1 ||
        Number(value) > 10
      ) {
        newErrors[
          field
        ] = `The ${field} rating must be a number between 1 and 10.`;
      }
    });

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
    console.log(formData);
    try {
      const fecthReview = async () => {
        const response = await sendRequest(
          `https://foura5-projet-synthese-mohamaxkevin-yf32.onrender.com/api/review`,
          "POST",
          JSON.stringify({
            carId: formData.carId,
            rating: formData.rating,
            comment: formData.comment,
            date: formData.date,
            comfort: formData.comfort,
            cleanliness: formData.cleanliness,
            pickUpReturn: formData.pickUpReturn,
            valueForMoney: formData.valueForMoney,
          })
        );
      };
      fecthReview();
    } catch (err) {
      console.log(err);
    }
    setFormData({
      carId: carId,
      rating: "",
      comment: "",
      date: new Date().toISOString().split("T")[0],
      comfort: "",
      cleanliness: "",
      pickUpReturn: "",
      valueForMoney: "",
    });
  };

  return (
    <section className="reviewSection">
      <div className="reviewContainer">
        <h2 className="reviewHeading">Rate Your Experience</h2>
        <form>
          <div className="reviewRow">
            <input
              type="text"
              placeholder="Comfort (1-10)"
              name="comfort"
              value={formData.comfort}
              onChange={handleInputChange}
              className="reviewInput"
            />
            {errors.comfort && (
              <span className="reviewError">{errors.comfort}</span>
            )}
          </div>
          <div className="reviewRow">
            <input
              type="text"
              placeholder="Cleanliness (1-10)"
              name="cleanliness"
              value={formData.cleanliness}
              onChange={handleInputChange}
              className="reviewInput"
            />
            {errors.cleanliness && (
              <span className="reviewError">{errors.cleanliness}</span>
            )}
          </div>
          <div className="reviewRow">
            <input
              type="text"
              placeholder="Pick-Up and Return (1-10)"
              name="pickUpReturn"
              value={formData.pickUpReturn}
              onChange={handleInputChange}
              className="reviewInput"
            />
            {errors.pickUpReturn && (
              <span className="reviewError">{errors.pickUpReturn}</span>
            )}
          </div>
          <div className="reviewRow">
            <input
              type="text"
              placeholder="Value For Money (1-10)"
              name="valueForMoney"
              value={formData.valueForMoney}
              onChange={handleInputChange}
              className="reviewInput"
            />
            {errors.valueForMoney && (
              <span className="reviewError">{errors.valueForMoney}</span>
            )}
          </div>
          <div className="reviewRow">
            <input
              type="text"
              placeholder="car Rating (1-10)"
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
              className="reviewInput"
            />
            {errors.rating && (
              <span className="reviewError">{errors.rating}</span>
            )}
          </div>
          <div className="reviewRow">
            <textarea
              placeholder="Leave a comment (optional)"
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              className="formTextarea"
            />
            {errors.message && (
              <span className="reviewRow">{errors.message}</span>
            )}
          </div>
          {errors.submission && (
            <div className="reviewRow reviewError">{errors.submission}</div>
          )}
          <div className="reviewRow">
            <button
              type="submit"
              className="reviewSubmit"
              onClick={handleSubmit}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
        {submissionSuccess && (
          <div className="reviewRow reviewConfirmation">
            Your review has been submitted successfully!
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewForm;
