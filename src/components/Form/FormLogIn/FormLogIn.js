import { Link, useNavigate } from "react-router-dom";
import { db } from "../../../firebase";
import Input from "../../shared/Input/Input";
import { useState } from "react";

import "./formLogIn.css";

const FormLogIn = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [validInput, setValidInput] = useState({
    email: null,
    password: null,
  });
  const loguinFirebase = async () => {
    try {
      const querySnapshot = await db
        .collection("users")
        .where("email", "==", input.email)
        .get();
      if (querySnapshot.empty) {
        alert("Email o contraseña incorrectos");
      } else {
        const client = querySnapshot.docs[0].data();
        if (client.password === input.password) {
          navigate("/client");
        } else {
          alert("Email o contraseña incorrectos");
        }
      }
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
      alert("Ocurrió un error durante el inicio de sesión");
    }
  };
  const handlerChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handlerBlurInput = (e) => {
    const eventTarget = e.target.name;
    setValidInput({
      ...validInput,
      [eventTarget]: input[eventTarget] ? true : false,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationInputs = Object.values(validInput).some((valid) => !valid);

    if (validationInputs) {
      alert("Por favor, complete todos los campos.");
    } else {
      loguinFirebase();
    }
  };

  return (
    <div className="formLogIn-container">
      <div className="LogIn">
        <div className="form-logIn">
          <h3 className="form-tittle form-all">Iniciar Sesión</h3>
          <Input
            inputName={"Email"}
            placeholder={"example@gmail.com"}
            type={"email"}
            name={"email"}
            event={handlerChangeInput}
            onBlur={handlerBlurInput}
            validInput={validInput}
            errorMessage={"Este campo es requerido"}
          />
          <Input
            inputName={"Contraseña"}
            placeholder={"*********"}
            type={"password"}
            name={"password"}
            event={handlerChangeInput}
            onBlur={handlerBlurInput}
            validInput={validInput}
            errorMessage={"Este campo es requerido"}
          />
          <p>
            <Link to="/register" className="button-register">
              Olvidaste tu contraseña?
            </Link>
          </p>
          <div className="form-button">
            <button className="button" onClick={handleSubmit}>
              Iniciar sesión
            </button>
          </div>
          <p>
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="button-register">
              Registrarse
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormLogIn;
