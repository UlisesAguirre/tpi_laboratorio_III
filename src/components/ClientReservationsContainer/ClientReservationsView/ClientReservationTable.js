import React, { useContext, useState, useMemo } from "react";
import UserContext from "../../Context/UserContext";
import { db } from "../../../firebase";
import Modal from "../../shared/Modal/Modal";
import { ThemeContext } from "../../Context/ThemeContext";

import "./clientReservationTable.css";

const ClientReservationTable = ({ listTurns }) => {
  const {theme} = useContext(ThemeContext)
  const { user } = useContext(UserContext);
  const [modal, setModal] = useState({
    modalOpen: false,
    modalTitle: "",
    modalMessage: "",
  });

  const turns = useMemo(() => {
    let turnsToShow = listTurns;
    const timeSlots = ["12-14", "14-16", "20-22", "22-24"];
    const currentDate = new Date();
    turnsToShow = turnsToShow.filter((turn) => new Date(turn.date) >= currentDate);
    const sortedTurns = turnsToShow.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }

      const hourA = a.hour;
      const hourB = b.hour;

      const indexA = timeSlots.indexOf(hourA);
      const indexB = timeSlots.indexOf(hourB);

      return indexA - indexB;
    });

    return sortedTurns;
  }, [listTurns]);
  
  const handlerReserve = async (idReserve, capacityReserve, clients) => {
    if (clients.includes(user.email)) {
      setModal({
        modalOpen: true,
        modalTitle: "Aviso",
        modalMessage: "Ya tienes una reserva para este turno.",
      });
      return;
    }
    const updatedClients = [...clients, user.email];
    await db
      .collection("turns")
      .doc(idReserve)
      .update({
        clients: updatedClients,
        capacity: capacityReserve - 1,
      })
      .then(() => {
        setModal({
          modalOpen: true,
          modalTitle: "Reserva exitosa",
          modalMessage: "Reserva realizada con éxito",
        });
      })
      .catch((error) => {
        setModal({
          modalOpen: true,
          modalTitle: "Error",
          modalMessage: `Error al hacer la reserva: ${error}`,
        });
      });
  };

  const handlerCancelReserve = async (idReserve, capacityReserve, clients) => {
    const updatedClients = clients.filter((client) => client !== user.email);
    await db
      .collection("turns")
      .doc(idReserve)
      .update({
        clients: updatedClients,
        capacity: capacityReserve + 1,
      })
      .then(() => {
        setModal({
          modalOpen: true,
          modalTitle: "Cancelación exitosa",
          modalMessage: "Reserva cancelada con éxito",
        });
      })
      .catch((error) => {
        setModal({
          modalOpen: true,
          modalTitle: "Error",
          modalMessage: `Error al cancelar la reserva: ${error}`,
        });
      });
  };

  return (
    <div className="table-turns-containeer">
      <h2>Reservas: </h2>
      <div className="table-container">
        <div className={`background-turns-container ${theme}`}>
          <div className="client-turns-container">
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
                          {e.clients.includes(user.email) ? (
                            <button
                              className="button"
                              onClick={() =>
                                handlerCancelReserve(e.id, e.capacity, e.clients)
                              }
                            >
                              Cancelar reserva
                            </button>
                          ) : (
                            <button
                              className={"button"}
                              disabled={!e.available || e.capacity === 0}
                              onClick={() =>
                                handlerReserve(e.id, e.capacity, e.clients)
                              }
                            >
                              {e.clients.includes(user.email)
                                ? "Reservado"
                                : "Reservar"}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}
            </table>
          </div>
        </div>
      </div>
      {modal.modalOpen && (
        <Modal
          title={modal.modalTitle}
          message={modal.modalMessage}
          onClose={() => setModal({ modalOpen: false })}
        />
      )}
    </div>
  );
};

export default ClientReservationTable;
