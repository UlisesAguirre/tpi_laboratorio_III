import React, { useEffect, useState } from 'react'
import Main from '../MainContainer/Main/Main'
import { db } from '../../firebase';
import ClientReservationTable from './ClientReservationsView/ClientReservationTable';

const ClientReservationsContainer = () => {
  const [turns, setTurns] = useState([]);

  const getTurns = async () => {
    await db.collection("turns").onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setTurns(data);
    });
  };
  useEffect(() => {
    getTurns();
  }, []);

  return (
    <div className="client-container">
    <Main />
    <ClientReservationTable listTurns={turns}/>
    </div>
  )
}

export default ClientReservationsContainer