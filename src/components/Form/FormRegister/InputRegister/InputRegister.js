import React from "react";
import "./input.css"

const InputRegister = ({inputName, placeholder, type, name, event, value,onBlur,validInput,errorMessage}) => {
  
  return (
    <>
      <label>{inputName}</label>
      <input type={type} name={name} placeholder={placeholder} value={value} onChange={event} onBlur={onBlur}></input>
      {validInput[name] === false?(
      <div className="container-span">
        <span className="span-input">{errorMessage}</span>
      </div>
      ):null}
    </>
  );
};

export default InputRegister;
