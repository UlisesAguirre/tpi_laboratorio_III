import { Link } from "react-router-dom";

import InputLogin from "./InputLogin";

import "./formLogIn.css";


const FormLogIn = () => {
  return (
    <div className="formLogIn-container">
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
          <p>¿No tienes cuenta? <Link to="/register" className="button-register">Registrarse</Link></p>
        </div>
      </div>
    </div>
  );
};

export default FormLogIn;
