import UserButton from "../UserButton/UserButton"
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


    return (
        <div className="clientReservations-container">
            <h2>Mis Reservas</h2>
            <div className="clientReservations-list">
                <table className="clientReservations-table">
                    <thead>
                        <tr>
                            <th>Nro Mesa:</th>
                            <th>Día:</th>
                            <th>Hora:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map(r =>
                            <tr key={r.id}>
                                <td>{r.id}</td>
                                <td>{r.date}</td>
                                <td>{r.time}hs</td>
                                <div className="reservation-buttons">
                                    <UserButton to ="" buttonName= "Modificar" />
                                    <UserButton to ="" buttonName= "Eliminar" />
                                </div>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ClientReservations