import ClientMenu from "../ClientMenu/ClientMenu"
import { Routes, Route } from "react-router-dom"

import "./clientMain.css"

const ClientMain = () => {

    //Ejemplo de datos de usuario:
    const client = {
        id: 1,
        icon: "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg",
        name: "Juan",
        lastName: "Perez",
        phone: "3416476578",
        email: "tugrp@example.com",
        password: "123456",
        role: "client",
    }


  return (
    <div className="client-container">
        <ClientMenu client = {client} />
    </div>
  )
}

export default ClientMain