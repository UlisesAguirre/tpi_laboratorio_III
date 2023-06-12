import UserButton from "../UserButton/UserButton"
import ClientMenu from "../ClientMenu/ClientMenu"
import { useContext } from "react"
import UserContext from "../Context/UserContext"


import "./clientReservations.css"

const ClientReservations = () => {

    const user = useContext(UserContext);

    //Ejemplo datos de reservas.
    const reservations = [
        {
            id: 1,
            date: "17/4/2023",
            time: "10:30"
        },
        {
            id: 3,
            date: "17/4/2023",
            time: "10:30"
        },
        {
            id: 7,
            date: "17/4/2023",
            time: "10:30"
        }
    ]
    //Simulacion lista vacia:
    const emptyReservations = false


    return (
        <div className="client-container">
            <ClientMenu />
            <div className="clientReservations-container">
                <h2>{user.role === "client" ? "Mis reservas:" : "Reservas:"}</h2>
                <div className="clientReservations-list">
                    <table className="clientReservations-table">
                        {/*Logica para response sin reservas segun id-client --CAMBIAR--*/}
                        {emptyReservations === true? <p>No tienes reservas</p> : (
                            <>
                                <thead>
                                    <tr>
                                        <th>N° Mesa:</th>
                                        {user.role === "client"? null : <th>Nombre</th>}
                                        <th>Día:</th>
                                        <th>Hora:</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservations.map(r =>
                                        <tr key={r.id}>
                                            <td>{r.id}</td>
                                            {user.role === "client"? null : <td>{user.name} {user.lastName}</td>}
                                            <td>{r.date}</td>
                                            <td>{r.time}hs</td>
                                            {user.role === "admin" ? null : (
                                                <div className="reservation-buttons">
                                                    <UserButton to="" buttonName="Modificar" />
                                                    <UserButton to="" buttonName="Eliminar" />
                                                </div>
                                            )}
                                        </tr>
                                    )}
                                </tbody>
                            </>
                        )}
                    </table>
                    <div>
                        {user.role === "client"? <button className="button">Hacer reserva</button>: null }     
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientReservations