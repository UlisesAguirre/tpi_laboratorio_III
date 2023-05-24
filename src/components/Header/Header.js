
import logo from "../../assets/img/logo-restaurant.png"
import UserButton from "../UserButton/UserButton"

import "./header.css"

const Header = () => {
  return (
    <div className="header-container">
      <img src={logo} alt="" /><h1>Pizzeria Paradiso</h1>
      <div className="userButton-container">
        <UserButton to={"/login"} buttonName={"Iniciar sesion"}/>
        <UserButton to={"/register"} buttonName={"Registrarme"}/>
      </div>
    </div>
  )
}

export default Header