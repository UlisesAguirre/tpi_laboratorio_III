import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../Context/UserContext";

const ClientReservationTable = ({ listTurns }) => {
  const [turns, setTurns] = useState([]);
  const user = useContext(UserContext);
  console.log(user)
  useEffect(() => {
    let turnsToShow = listTurns;
    const currentDate = new Date();
    turnsToShow = turnsToShow.filter(
      (turn) => new Date(turn.date) >= currentDate
    );
    const sortedTurns = [...turnsToShow].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });
    setTurns(sortedTurns);
  }, [listTurns]);

  const handlerReserve= ((idReserve) =>{
    console.log(idReserve)
  })
  return (
    <>
      <div className="table-container">
        <table className="turns-table">
          {!turns.length ? (
            <p>No hay turnos todavía, añade algunos.</p>
          ) : (
            <>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Día</th>
                  <th>Horario</th>
                  <th>Cantidad disponible</th>
                  <th>Disponibilidad</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {turns.map((e) => (
                  <tr key={e.id}>
                    <td>{e.date}</td>
                    <td>{e.day}</td>
                    <td>{e.hour}</td>
                    <td>{e.capacity}</td>
                    <td>
                      {e.available ? "Turno disponible" : "Turno no disponible"}
                    </td>
                    <td>
                      <button
                        disabled={!e.available || e.capacity === 0}
                        onClick={() => handlerReserve(e.id)}
                      >
                        Reservar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </table>
      </div>
    </>
  );
};

export default ClientReservationTable;
