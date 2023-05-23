import React from "react";
import "./formRegister.css";
import NavBar from "../../NavBar/NavBar";


const FormRegister = () => {
  return (
    <div className="form-register-container">
      <NavBar />
      <div class="register">
        <div class="register-background">
          <h3 class="register-title">Registrarse</h3>
          <div class="register-form">
            <div class="register-form-input">
              <label for="usuario"> Nombre</label>
              <input type="text" name="nombre" placeholder="Jose"></input>
              <label for="usuario">Apellido</label>
              <input type="text" name="apellido" placeholder="Aguirre"></input>
              <label for="usuario">Numero de Teléfono</label>
              <input type="number" name="teléfono" placeholder="+54 3415725873"></input>
            </div>
            <div class="register-form-input">
              <label for="usuario">Email</label>
              <input type="text" name="usuario" placeholder="example@gmail.com"></input>
              <label for="usuario">Contraseña</label>
              <input type="paswword" name="contraseña" placeholder="**************"></input>
              <label for="usuario">Repetir Contraseña</label>
              <input type="paswword" name="repetir-contraseña" placeholder="**************"></input>
            </div>
          </div>
          <div class="register-button">
            <button class="register-button-registrar">Registrarse</button>
            <p >Poseés una cuenta? <a href="#">Inicia sesión</a></p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FormRegister;