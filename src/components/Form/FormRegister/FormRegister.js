import React from "react";
import "./formRegister.css";

import InputRegister from "./InputRegister";
import { Link } from "react-router-dom";

const FormRegister = () => {
  return (
    <div className="form-register-container">
      <div class="register">
        <div class="register-background">
          <h3 class="register-title">Registrarse</h3>
          <form class="register-form">
            <div class="register-form-input">
              <InputRegister
                inputName={"Nombre"}
                placeholder={"Juan"}
                type={"text"}
              />
              <InputRegister
                inputName={"Apellido"}
                placeholder={"Perez"}
                type={"text"}
              />
              <InputRegister
                inputName={"Numero de telefono"}
                placeholder={"3413755012"}
                type={"number"}
              />
            </div>
            <div class="register-form-input">
              <InputRegister
                inputName={"Email"}
                placeholder={"example@gmail.com"}
                type={"email"}
              />
              <InputRegister
                inputName={"Contraseña"}
                placeholder={"*************"}
                type={"password"}
              />
              <InputRegister
                inputName={"Repetir contraseña"}
                placeholder={"*************"}
                type={"password"}
              />
            </div>
          </form>
          <div class="register-button">
            <button class="register-button-registrar">Registrarse</button>
            <p>
              ¿Poseés una cuenta? <Link to="/login" className="button-login"> Inicia sesión</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormRegister;
