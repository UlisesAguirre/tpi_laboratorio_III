import ClientMenu from "../ClientMenu/ClientMenu"
import ClientReservations from "../ClientReservations/ClientReservations"
import EditProfile from "../EditProfile/EditProfile"
import { Routes, Route } from "react-router-dom"

import "./clientMain.css"
import ClientStart from "../ClientStart/ClientStart"

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
    <div className="clientMain-container">
        <ClientMenu client = {client} />
        <Routes>
            <Route path="/client/" element={<ClientStart/>} />
            <Route path="/client/reservations" element={<ClientReservations/>} />
            <Route path="/client/edit-profile" element={<EditProfile/>} />
        </Routes>
    </div>
  )
}

export default ClientMain