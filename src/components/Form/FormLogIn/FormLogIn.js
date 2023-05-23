import React from "react";
import "./formLogIn.css";

import NavBar from "../../NavBar/NavBar";
import InputLogin from "./InputLogin";

const FormLogIn = () => {
  return (
    <div className="formLogIn-container">
      <NavBar />
      <div class="LogIn">
        <div class="form">
          <h3 class="form-tittle form-all">Iniciar Sesión</h3>
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
          <a href="#" class="form-input-link">
            Olvidaste tu contraseña?
          </a>
          <div>
            <button class="form-button">Iniciar sesión</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLogIn;
