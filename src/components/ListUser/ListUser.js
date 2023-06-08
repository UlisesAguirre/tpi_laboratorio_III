import React from 'react'
import UserButton from '../UserButton/UserButton';

import "./listUser.css"

const ListUser = ({ typeUser }) => {


    //ejemplo arrays de la response de la api

    const client = [
            {
            id: 1,
            icon: "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg",
            name: "Tito",
            lastName: "Fuentes",
            phone: "3416476578",
            email: "tugrp@example.com",
            password: "123456",
            role: "client",
        }
    ]

    const user = [
            {
            id: 3,
            icon: "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg",
            name: "Pedro",
            lastName: "Alvarez",
            email: "email22@example.com",
            password: "1fff456",
            role: "admin",
        }
    ]

    //simulacion array vacio
    const emptyUsers = false;

    return (
        <div className='listUser-container'>
            <table className="clientReservations-table">
                {/*Logica para response sin reservas segun id-client --CAMBIAR--*/}
                {emptyUsers === true ? <p>No hay datos cargados</p> : (
                    <>
                        <thead>
                            <tr>
                                <th>Id:</th>
                                <th>Nombre y apellido:</th>
                                <th>Email:</th>
                                {typeUser === "clients" ? <th>Telefono:</th> : <th>Rol:</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (typeUser === "clients" ? client : user).map((e) => (
                                    <tr key={e.id}>
                                        <td>{e.id}</td>
                                        <td>{e.name} {e.lastName}</td>
                                        <td>{e.email}</td>
                                        {typeUser === "clients" ? <td>{e.phone}</td> : <td>{e.role}</td>}
                                        {typeUser === "clients" ? null : (
                                            <td>
                                                <div className="reservation-buttons">
                                                    <UserButton to="" buttonName="Modificar" />
                                                    <UserButton to="" buttonName="Eliminar" />
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            }
                        </tbody>
                    </>
                )}
            </table>
        </div>
    )
}

export default ListUser