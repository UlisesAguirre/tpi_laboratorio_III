import React, { useState } from "react";
import Input from "../../shared/Input/Input";
import "./turnsForm.css";
import { db } from "../../../firebase";

const TurnsForm = () => {
  const [turn, setTurn] = useState({
    hour: "",
    day: "",
    capacity: "",
  });

  const [validInput, setValidInput] = useState({
    hour: null,
    day: null,
    capacity: null,
  });
  const sendFirebase = async () => {
    const { confirmPassword, ...data } = turn;
    const dataWithClientList = { ...data, clients:[] };
    await db.collection("turns").doc().set(dataWithClientList);
  };

  const handlerChangeInput = (e) => {
    setTurn({ ...turn, [e.target.name]: e.target.value });
  };

  const handlerBlurInput = (e) => {
    const eventTarget = e.target.name;
    setValidInput({
      ...validInput,
      [eventTarget]:
        eventTarget !== "capacity"
          ? !!turn[eventTarget]
          : turn.capacity > 0 && turn.capacity <= 20,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationInputs = Object.values(validInput).some((valid) => !valid);
    if (validationInputs) {
      alert("Por favor, complete correctamente todos los campos.");
    } else {
      sendFirebase();
      setTurn({
        hour: "",
        day: "",
        capacity: "",
      });
    }
  };

  return (
    <>
      <div className="form-background">
        <h3 className="form-title">Añadir turnos</h3>
        <form className="turns-form" onSubmit={handleSubmit}>
          <div className="select-container">
            <select
              className="turns-select"
              name="hour"
              value={turn.hour}
              onChange={handlerChangeInput}
              onBlur={handlerBlurInput}
            >
              <option value="" disabled>
                Seleccione un horario
              </option>
              <option value="12:00">12:00 a 14:00</option>
              <option value="14:00">14:00 a 16:00</option>
              <option value="18:00">18:00 a 20:00</option>
              <option value="20:00">20:00 a 22:00</option>
              <option value="22:00">22:00 a 24:00</option>
            </select>
            {validInput["hour"] === false ? (
              <div className="container-span">
                <span className="span-input">{"Campo obligatorio"}</span>
              </div>
            ) : null}
          </div>
          <div className="select-container">
            <select
              className="turns-select"
              name="day"
              value={turn.day}
              onChange={handlerChangeInput}
              onBlur={handlerBlurInput}
            >
              <option value="">Seleccione un día</option>
              <option value="Lunes">Lunes</option>
              <option value="Martes">Martes</option>
              <option value="Miércoles">Miércoles</option>
              <option value="Jueves">Jueves</option>
              <option value="Viernes">Viernes</option>
              <option value="Sábado">Sábado</option>
              <option value="Domingo">Domingo</option>
            </select>
            {validInput["day"] === false ? (
              <div className="container-span">
                <span className="span-input">{"Campo obligatorio"}</span>
              </div>
            ) : null}
          </div>
          <Input
            inputName={"Capacidad"}
            name={"capacity"}
            type={"number"}
            event={handlerChangeInput}
            onBlur={handlerBlurInput}
            validInput={validInput}
            errorMessage={"La capacidad debe estar en 1 y 20"}
          />
          <button className="button" type="submit">
            Añadir Turnos
          </button>
        </form>
      </div>
    </>
  );
};

export default TurnsForm;
