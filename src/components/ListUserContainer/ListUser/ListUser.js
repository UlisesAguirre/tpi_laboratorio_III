import React, { useState, useEffect, useContext } from "react";
import { db } from "../../../firebase";
import UserContext from "../../Context/UserContext";

import "./listUser.css";

import Modal from "../../shared/Modal/Modal";
import SelectModal from "../../shared/SelectModal/SelectModal";
import ConfirmModal from "../../shared/ConfirmModal/ConfirmModal";
import { ThemeContext } from "../../Context/ThemeContext";

const ListUser = () => {
  const { theme } = useContext(ThemeContext)

  const { user } = useContext(UserContext);

  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [modal, setModal] = useState({
    modalOpen: false,
    modalTitle: "",
    modalMessage: "",
  });
  const [userToDelete, setUserToDelete] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const getUsers = async () => {
    try {
      const querySnapshot = await db.collection("users").get();
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(data);
    } catch (error) {
      setModal({
        modalOpen: true,
        modalTitle: "Error",
        modalMessage: `Error al obtener los usuarios:${error}`,
      });
    }
  };

  const getClients = async () => {
    try {
      const querySnapshot = await db
        .collection("users")
        .where("role", "==", "client")
        .get();
      const data = querySnapshot.docs.map((doc) => doc.data());
      setClients(data);
    } catch (error) {
      setModal({
        modalOpen: true,
        modalTitle: "Error",
        modalMessage: `Error al obtener los clientes: ${error}`,
      });
    }
  };

  const search = () => {
    const input = searchInput.toLowerCase().trim();
    let filteredList = [];

    if (user.role === "superAdmin") {
      filteredList = users.filter(
        (user) =>
          user.name.toLowerCase().includes(input) ||
          user.lastName.toLowerCase().includes(input) ||
          user.email.toLowerCase().includes(input)
      );
    } else {
      filteredList = clients.filter(
        (client) =>
          client.name.toLowerCase().includes(input) ||
          client.lastName.toLowerCase().includes(input) ||
          client.email.toLowerCase().includes(input)
      );
    }

    return filteredList;
  };

  const searchInputHandler = (event) => {
    const value = event.target.value;
    setSearchInput(value);
  };

  const modifyRole = async (newRole, user) => {
    try {
      const userRef = db.collection("users").where("email", "==", user.email);
      const querySnapshot = await userRef.get();

      querySnapshot.docs.forEach((doc) => {
        doc.ref.update({ role: newRole });
      });

      getUsers();
    } catch (error) {
      setModal({
        modalOpen: true,
        modalTitle: "Error",
        modalMessage: `Error al actualizar el rol del usuario : ${error}`,
      });
    }
  };

  const deleteUser = async (item) => {
    try {
      await db.collection("users").doc(item).delete();
      setModal({
        modalOpen: true,
        modalTitle: "Aviso",
        modalMessage: "Usuario eliminado con éxito",
      });
      getUsers();
    } catch (error) {
      setModal({
        modalOpen: true,
        modalTitle: "Error",
        modalMessage: `Error al eliminar el usuario: ${error}`,
      });
    }
    setConfirmModalOpen(false);
  };

  useEffect(() => {
    getUsers();
    getClients();
  }, []);

  const filteredList = search();

  return (
    <div className="list-container">
      <h2>{user.role === "admin" ? "Clientes:" : "Usuarios:"}</h2>
      <div className={`listUser-container ${theme}`}>
        <div className="search-container">
          <h2>Buscar:</h2>
          <input
            type="text"
            value={searchInput}
            onChange={searchInputHandler}
          />
        </div>
        <div className="listUser-table-container">
          <table className="listUser-table">
            {clients.length === 0 || users.length === 0 ? (
              <p>No hay usuarios registrados</p>
            ) : (
              <>
                <thead>
                  <tr>
                    <th>Nombre y apellido:</th>
                    <th>Email:</th>
                    <th>{user.role === "admin" ? "Teléfono:" : "Rol:"}</th>
                    {user.role === "superAdmin" && <th></th>}
                  </tr>
                </thead>
                <tbody className="listUser-scrollbar">
                  {searchInput !== "" && filteredList.length === 0 ? (
                    <tr>
                      <td colSpan={3}>No hay coincidencias</td>
                    </tr>
                  ) : (
                    filteredList.map((item) => (
                      <tr key={item.id}>
                        <td>{`${item.name} ${item.lastName}`}</td>
                        <td>{item.email}</td>
                        <td>
                          {user.role === "admin" ? item.phone : item.role}
                        </td>
                        {user.role === "admin" ? null : (
                          <td>
                            <div className="reservation-buttons">
                              <SelectModal
                                title={"Modificar rol"}
                                titleModalButton={"Guardar"}
                                finalMessage={"Rol modificado con éxito"}
                                user={item}
                                modifyRole={modifyRole}
                              />
                              <div>
                                <button
                                  className="button"
                                  onClick={() => {
                                    setUserToDelete(item.id);
                                    setConfirmModalOpen(true);
                                  }}
                                >
                                  Eliminar usuario
                                </button>
                                {confirmModalOpen && (
                                  <ConfirmModal
                                    title="Eliminar usuario"
                                    message="¿Estás seguro de que deseas eliminar tu cuenta?"
                                    onConfirm={() => deleteUser(userToDelete)}
                                    onCancel={() => setConfirmModalOpen(false)}
                                  />
                                )}
                              </div>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </>
            )}
          </table>
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

export default ListUser;
