import React, { useState, useEffect } from "react";
import UserButton from "../../shared/UserButton/UserButton";
import { db } from "../../../firebase";

import "./listUser.css";

const ListUser = ({ typeUser }) => {
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);

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

  useEffect(() => {
    getUsers();
    getClients();
  }, []);

  return (
    <div className="listUser-container">
      <table className="clientReservations-table">
        {/* Lógica para respuesta sin usuarios registrados */}
        {clients == null? (
          <p>No hay usuarios registrados</p>
        ):  users == null? (
          <p>No hay usuarios registrados</p>
        ) : (
          <>
            <thead>
              <tr>
                <th>Id:</th>
                <th>Nombre y apellido:</th>
                <th>Email:</th>
                <th>{typeUser === "clients" ? "Teléfono:" : "Rol:"}</th>
              </tr>
            </thead>
            <tbody>
              {(typeUser === "clients" ? clients : users).map((e) => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>
                    {e.name} {e.lastName}
                  </td>
                  <td>{e.email}</td>
                  <td>{typeUser === "clients" ? e.phone : e.role}</td>
                  {typeUser === "clients" ? null : (
                    <td>
                      <div className="reservation-buttons">
                        <UserButton to="" buttonName="Modificar" />
                        <UserButton to="" buttonName="Eliminar" />
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </>
        )}
      </table>
    </div>
  );
};

export default ListUser;
