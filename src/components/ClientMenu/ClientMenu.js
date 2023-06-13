import { Link } from "react-router-dom"
import { useContext } from "react"
import UserContext from "../Context/UserContext"

import "./clientMenu.css"

const ClientMenu = () => {

  const user = useContext(UserContext);

  return (
    <div className="clientMenu-container">
        <img className="user-icon" src={user.icon} alt="" />
        <p>{user.name} {user.lastName}</p>
        <Link to="/client/reservations">
          {user.role === "client"? "Mis reservas" : "Reservas" }
        </Link>
        <Link to="/client/edit-profile">
          {user.role === "client"? "Editar perfil" : user.role === "admin"? "Consultar clientes": "Administrar usuarios"}
        </Link>
        <Link to={"/client/comment"}>
          {user.role === "client"? "Deja tu comentario" : null}
        </Link>
        <Link to="/">Cerrar sesion</Link>
    </div>
  )
}

export default ClientMenu