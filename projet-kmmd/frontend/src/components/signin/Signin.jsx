import { Link } from "react-router-dom";
import "../Form.css";

export default function Signin() {
  return (
    <div className="form-container">
      <form>
        <div className="form-group">
          <div className="btnChoix">
            <Link to="/signInEmployeur">
              <button type="button" className="choix employeur">
                Employeur
              </button>
            </Link>
            <Link to="/signInCandidat">
              <button type="button" className="choix candidat">
                Candidat
              </button>
            </Link>
          </div>
          <Link to="/">
            <button>Retour</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
