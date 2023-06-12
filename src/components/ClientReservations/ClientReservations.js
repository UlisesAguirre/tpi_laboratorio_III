import UserButton from "../UserButton/UserButton"
import ClientMenu from "../ClientMenu/ClientMenu"
import "./clientReservations.css"

const ClientReservations = () => {

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


    //Ejemplo de cliente.
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

    //Simulacion lista vacia:
    const emptyReservations = false


    return (
        <div className="client-container">
            <ClientMenu client={client} />
            <div className="clientReservations-container">
                <h2>{client.role === "client" ? "Mis reservas:" : "Reservas:"}</h2>
                <div className="clientReservations-list">
                    <table className="clientReservations-table">
                        {/*Logica para response sin reservas segun id-client --CAMBIAR--*/}
                        {emptyReservations === true? <p>No tienes reservas</p> : (
                            <>
                                <thead>
                                    <tr>
                                        <th>N° Mesa:</th>
                                        {client.role === "client"? null : <th>Nombre</th>}
                                        <th>Día:</th>
                                        <th>Hora:</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservations.map(r =>
                                        <tr key={r.id}>
                                            <td>{r.id}</td>
                                            {client.role === "client"? null : <td>{client.name} {client.lastName}</td>}
                                            <td>{r.date}</td>
                                            <td>{r.time}hs</td>
                                            {client.role === "admin" ? null : (
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
                        {client.role === "client"? <button className="button">Hacer reserva</button>: null }     
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientReservations