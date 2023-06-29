import { Link } from "react-router-dom"
import { useContext } from "react"
import { ThemeContext } from "../Context/ThemeContext"

import "./navBar.css"

const NavBar = () => {

  const {theme} = useContext(ThemeContext)

  return (
    <div className="navBar-container">
        <ul className="navBar-list">
            <Link to="/" className="link"><li className={theme}>Inicio</li></Link>
            <Link to="/about-us" className="link"><li className={theme}>Sobre nosotros</li></Link>
            <Link to="/comments" className="link"><li className={theme}>Nuestros clientes</li></Link>
        </ul>
    </div>
  )
}

export default NavBar