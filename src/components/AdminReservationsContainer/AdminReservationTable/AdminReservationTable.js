import React, { useContext, useEffect, useMemo, useState } from "react";
import { db } from "../../../firebase";
import { ThemeContext } from "../../Context/ThemeContext";
import Modal from "../../shared/Modal/Modal";
import ConfirmModal from "../../shared/ConfirmModal/ConfirmModal";
import editIcon from "../../../assets/img/edit-icon.png";
import deleteIcon from "../../../assets/img/delete-icon.png";
import confirmIcon from "../../../assets/img/confirm.png";
import cancelIcon from "../../../assets/img/cancel.png";
import "./adminReservationTable.css";

const AdminReservationTable = ({ listTurns }) => {
  const { theme } = useContext(ThemeContext);
  const [turns, setTurns] = useState([]);
  const [showAllTurns, setShowAllTurns] = useState(false);
  const [editEnable, setEditEnable] = useState(false);
  const [capacity, setCapacity] = useState(0);
  const [modal, setModal] = useState({
    modalOpen: false,
    modalTitle: "",
    modalMessage: "",
  });
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedTurnId, setSelectedTurnId] = useState(null);

  const filteredAndSortedTurns = useMemo(() => {
    const timeSlots = ["12-14", "14-16", "20-22", "22-24"];
    let turnsToShow = listTurns;

    if (!showAllTurns) {
      const currentDate = new Date().toISOString().split("T")[0];
      const currentHour = new Date().getHours();
      turnsToShow = turnsToShow.filter((turn) => {
        const turnDate = new Date(turn.date).toISOString().split("T")[0];
        const turnHour = parseInt(turn.hour.split("-")[0]);
        return (
          (turnDate === currentDate && turnHour > currentHour) ||
          turnDate > currentDate
        );
      });
    }

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
  }, [listTurns, showAllTurns]);

  useEffect(() => {
    setTurns(filteredAndSortedTurns);
  }, [filteredAndSortedTurns]);

  const toggleShowAllTurns = () => {
    setShowAllTurns(!showAllTurns);
  };

  const deleteTurn = (id) => {
    setConfirmModalOpen(true);
    setSelectedTurnId(id);
  };

  const editTurn = (id) => {
    setModal({
      modalOpen: true,
      modalTitle: "Aviso",
      modalMessage:
        "La capacidad se vera afectada por los clientes ya inscriptos",
    });
    setEditEnable(id);
  };

  const handleConfirmDelete = async () => {
    await db
      .collection("turns")
      .doc(selectedTurnId)
      .update({ available: false })
      .then(() => {
        setModal({
          modalOpen: true,
          modalTitle: "Turno eliminado",
          modalMessage: "Turno eliminado con éxito.",
        });
      })
      .catch((error) => {
        setModal({
          modalOpen: true,
          modalTitle: "Error",
          modalMessage: `Error al eliminar el turno:${error} `,
        });
      });
    setConfirmModalOpen(false);
  };

  const handlerEdit = async (id, clients) => {
    if (capacity < clients.length) {
      setModal({
        modalOpen: true,
        modalTitle: "Aviso",
        modalMessage:
          "La capacidad no puede ser menor a la cantidad de clientes ya inscriptos",
      });
    } else {
      await db
        .collection("turns")
        .doc(id)
        .update({ capacity: capacity - clients.length })
        .then(() => {
          setModal({
            modalOpen: true,
            modalTitle: "Turno actualizado",
            modalMessage: "Turno actualizado con éxito.",
          });
          setEditEnable(false);
        })
        .catch((error) => {
          setModal({
            modalOpen: true,
            modalTitle: "Error",
            modalMessage: `Error al actualizar el turno: ${error}`,
          });
        });
    }
  };

  const handlerChangeCapacity = (event) => {
    setCapacity(event.target.value);
  };
  return (
    <div className="table-turns-containeer">
      <h2>Reservas: </h2>
      <div className={`table-container-turns ${theme}`}>
        <button className="button" onClick={toggleShowAllTurns}>
          {showAllTurns
            ? "Mostrar próximos turnos"
            : "Mostrar todo el historial de reservas"}
        </button>
        <div className="turns-view-container">
          {!turns.length ? (
            <div>
              <p>Cargando...</p>
            </div>
          ) : (
            <table className="turns-table-turns">
              <>
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Día</th>
                    <th>Horario</th>
                    <th>Cantidad disponible</th>
                    <th>Clientes anotados</th>
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
                      <td>
                        {editEnable === e.id ? (
                          <div className="input-container-turns">
                            <input
                              type="number"
                              name="capacity"
                              value={capacity}
                              onChange={handlerChangeCapacity}
                            />
                            <img
                              src={confirmIcon}
                              alt="Editar"
                              onClick={() => handlerEdit(e.id, e.clients)}
                            />
                            <img
                              src={cancelIcon}
                              alt="Cancelar"
                              onClick={() => setEditEnable(false)}
                            />
                          </div>
                        ) : (
                          <>
                            {e.capacity}
                            <img
                              src={editIcon}
                              alt="Editar turno"
                              onClick={() => editTurn(e.id)}
                            />
                          </>
                        )}
                      </td>
                      <td>
                        {" "}
                        <select>
                          <option defaultValue>Ver clientes</option>
                          {e.clients.map((client) => (
                            <option key={client} value={client}>
                              {client}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        {e.available
                          ? "Turno disponible"
                          : "Turno no disponible"}
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
            </table>
          )}
        </div>
      </div>
      {confirmModalOpen && (
        <ConfirmModal
          title="Eliminar Turno"
          message="¿Estás seguro de que deseas eliminar el turno?"
          onConfirm={() => handleConfirmDelete()}
          onCancel={() => setConfirmModalOpen(false)}
        />
      )}
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

export default AdminReservationTable;
