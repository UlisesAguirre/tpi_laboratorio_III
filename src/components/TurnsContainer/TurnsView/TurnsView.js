import React from "react";
import "./turnsView.css"

const TurnsView = ({ listTurns }) => {
  const sortedTurns = [...listTurns].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });

  console.log(sortedTurns);
  
  return (
    <>
    <div className="table-container">
      <table className="turns-table">
        {!sortedTurns.length ? (
          <p>No hay turnos todavía, añade algunos.</p>
        ) : (
          <>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Día</th>
                <th>Horario</th>
                <th>Cantidad disponible</th>
              </tr>
            </thead>
            <tbody>
              {sortedTurns.map((e) => (
                <tr key={e._id}>
                  <td>{e.date}</td>
                  <td>{e.day}</td>
                  <td>{e.hour}</td>
                  <td>{e.capacity}</td>
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

export default TurnsView;
