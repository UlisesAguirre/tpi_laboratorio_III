import React, { useContext, useState } from "react";
import { ThemeContext } from "../../Context/ThemeContext";
import "./selectModal.css";

const SelectModal = ({
  title,
  titleModalButton,
  finalMessage,
  user,
  modifyRole,
}) => {

  console.log(user)
  const { theme } = useContext(ThemeContext);

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
    setMessage(false);
  };

  const eventModal = () => {
    modifyRole(newRole, user);
    setIsOpen(false);
    setMessage(true);
  };

  const roleHandler = (event) => {
    setNewRole(event.target.value);
  };

  return (
    <div>
      <button onClick={openModal} className="button">
        {title}
      </button>
      {isOpen && (
        <div className="custom-modal-overlay">
          <div className={`custom-modal ${theme}`}>
            <h3>{title}</h3>
            <select name="" id="" onChange={roleHandler}>
              <option value={user.role}>Seleccionar</option>
              <option value="client">client</option>
              <option value="admin">admin</option>
              <option value="superAdmin">superAdmin</option>
            </select>
            <div className="button-modal-container">
              <button onClick={closeModal} className="button">
                Cancelar
              </button>
              <button onClick={eventModal} className="button">
                {titleModalButton}
              </button>
            </div>
          </div>
        </div>
      )}
      {message ? (
        <div className="custom-modal-overlay">
          <div className={`custom-modal ${theme}`}>
            <h3>{finalMessage}</h3>
            <div className="button-modal-container">
              <button onClick={closeMessage} className="button">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SelectModal;
