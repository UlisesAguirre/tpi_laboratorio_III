import { Link } from "react-router-dom"

import "./navBar.css"

const NavBar = () => {
  return (
    <div className="navBar-container">
        <ul className="navBar-list">
            <Link to="/" className="link"><li>Inicio</li></Link>
            <Link to="/about-us" className="link"><li>Sobre nosotros</li></Link>
            <Link to="/comments" className="link"><li>Nuestros clientes</li></Link>
            <Link to="/" className="link"><li>Contacto</li></Link>
        </ul>
    </div>
  )
}

export default NavBar