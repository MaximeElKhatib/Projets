import { useState } from "react";
import { RiUser3Fill } from "react-icons/ri";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import "./SignUp.css";
import rent from "../../assets/rent.jpg";
import sideDrawerLogin from "../sideDrawer/sideDrawerLogin";
import { useHttpClient } from "../../hook/http-hook";

export default function SignUp() {
  const [side, setSide] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [entredValues, setEntredValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleSide = () => {
    setSide(!side);
  };
  const handleInput = (event) => {
    const attribut = event.target.name;
    const value = event.target.value;
    setEntredValues({
      ...entredValues,
      [attribut]: value,
    });
  };
  const SignUpSubmitHandler = async (event) => {
    event.preventDefault();

    console.log(entredValues.firstName);
    console.log(entredValues.lastName);
    console.log(entredValues.email);

    try {
      const response = await sendRequest(
        "https://foura5-projet-synthese-mohamaxkevin-yf32.onrender.com/api/user/signup",
        "POST",
        JSON.stringify({
          nom: entredValues.lastName,
          prenom: entredValues.firstName,
          email: entredValues.email,
          password: entredValues.password,
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {
      console.error(err);
    }

    setEntredValues({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
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
            <h1 className="new">ALREADY HAVE AN ACCOUNT ?</h1>
            <p className="new1">Log in by clicking the link down below.</p>
            <Link to="/login" className="side-link">
              Log in
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
          <form onSubmit={SignUpSubmitHandler}>
            <h1>Sign in</h1>
            <div className="valInput">
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={entredValues.firstName}
                onChange={handleInput}
                required
              ></input>
              <RiUser3Fill className="symbole" />
            </div>
            <div className="valInput">
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={entredValues.lastName}
                onChange={handleInput}
                required
              ></input>
              <RiUser3Fill className="symbole" />
            </div>
            <div className="valInput">
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                value={entredValues.email}
                onChange={handleInput}
                required
              ></input>
              <MdEmail className="symbole" />
            </div>
            <div className="valInput">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={entredValues.password}
                onChange={handleInput}
                required
              ></input>
              <RiLockPasswordFill className="symbole" />
            </div>
            <div className="valInput">
              <input
                type="password"
                id="confirm-password"
                name="cpassword"
                placeholder="Confirm Password"
                value={entredValues.cpassword}
                onChange={handleInput}
                required
              ></input>
              <RiLockPasswordFill className="symbole" />
            </div>
            <div className="buttonLog">
              <button type="submit">Sign in</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
