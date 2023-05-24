import React from "react";

const InputRegister = ({inputName, placeholder, type}) => {
  return (
    <div>
      <label>{inputName}</label>
      <input type={type} name={inputName} placeholder={placeholder}></input>
    </div>
  );
};

export default InputRegister;
