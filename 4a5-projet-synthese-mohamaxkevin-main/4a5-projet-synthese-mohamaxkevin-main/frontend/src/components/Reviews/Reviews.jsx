import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Review = ({ isOpen, car, setIsOpen }) => {
  if (!isOpen) {
    return;
  }
  const reviews = car.reviews;
  const navigate = useNavigate();
  const sendToReview = () => {
    const param = new URLSearchParams();
    param.append("carId", car._id);
    navigate(`/review?${param.toString()}`);
  };

  const [comfort, setComfort] = useState(0);
  const [cleanliness, setCleanliness] = useState(0);
  const [pickUpReturn, setPickUpReturn] = useState(0);
  const [valueForMoney, setValueForMoney] = useState(0);
  useEffect(() => {
    let totalComfort = 0;
    let totalCleanliness = 0;
    let totalPickUpReturn = 0;
    let totalValueForMoney = 0;

    if (reviews && reviews.length > 0) {
      reviews.forEach((review) => {
        totalComfort += review.comfort;
        totalCleanliness += review.cleanliness;
        totalPickUpReturn += review.pickUpReturn;
        totalValueForMoney += review.valueForMoney;
      });
    }

    // Calcul des moyennes
    const averageComfort = totalComfort / reviews.length;
    const averageCleanliness = totalCleanliness / reviews.length;
    const averagePickUpReturn = totalPickUpReturn / reviews.length;
    const averageValueForMoney = totalValueForMoney / reviews.length;

    // Mise à jour des états avec les moyennes calculées
    setComfort(averageComfort.toFixed(1));
    setCleanliness(averageCleanliness.toFixed(1));
    setPickUpReturn(averagePickUpReturn.toFixed(1));
    setValueForMoney(averageValueForMoney.toFixed(1));
  }, [reviews]);

  // A FAIRE : CALCULER LA MOYENNE DE CHAQUE ATTRIBUT

  // A FAIRE : CREE UNE PAGE WRITE REVIEW ET MODIFIE LA REDIRECTION DU BOUTON VERS CETTE PAGE

  return (
    <div className="popup">
      <div className="location">
        <div className="header-location">
          <button className="close-popup" onClick={() => setIsOpen(false)}>
            &times;
          </button>
        </div>
        <div className="car-popup">
          <div className="car-image">
            <img src={car.image} id="image-pop-up"></img>
            <div className="car-infos">
              <p className="titre-popup">{car.model}</p>
              <ul>
                <li>Comfort : {comfort}</li>
                <li>cleanliness : {cleanliness}</li>
                <li>pickUp and Return : {pickUpReturn}</li>
                <li>value For Money : {valueForMoney}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="book-pop">
          <button onClick={sendToReview} className="book">
            Write Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
