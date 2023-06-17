import React from "react";

const TurnsView = ({listTurns}) => {
  return (
    <>
      {!listTurns.length ? (
        <p>No hay turnos todavia añade algunos</p>
      ) : (
        <table className="turns-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Horario</th>
              <th>Cantidad disponible</th>
            </tr>
          </thead>
        </table>
      )}
    </>
  );
};

export default TurnsView;
