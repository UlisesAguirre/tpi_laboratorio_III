import ClientMenu from "../ClientMenu/ClientMenu"

import "./clientMain.css"

const ClientMain = () => {

    //Ejemplo de datos de usuario:
    const client = {
        id: 1,
        icon: "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg",
        name: "Tito",
        lastName: "Fuentes",
        phone: "3416476578",
        email: "tugrp@example.com",
        password: "123456",
        role: "client", //Ir variando entre los roles de admin, client y superAdmin para ver las diferencias. (userContext)
    }


  return (
    <div className="client-container">
        <ClientMenu client = {client} />
    </div>
  )
}

export default ClientMain