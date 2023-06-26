import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../Context/UserContext";
import { db } from "../../../firebase";
import "./clientReservationTable.css";
import Modal from "../../shared/Modal/Modal";
const ClientReservationTable = ({ listTurns }) => {
  const [turns, setTurns] = useState([]);
  const { user } = useContext(UserContext);
  const [modal, setModal] = useState({
    modalOpen: false,
    modalTitle: "",
    modalMessage: "",
  });
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

  const closeModal = () => {
    setModal({ modalOpen: false });
  };

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
          modalMessage: "Reserva realizada con exito",
        });
      })
      .catch((error) => {
        setModal({
          modalOpen: true,
          modalTitle: "Error",
          modalMessage: `Error al hacer la reserva:${error}`,
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
          modalTitle: "Cancelacion exitosa",
          modalMessage: "Reserva cancelada con exito",
        });
      })
      .catch((error) => {
        setModal({
          modalOpen: true,
          modalTitle: "Error",
          modalMessage: `Error al cancelar la reserva:${error}`,
        });
      });
  };
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
                      {e.clients.includes(user.email) ? (
                        <button
                          className="cancel-button"
                          onClick={() =>
                            handlerCancelReserve(e.id, e.capacity, e.clients)
                          }
                        >
                          Cancelar reserva
                        </button>
                      ) : (
                        <button
                          className="reserve-button"
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
      {modal.modalOpen && (
        <Modal
          title={modal.modalTitle}
          message={modal.modalMessage}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default ClientReservationTable;
