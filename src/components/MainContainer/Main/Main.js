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
          {user.role === "client" &&
          <Link to="/main/reservations">
             Reservas 
          </Link>
          }
          {user.role === "admin" &&
          <Link to="/main/view-turns">
            Reservas
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
          Deja tu comentario
          </Link>}
          <Link to="/" onClick={logout}>Cerrar sesion</Link> 
          </>
      )}
        
    </div>
  )
}

export default Main