import React from "react";
import editIcon from "../../../assets/img/edit-icon.png";
import deleteIcon from "../../../assets/img/delete-icon.png";
import "./turnsView.css";
import { db } from "../../../firebase";

const TurnsView = ({ listTurns }) => {
  const sortedTurns = [...listTurns].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });

  const deleteTurn = (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar el turno?"
    );
    if (confirmDelete) {
      db.collection("turns")
        .doc(id)
        .update({ available: false })
        .then(() => {
          alert("Turno eliminado con éxito.");
        })
        .catch((error) => {
          alert("Error al eliminar el turno:", error);
        });
    }
  };

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
                  <th>Disponibilidad</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sortedTurns.map((e) => (
                  <tr key={e.id}>
                    <td>{e.date}</td>
                    <td>{e.day}</td>
                    <td>{e.hour}</td>
                    <td>{e.capacity}</td>
                    <td>
                      {e.available ? "Turno disponible" : "Turno no disponible"}
                    </td>
                    {e.available && (
                      <>
                        <td>
                          <img
                            src={deleteIcon}
                            alt="Eliminar turno"
                            onClick={() => deleteTurn(e.id)}
                          />
                        </td>
                      </>
                    )}
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
