import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import InputRegister from "./InputRegister/InputRegister";
import "./formRegister.css";

const FormRegister = () => {
  const [input, setInput] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validInput, setValidInput] = useState({
    name: null,
    lastName: null,
    phone: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  const regex = {
    name:/^[a-zA-Z]{3,}$/,
    lastName: /^[a-zA-Z]{3,}$/,
    phone: /^\d{10}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  };

  const handlerChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handlerBlurInput = (e) => {
    const eventTarget = e.target.name;
    setValidInput({
      ...validInput,
      [eventTarget]:
        eventTarget !== "confirmPassword"
          ? regex[eventTarget].test(input[eventTarget])
          : input.confirmPassword === input.password,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationInputs = Object.values(validInput).some((valid) => !valid);

    if (validationInputs) {
      alert("Por favor, complete correctamente todos los campos.");
    } else {
      alert("Se ha registrado exitosamente!");
    }
  };

  return (
    <div className="form-register-container">
      <div className="register">
        <div className="register-background">
          <h3 className="register-title">Registrarse</h3>
          <form className="register-form">
            <div className="register-form-input">
              <InputRegister
                inputName={"Nombre"}
                name={"name"}
                placeholder={"Juan"}
                type={"text"}
                value={input.name}
                event={handlerChangeInput}
                onBlur={handlerBlurInput}
                validInput={validInput}
                errorMessage={"El nombre debe contener solo letras y un minimo de 3 caracteres"}
              />
              <InputRegister
                inputName={"Apellido"}
                name={"lastName"}
                placeholder={"Perez"}
                type={"text"}
                value={input.lastName}
                event={handlerChangeInput}
                onBlur={handlerBlurInput}
                validInput={validInput}
                errorMessage={"El apellido debe contener solo letras y un minimo de 3 caracteres"}
              />
              <InputRegister
                inputName={"Numero de telefono"}
                name={"phone"}
                placeholder={"3413755012"}
                type={"number"}
                value={input.phone}
                event={handlerChangeInput}
                onBlur={handlerBlurInput}
                validInput={validInput}
                errorMessage={"El numero de telefono debe estar compuesto por 10 numeros"}
              />
            </div>
            <div className="register-form-input">
              <InputRegister
                inputName={"Email"}
                name={"email"}
                placeholder={"example@gmail.com"}
                type={"email"}
                value={input.email}
                event={handlerChangeInput}
                onBlur={handlerBlurInput}
                validInput={validInput}
                errorMessage={"Email invalido: respete el formato(example@gmail.com)"}
              />
              <InputRegister
                inputName={"Contraseña"}
                name={"password"}
                placeholder={"*************"}
                type={"password"}
                input={input.password}
                event={handlerChangeInput}
                onBlur={handlerBlurInput}
                validInput={validInput}
                errorMessage={"La contraseña debe contener al menos una minuscula,una mayuscula, un digito y una lonigtud minima de 8 caracteres"}
                />
              <InputRegister
                inputName={"Repetir contraseña"}
                name={"confirmPassword"}
                placeholder={"*************"}
                type={"password"}
                input={input.confirmPassword}
                event={handlerChangeInput}
                onBlur={handlerBlurInput}
                validInput={validInput}
                errorMessage={"Las contraseñas no coinciden"}
                
              />
            </div>
          </form>
          <div className="register-button">
            <button className="register-button-registrar" onClick={handleSubmit}>Registrarse</button>
            <p>
              Poseés una cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormRegister;
