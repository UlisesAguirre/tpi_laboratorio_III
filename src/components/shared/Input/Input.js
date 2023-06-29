import React from "react";
import "./input.css"

const InputRegister = ({ inputName, placeholder, type, name, event, value, onBlur, validInput, errorMessage}) => {

  return (
    <div className="input-base-container">
      <label>{inputName}</label>
      <input type={type} name={name} placeholder={placeholder} value={value} onChange={event} onBlur={onBlur} className="inputComponent"></input>
      {validInput[name] === false ? (
        <div className="container-span">
          <span className="span-input">{errorMessage}</span>
        </div>
      ) : null}
    </div>
  );
};

export default InputRegister;
