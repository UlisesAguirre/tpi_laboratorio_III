import React, { useEffect, useState } from "react";
import editIcon from "../../../assets/img/edit-icon.png";
import deleteIcon from "../../../assets/img/delete-icon.png";
import confirmIcon from "../../../assets/img/confirm.png";
import cancelIcon from "../../../assets/img/cancel.png";
import "./turnsView.css";
import { db } from "../../../firebase";
import Modal from "../../shared/Modal/Modal";

const TurnsView = ({ listTurns }) => {
  const [turns, setTurns] = useState([]);
  const [showAllTurns, setShowAllTurns] = useState(false);
  const [editEnable, setEditEnable] = useState(false);
  const [capacity, setCapacity] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    let turnsToShow = listTurns;

    if (!showAllTurns) {
      const currentDate = new Date();
      turnsToShow = turnsToShow.filter(
        (turn) => new Date(turn.date) >= currentDate
      );
    }

    const sortedTurns = [...turnsToShow].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });

    setTurns(sortedTurns);
  }, [listTurns, showAllTurns]);

  const toggleShowAllTurns = () => {
    setShowAllTurns(!showAllTurns);
  };
  const openModal = (title, message) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const deleteTurn = (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar el turno?"
    );
    if (confirmDelete) {
      db.collection("turns")
        .doc(id)
        .update({ available: false })
        .then(() => {
          openModal("Turno eliminado", "Turno eliminado con éxito.");
        })
        .catch((error) => {
          openModal("Error", `Error al eliminar el turno: ${error}`);
        });
    }
  };

  const handlerEdit = async (id, clients) => {
    if (capacity < clients.length) {
      openModal(
        "Error",
        "La capacidad no puede ser menor a la cantidad de clientes ya inscriptos"
      );
    } else {
      await db
        .collection("turns")
        .doc(id)
        .update({ capacity: capacity - clients.length })
        .then(() => {
          openModal("Turno actualizado", "Turno actualizado con éxito.");
          setEditEnable(false);
        })
        .catch((error) => {
          openModal("Error", `Error al actualizar el turno: ${error}`);
        });
    }
  };

  const handlerChangeCapacity = (event) => {
    setCapacity(event.target.value);
    console.log(capacity);
  };
  return (
    <>
      <div className="table-container">
        <button onClick={toggleShowAllTurns}>
          {showAllTurns
            ? "Mostrar próximos turnos"
            : "Mostrar todo el historial de reservas"}
        </button>
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
                        <div className="input-container">
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
                            onClick={() => setEditEnable(e.id)}
                          />
                        </>
                      )}
                    </td>
                    <td>
                      {" "}
                      <select>
                        <option selected>Ver clientes</option>
                        {e.clients.map((client) => (
                          <option key={client} value={client}>
                            {client}
                          </option>
                        ))}
                      </select>
                    </td>
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
      {modalOpen && (
        <Modal title={modalTitle} message={modalMessage} onClose={closeModal} />
      )}
    </>
  );
};

export default TurnsView;
