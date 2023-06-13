import React, { useContext } from "react";
import Form from "../Form/Form";

import "./formRegister.css";
import { ThemeContext } from "../../Context/ThemeContext";

const FormRegister = () => {

  const {theme} = useContext(ThemeContext);

  return (
    <div className={theme}>
      <div className="register">
        <Form title={"Registrarse"} buttonTitle={"Registrarse"} link={"/"} data={null} register={true}/>
      </div>
    </div>
  );
};

export default FormRegister;
