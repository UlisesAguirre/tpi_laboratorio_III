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
          
            <p><Link to="/register" className="button-register">Olvidaste tu contraseña?</Link></p>
          
          <div>
            <button className="form-button">Iniciar sesión</button>
          </div>
          <p>¿No tienes cuenta? <Link to="/register" className="button-register">Registrarse</Link></p>
        </div>
      </div>
    </div>
  );
};

export default FormLogIn;
