import { useContext } from "react";
import "./NavLinks.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Containers/AuthContext";

const NavLinks = () => {
  const auth = useContext(AuthContext);

  const handleSignOut = () => {
    auth.logout();
  };

  return (
    <ul className="navbar">
      {auth.isLoggedIn ? (
        <div className="first-link">
          <li className="link1">
            <NavLink to="/voitures">Voitures</NavLink>
          </li>
          <li className="link1">
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li className="link1">
  {auth.isAdmin ? (
    <NavLink to="/reservations">Les Réservations</NavLink> 
  ) : (
    <NavLink to="/reservations">Mes Réservations</NavLink>
  )}
</li>
          <li className="link1">
            <NavLink to="/succursales">Nos Succursales</NavLink>
          </li>
          <li onClick={handleSignOut} className="link1">
            SiGN OUT
          </li>
        </div>
      ) : (
        <>
          <div className="first-link">
            <li className="link1">
              <NavLink to="/voitures">Voitures</NavLink>
            </li>
            <li className="link1">
              <NavLink to="/succursales">Nos Succursale</NavLink>
            </li>
          </div>
          <li className="link2">
            <NavLink to="/signup">Login/Sign-Up</NavLink>
          </li>
        </>
      )}
    </ul>
  );
};
export default NavLinks;
