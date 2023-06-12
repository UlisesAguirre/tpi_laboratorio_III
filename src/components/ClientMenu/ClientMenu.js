import { Link } from "react-router-dom"

import "./clientMenu.css"

const ClientMenu = ({client}) => {
  return (
    <div className="clientMenu-container">
        <img className="user-icon" src={client.icon} alt="" />
        <p>{client.name} {client.lastName}</p>
        <Link to="/client/reservations">
          {client.role == "client"? "Mis reservas" : "Reservas" }
        </Link>
        <Link to="/client/edit-profile">
          {client.role == "client"? "Editar perfil" : client.role == "admin"? "Consultar clientes": "Administrar usuarios"}
        </Link>
        <Link to="/">Cerrar sesion</Link>
    </div>
  )
}

export default ClientMenu