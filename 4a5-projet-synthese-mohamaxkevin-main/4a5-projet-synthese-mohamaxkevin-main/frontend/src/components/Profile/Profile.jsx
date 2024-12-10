import React, { useState } from "react";
import "./Profile.css";
import { useHttpClient } from "../../hook/http-hook";
import { useContext } from "react";
import { AuthContext } from "../../Containers/AuthContext";

const ReactProfile = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [mdp, setMdp] = useState("");
  const [courriel, setCourriel] = useState("");
  const updateUser = async () => {
    if (prenom !== "") {
      try {
        const response = await sendRequest(
          `https://foura5-projet-synthese-mohamaxkevin-yf32.onrender.com/api/user/${auth.userId}`,
          "PATCH",
          JSON.stringify({ prenom: prenom })
        );
      } catch (err) {
        console.log(err);
      }
    }

    if (nom !== "") {
      try {
        const response = await sendRequest(
          `https://foura5-projet-synthese-mohamaxkevin-yf32.onrender.com/api/user/${auth.userId}`,
          "PATCH",
          JSON.stringify({ nom: nom })
        );
      } catch (err) {
        console.log(err);
      }
    }
    if (mdp !== "") {
      try {
        const response = await sendRequest(
          `https://foura5-projet-synthese-mohamaxkevin-yf32.onrender.com/api/user/${auth.userId}`,
          "PATCH",
          JSON.stringify({ password: mdp })
        );
      } catch (err) {
        console.log(err);
      }
    }

    if (courriel !== "") {
      try {
        const response = await sendRequest(
          `https://foura5-projet-synthese-mohamaxkevin-yf32.onrender.com/api/user/${auth.userId}`,
          "PATCH",
          JSON.stringify({ email: courriel })
        );
      } catch (err) {
        console.log(err);
      }
    }

    setNom("");
    setPrenom("");
    setCourriel("");
    setMdp("");
  };

  return (
    <div className="profile-container">
      <h1 id="profil">Paramètres du profil</h1>

      <div className="contain-param">
        <h2>Changer le nom </h2>
        <input
          type="text"
          placeholder="Entrez un nouveau nom"
          className="input-field"
          value={nom}
          onChange={(event) => setNom(event.target.value)}
        />
      </div>
      <div className="contain-param">
        <h2>Changer le prénom </h2>
        <input
          type="text"
          placeholder="Entrez un nouveau prénom"
          className="input-field"
          value={prenom}
          onChange={(event) => setPrenom(event.target.value)}
        />
      </div>
      <div class="contain-param">
        <h2>Changer le mot de passe</h2>
        <input
          type="password"
          placeholder="Entrez un nouveau mot de passe"
          className="input-field"
          value={mdp}
          onChange={(event) => setMdp(event.target.value)}
        />
      </div>

      <div class="contain-param">
        <h2>Changer le courriel</h2>
        <input
          type="email"
          placeholder="Entrez un nouveau courriel"
          className="input-field"
          value={courriel}
          onChange={(event) => setCourriel(event.target.value)}
        />
      </div>

      <button className="submit-button" onClick={updateUser}>
        Soumettre
      </button>
    </div>
  );
};

export default ReactProfile;
