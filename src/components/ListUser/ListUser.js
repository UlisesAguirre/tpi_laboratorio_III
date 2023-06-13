import React, { useState, useEffect } from "react";
import UserButton from "../UserButton/UserButton";
import { db } from "../../firebase";

import "./listUser.css";

const ListUser = ({ typeUser }) => {
  const [clients, setClients] = useState([]);

  const getClients = async () => {
    await db.collection("users").onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setClients(data);
    });
  };

  useEffect(() => {
    getClients();
  }, []);

  // Ejemplo de array de respuesta de la API
  const user = [
    {
      id: 3,
      icon: "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg",
      name: "Pedro",
      lastName: "Alvarez",
      email: "email22@example.com",
      password: "1fff456",
      role: "admin",
    },
  ];

  const emptyUsers = false;

  return (
    <div className="listUser-container">
      <table className="clientReservations-table">
        {/* Lógica para respuesta sin usuarios registrados */}
        {emptyUsers ? (
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
              {(typeUser === "clients" ? clients : user).map((e) => (
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
