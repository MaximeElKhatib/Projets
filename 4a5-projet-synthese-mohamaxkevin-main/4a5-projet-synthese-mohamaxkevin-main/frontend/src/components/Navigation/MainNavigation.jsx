import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import "./MainNavigation.css";
import rent from "../../assets/rent.jpg";

const MainNavigation = () => {
  return (
    <header className="navigation">
      <Link to="/" className="titre">
        <img id="rent" src={rent} />
        RentWheels
      </Link>
      <nav>
        <NavLinks />
      </nav>
    </header>
  );
};

export default MainNavigation;
