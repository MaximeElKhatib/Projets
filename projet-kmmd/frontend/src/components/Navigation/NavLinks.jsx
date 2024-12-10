import "./NavLinks.css";
import { NavLink } from "react-router-dom";
import AccueilImage from "../../assets/Skillseek.PNG";
import { useUser } from "../../Context/UserContext";

const NavLinks = () => {
  const { user, logout } = useUser();

  return (
    <ul className="navbar">
      <div className="first-link">
        <li className="link1">
          <NavLink to="/">
            <img src={AccueilImage} alt="Accueil" className="accueil-image" />
          </NavLink>
        </li>
      </div>
      <div className="linkgroup">
        {user && user.role === "entreprise" && (
          <li className="link2">
            <NavLink to="/createOffer">Créer</NavLink>
          </li>
        )}

        <li className="link2">
          {user ? (
            user.role === "candidat" ? (
              <NavLink to="/offres">Offres d'emplois</NavLink>
            ) : (
              <NavLink to="/offres">Mes offres</NavLink>
            )
          ) : null}
        </li>

        {user && user.role === "candidat" && (
          <li className="link2">
            <NavLink to="/candidatures">Mes candidatures</NavLink>
          </li>
        )}

        {!user ? (
          <>
            <li className="link2">
              <NavLink to="/login">Login</NavLink>
            </li>
            <li className="link2">
              <NavLink to="/signin">Sign Up</NavLink>
            </li>
          </>
        ) : (
          <li className="link2">
            <NavLink to="/" onClick={logout}>
              Logout
            </NavLink>
          </li>
        )}
      </div>
    </ul>
  );
};

export default NavLinks;
