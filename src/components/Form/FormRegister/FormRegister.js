import React from "react";
import Form from "../Form/Form";
import "./formRegister.css";

const FormRegister = () => {

  return (
    <div className="form-register-container">
      <div className="register">
        <Form title={"Registrarse"} buttonTitle={"Registrarse"} link={"/"} data={null} register={true}/>
      </div>
    </div>
  );
};

export default FormRegister;
