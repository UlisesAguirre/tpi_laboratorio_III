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
          <div className="img-user-container">
          <img className="user-icon" src={user.icon} alt="" />
          </div>
          <p>{user.name}</p>
          <Link to="/main/reservations">
            {user.role === "client"? "Mis reservas" : "Reservas" }
          </Link>
          {user.role === "admin" &&
          <Link to="/main/addTurns">
            Añadir turnos
          </Link>}
          <Link to="/main/edit-profile">
            Editar perfil
          </Link>
          {(user.role === "admin" || user.role === "superAdmin") &&
          <Link to= "/main/list-users">
            {user.role === "admin" ? "Consultar Clientes" :"Administrar Usuarios"}
          </Link>}
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