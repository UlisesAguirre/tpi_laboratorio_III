import { Link } from "react-router-dom"

import "./clientMenu.css"

const ClientMenu = ({client}) => {
  return (
    <div className="clientMenu-container">
        <img className="user-icon" src={client.icon} alt="" />
        <p>{client.name} {client.lastName}</p>
        <Link to="/client/reservations">Mis reservas</Link>
        <Link to="/client/edit-profile">Editar perfil</Link>
        <Link to="/client">Cerrar sesion</Link>
    </div>
  )
}

export default ClientMenu