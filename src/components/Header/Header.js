
import { useContext } from "react"
import logo from "../../assets/img/logo-restaurant.png"
import UserButton from "../shared/UserButton/UserButton"
import UserContext from "../Context/UserContext"

import "./header.css"

const Header = () => {

  const { user } = useContext(UserContext);

  return (
    <div className="header-container">
      <img src={logo} alt="" /><h1>Pizzeria Paradiso</h1>
      <div className="userButton-container">
        {user == null ? (
          <>
            <UserButton to={"/login"} buttonName={"Iniciar sesion"} />
            <UserButton to={"/register"} buttonName={"Registrarme"} />
          </>
        ) : null}

      </div>
    </div>
  )
}

export default Header