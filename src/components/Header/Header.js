
import { useContext } from "react"
import logo from "../../assets/img/logo-restaurant.png"
import UserButton from "../shared/UserButton/UserButton"
import UserContext from "../Context/UserContext"
import { Link } from "react-router-dom"

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
        ) :
          <div className="hello-container">
            <Link to="/main"><p>¡Hola!</p><h3>{user.name}</h3></Link>
          </div>
        }
      </div>
    </div>
  )
}

export default Header