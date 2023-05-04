
import logo from "../../assets/img/logo-restaurant.png"
import UserButton from "../UserButton/UserButton"

import "./header.css"

const Header = () => {
  return (
    <div className="header-container">
      <img src={logo} alt="" /><h1>Pizzeria Paradiso</h1>
      <UserButton/>
    </div>
  )
}

export default Header