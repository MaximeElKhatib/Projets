import { Link } from "react-router-dom";
import "./LoginForm.css";
import React, { useContext, useEffect, useState } from "react";
import { RiUser3Fill } from "react-icons/ri";
import { RiLockPasswordFill } from "react-icons/ri";
import { AuthContext } from "../../Containers/AuthContext";
import rent from "../../assets/rent.jpg";
import sideDrawerLogin from "../sideDrawer/sideDrawerLogin";
import { useHttpClient } from "../../hook/http-hook";

export default function LoginForm() {
  const [side, setSide] = useState(true);
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [entredValues, setEntredValues] = useState({
    email: "",
    password: "",
  });

  const handleSide = () => {
    setSide(!side);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await sendRequest(
        "https://foura5-projet-synthese-mohamaxkevin-yf32.onrender.com/api/user/login",
        "POST",
        JSON.stringify(entredValues),
        {
          "Content-Type": "application/json",
        }
      );

      auth.login(response.userId, response.token, response.isAdmin);
      console.log(userId);
    } catch (err) {
      console.error(err);
    }
    setEntredValues({
      email: "",
      password: "",
    });
  };

  const handleInput = (event) => {
    const attribut = event.target.name;
    const value = event.target.value;
    setEntredValues({
      ...entredValues,
      [attribut]: value,
    });
  };

  return (
    <>
      <Link to="/" className="titreLog">
        <img id="logo" src={rent} />
        RentWheels
      </Link>
      {side ? (
        <sideDrawerLogin>
          <div className="sideSign">
            <button className="closeSide" onClick={handleSide}>
              &times;
            </button>
            <h1 className="new">NEW HERE ?</h1>
            <p className="new1">
              Sign up right now and have the chance to rent a car!
            </p>
            <Link to="/signup" className="side-link">
              Sign up
            </Link>
          </div>
        </sideDrawerLogin>
      ) : (
        <button className="openSide" onClick={handleSide}>
          &larr;
        </button>
      )}

      <div className="login-page">
        <div className="conteneur">
          <form onSubmit={authSubmitHandler}>
            <h1>Login</h1>
            <div className="valInput">
              <input
                type="text"
                placeholder="Email"
                id="email"
                name="email"
                value={entredValues.email}
                onChange={handleInput}
                required
              ></input>
              <RiUser3Fill className="symbole" />
            </div>
            <div className="valInput">
              <input
                type="text"
                id="password"
                name="password"
                placeholder="Password"
                value={entredValues.password}
                onChange={handleInput}
                required
              ></input>
              <RiLockPasswordFill className="symbole" />
            </div>
            <div className="remember">
              <label>
                <input type="checkbox"></input>Remember Me
              </label>
              <a href="#">Forgot Password</a>
            </div>
            <div className="buttonLog">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
