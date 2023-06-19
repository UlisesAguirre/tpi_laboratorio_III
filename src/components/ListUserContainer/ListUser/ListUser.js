import React, { useState, useEffect, useContext } from "react";
import { db } from "../../../firebase";
import UserContext from "../../Context/UserContext";

import "./listUser.css";
import CustomModal from "../../shared/Modal/CustomModal";

const ListUser = () => {
  const { user } = useContext(UserContext);

  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const getUsers = async () => {
    try {
      const querySnapshot = await db.collection("users").get();
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setUsers(data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      alert("Ocurrió un error al obtener los usuarios");
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
      console.error("Error al obtener clientes:", error);
      alert("Ocurrió un error al obtener los clientes");
    }
  };

  const searchHandler = () => {
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
    console.log(user, newRole);
  
    try {
      const userRef = db.collection("users").where("email", "==", user.email);
      const querySnapshot = await userRef.get();
  
      querySnapshot.docs.forEach((doc) => {
        doc.ref.update({ role: newRole });
      });
  
      console.log("Rol actualizado con éxito");
    } catch (error) {
      console.error("Error al actualizar el rol del usuario:", error);
      alert("Ocurrió un error al actualizar el rol del usuario");
    }
  };

  const deleteUser = async (user) => {
    try {
      const userRef = db.collection("users").doc(user.id);
      await userRef.delete();
      console.log("Usuario eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      alert("Ocurrió un error al eliminar el usuario");
    }
  };

  useEffect(() => {
    getUsers();
    getClients();
  }, [modifyRole, deleteUser]);

  const filteredList = searchHandler();

  return (
    <div className="list-container">
      <h2>{user.role === "admin" ? "Clientes:" : "Usuarios:"}</h2>
      <div className="listUser-container">
        <div className="search-container">
          <input
            type="text"
            value={searchInput}
            onChange={searchInputHandler}
          />
          <button className="button" onClick={searchHandler}>
            Buscar
          </button>
        </div>
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
                </tr>
              </thead>
              <tbody>
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
                            <CustomModal
                              title={"Modificar rol"}
                              titleModalButton={"Guardar"}
                              finalMessage={"Rol modificado con éxito"}
                              user={item}
                              modifyRole={modifyRole}
                            />
                            <CustomModal
                              title={"Eliminar usuario"}
                              titleModalButton={"Eliminar"}
                              finalMessage={"Usuario eliminado con éxito"}
                              user={item}
                              deleteUser={deleteUser}
                            />
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
  );
};

export default ListUser;