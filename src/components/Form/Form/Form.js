import InputRegister from "../FormRegister/InputRegister/InputRegister"
import { useState } from "react";
import { Link } from "react-router-dom";

import "./form.css"

//data: Es para traer los datos del GET en el EditProfile
//option: true:register, false:modify

const Form = ({ title, buttonTitle, link, data, register}) => {

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
        name: /^[a-zA-Z]{3,}$/,
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
            alert(register? "Se ha registrado exitosamente!" : "Se han guardado los cambios");
        }
    };

    return (
        <div>
            <div className="form-background">
                <h3 className="form-title">{title}</h3>
                <form className="form">
                    <div className="form-input">
                        <InputRegister
                            inputName={"Nombre"}
                            name={"name"}
                            placeholder={register? "Juan" : data.name}
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
                            placeholder={register? "Perez": data.lastName}
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
                            placeholder={register? "3413755012": data.phone}
                            type={"number"}
                            value={input.phone}
                            event={handlerChangeInput}
                            onBlur={handlerBlurInput}
                            validInput={validInput}
                            errorMessage={"El numero de telefono debe estar compuesto por 10 numeros"}
                        />
                    </div>
                    <div className="form-input">
                        <InputRegister
                            inputName={"Email"}
                            name={"email"}
                            placeholder={register? "example@gmail.com" : data.email}
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
                <div className="form-button">

                    {/*Podriamos sacar el link de aca y ponerlo en un modal con el mensaje "blabla"*/}
                    <Link to={link}>
                        <button className="button" onClick={handleSubmit}>{buttonTitle}</button>
                    </Link>
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
    )
}

export default Form