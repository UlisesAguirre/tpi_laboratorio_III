import { Link } from "react-router-dom"
import { useContext } from "react"
import UserContext from "../../Context/UserContext"

import "./main.css"

const Main = () => {

  const {user, logout} = useContext(UserContext);

  return (
    <div className="clientMenu-container">
      {user == null? null: (
        <>
          <img className="user-icon" src={user.icon} alt="" />
          <p>{user.name}</p>
          <Link to="/main/reservations">
            {user.role === "client"? "Mis reservas" : "Reservas" }
          </Link>
          {user.role === "admin" &&
          <Link to="/main/addTurns">
            Añadir turnos
          </Link>}
          <Link to="/main/edit-profile">
            {user.role === "client"? "Editar perfil" : user.role === "admin"? "Consultar clientes": "Administrar usuarios"}
          </Link>
          {user.role === "client"&&
          <Link to="/main/comment">
          "Deja tu comentario"
          </Link>}
          <Link to="/" onClick={logout}>Cerrar sesion</Link> 
          </>
      )}
        
    </div>
  )
}

export default Main