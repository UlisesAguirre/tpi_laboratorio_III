import Input from "../../shared/Input/Input";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../../firebase";
import UserContext from "../../Context/UserContext";

import "./fullForm.css"

//data: Es para traer los datos del GET en el EditProfile
//option: true:register, false:modify

const FullForm = ({ title, buttonTitle, link, data, register }) => {

  const {login} =useContext(UserContext);

  const navigate = useNavigate();
  const regex = {
    name: /^[a-zA-Z]{3,}$/,
    lastName: /^[a-zA-Z]{3,}$/,
    phone: /^\d{10}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  };
  const [input, setInput] = useState({
    name: register ? "" : data.name,
    lastName: register ? "" : data.lastName,
    phone: register ? "" : data.phone,
    email: register ? "" : data.email,
    password: "",
    confirmPassword: "",
  });
  const [validInput, setValidInput] = useState({
    name: register ? null : regex.name.test(data.name),
    lastName: register ? null : regex.lastName.test(data.lastName),
    phone: register ? null : regex.phone.test(data.phone),
    email: register ? null : regex.email.test(data.email),
    password: null,
    confirmPassword: null,
  });
  const sendFirebase = async () => {
    const { confirmPassword, ...data } = input;
    const dataWithRole = { ...data, role: "client" };
    await db.collection("users").doc().set(dataWithRole);
  };

  const modifiedFirebase = async () => {
    const { confirmPassword, ...data } = input;
    const dataWithRole = { ...data };

    try {
      const querySnapshot = await db
        .collection("users")
        .where("email", "==", data.email)
        .get();

      const user = querySnapshot.docs[0].ref;
      await user.update(dataWithRole);
      login(dataWithRole.email, dataWithRole.role, dataWithRole.name, dataWithRole.lastName, dataWithRole.icon)
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      alert("Ocurrió un error al actualizar el usuario");
    }
  }

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
        if (register) {
          sendFirebase();
          setInput({
            name: "",
            lastName: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          alert("Se ha registrado exitosamente!");
        } else {
          modifiedFirebase();
          alert("Se ha actualizado exitosamente!");
        }
        navigate("/main");
      }
    };

    return (
      <div>
        <div className="form-background">
          <h3 className="form-title">{title}</h3>
          <form className="form">
            <div className="form-input">
              <Input
                inputName={"Nombre"}
                name={"name"}
                placeholder={register ? "Juan" : data.name}
                type={"text"}
                value={input.name}
                event={handlerChangeInput}
                onBlur={handlerBlurInput}
                validInput={validInput}
                errorMessage={
                  "El nombre debe contener solo letras y un minimo de 3 caracteres"
                }
              />
              <Input
                inputName={"Apellido"}
                name={"lastName"}
                placeholder={register ? "Perez" : data.lastName}
                type={"text"}
                value={input.lastName}
                event={handlerChangeInput}
                onBlur={handlerBlurInput}
                validInput={validInput}
                errorMessage={
                  "El apellido debe contener solo letras y un minimo de 3 caracteres"
                }
              />
              <Input
                inputName={"Numero de telefono"}
                name={"phone"}
                placeholder={register ? "3413755012" : data.phone}
                type={"number"}
                value={input.phone}
                event={handlerChangeInput}
                onBlur={handlerBlurInput}
                validInput={validInput}
                errorMessage={
                  "El numero de telefono debe estar compuesto por 10 numeros"
                }
              />
            </div>
            <div className="form-input">
              <Input
                inputName={"Email"}
                name={"email"}
                placeholder={register ? "example@gmail.com" : data.email}
                type={"email"}
                value={input.email}
                event={handlerChangeInput}
                onBlur={handlerBlurInput}
                validInput={validInput}
                errorMessage={
                  "Email invalido: respete el formato(example@gmail.com)"
                }
              />
              <Input
                inputName={"Contraseña"}
                name={"password"}
                placeholder={"*************"}
                type={"password"}
                input={input.password}
                event={handlerChangeInput}
                onBlur={handlerBlurInput}
                validInput={validInput}
                errorMessage={
                  "La contraseña debe contener al menos una minuscula,una mayuscula, un digito y una lonigtud minima de 8 caracteres"
                }
              />
              <Input
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
          <div className="form-button">
            <button className="button" onClick={handleSubmit}>
              {buttonTitle}
            </button>
            <p>
              {title === "Registrarse" ? (
                <>
                  ¿Poseés una cuenta?{" "}
                  <Link to="/login" className="button-login">
                    Inicia sesión
                  </Link>
                </>
              ) : null}
            </p>
          </div>
        </div>
      </div>
    );
  };

export default FullForm