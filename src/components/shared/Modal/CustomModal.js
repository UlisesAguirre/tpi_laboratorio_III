import React, { useContext, useState } from "react";
import { ThemeContext } from "../../Context/ThemeContext";
import "./customModal.css";

const CustomModal = ({ title, titleModalButton, finalMessage, user, modifyRole, deleteUser }) => {
  const { theme } = useContext(ThemeContext)

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(false);

  const [newRole, setNewRole] = useState("");

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const closeMessage = () => {
    setMessage(false)
  };

  const eventModal = () => {
    { title === "Modificar rol" && modifyRole(newRole, user) }
    setIsOpen(false);
    setMessage(true);
  };

  const roleHandler = (event) => {
    setNewRole(event.target.value);
  }

  return (
    <div>
      <button onClick={openModal} className="button">{title}</button>
      {isOpen && (
        <div className="custom-modal-overlay">
          <div className={`custom-modal ${theme}`}>
            <h2>{title}</h2>
            {title === "Modificar rol" ? (
              <select name="" id="" onChange={roleHandler}>
                <option value="">Seleccionar</option>
                <option value="client">client</option>
                <option value="admin">admin</option>
                <option value="superAdmin">superAdmin</option>
              </select>
            ) : null}
            <div>
              <button onClick={closeModal} className="button">Cancelar</button>
              <button onClick={eventModal} className="button">{titleModalButton}</button>
            </div>
          </div>
        </div>
      )}
      {message ? (
        <div className={`custom-modal ${theme}`}>
          <h2>{finalMessage}</h2>
          <div>
            <button onClick={closeMessage} className="button">Cerrar</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CustomModal;