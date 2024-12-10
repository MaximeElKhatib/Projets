import "./Footer.css";
import React from "react";
import { Link } from "react-router-dom";
import phoneIcon from "../../assets/phone_icon.png";
import mailIcon from "../../assets/mail_icon.png";

export const ReactFooter = () => {
  return (
    <footer className="footer-home">
      <div className="footer-elem">
        <h4>ENTRER EN CONTACT</h4>
      </div>

      <div className="footer-elem">
        <Link to="/contact">
          <img src={phoneIcon} alt="Icône de téléphone" />
        </Link>
        <Link to="/contact">
          <img src={mailIcon} alt="Icône d'e-mail" />
        </Link>
      </div>
    </footer>
  );
};
