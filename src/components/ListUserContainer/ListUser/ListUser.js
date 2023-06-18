import React, { useState, useEffect, useContext } from "react";
import UserButton from "../../shared/UserButton/UserButton";
import { db } from "../../../firebase";
import UserContext from "../../Context/UserContext";

import "./listUser.css";

const ListUser = () => {
  const { user } = useContext(UserContext);

  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);

  const [filteredList, setFilteredList] = useState([]);
  const [searchInput, setSearchInput] = useState("");


  const getUsers = async () => {
    await db.collection("users").onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setUsers(data);
    });
  };

  const getClients = async () => {
    try {
      const querySnapshot = await db
        .collection("users")
        .where("role", "==", "client")
        .get();
      const clientsData = querySnapshot.docs.map((doc) => doc.data());
      setClients(clientsData);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
      alert("Ocurrió un error al obtener los clientes");
    }
  };

  const searchHandler =() => {
    if (user.role === "admin") {
      const filteredUsers = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
          user.email.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredList(filteredUsers);
    } else {
      const filteredClients = clients.filter(
        (client) =>
          client.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          client.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
          client.email.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredList(filteredClients);
    }
  };

  const searchInputHandler = (event) => {
    const value = event.target.value;
    setSearchInput(value);
  };


  useEffect(() => {
    getUsers();
    getClients();
  }, [searchHandler]);

  return (
    <div className="list-container">
      <h2>{users.role == "admin" ? "Clientes:" : "Usuarios:"}</h2>
      <div className="listUser-container">
          <div className="search-container">
            <input type="text" value={searchInput} onChange={searchInputHandler}/>
            <button className="button" onClick={searchHandler}>Buscar</button>
          </div>
        <table className="listUser-table">
          {/* Lógica para respuesta sin usuarios registrados */}
          {clients == null ? (
            <p>No hay usuarios registrados</p>
          ) : users == null ? (
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
                {(filteredList? filteredList : user.role === "admin" ? clients : users).map((e) => (
                  <tr key={e.id}>
                    <td>
                      {e.name} {e.lastName}
                    </td>
                    <td>{e.email}</td>
                    <td>{user.role === "admin" ? e.phone : e.role}</td>
                    {user.role === "admin" ? null : (
                      <td>
                        <div className="reservation-buttons">
                          {/* EventButton */}
                          <UserButton to="" buttonName="Modificar" />
                          <UserButton to="" buttonName="Eliminar" />
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
                {filteredList == false? <p>No hay conicidencias</p> : null}
              </tbody>
            </>
          )}
        </table>
      </div>
    </div>
  );
};

export default ListUser;
