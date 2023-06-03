import React from "react";
import { Link } from "react-router-dom";

import InputLogin from "./InputLogin";

import "./formLogIn.css";


const FormLogIn = () => {
  return (
    <div className="formLogIn-container">
      <div className="LogIn">
        <div className="form">
          <h3 className="form-tittle form-all">Iniciar Sesión</h3>
          <InputLogin
            inputName={"Email"}
            type={"email"}
            placeholder={"example@gmail.com"}
          />
          <InputLogin
            inputName={"Contraseña"}
            type={"password"}
            placeholder={"*********"}
          />
          <Link to="/register">
            <button className="form-input-link">Olvidaste tu contraseña?</button>
          </Link>
          <div>
            <button className="form-button">Iniciar sesión</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLogIn;
