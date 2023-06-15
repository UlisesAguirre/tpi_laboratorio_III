import React, { useContext } from "react";
import "./formRegisterContainer.css";
import { ThemeContext } from "../../Context/ThemeContext";
import FullForm from "../FullForm/FullForm";

const FormRegisterContainer = () => {

  const {theme} = useContext(ThemeContext);

  return (
    <div className={theme}>
      <div className="register">
        <FullForm title={"Registrarse"} buttonTitle={"Registrarse"} link={"/"} data={null} register={true}/>
      </div>
    </div>
  );
};

export default FormRegisterContainer;
