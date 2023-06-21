import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import Main from "../MainContainer/Main/Main";
import "./turnsContainer.css";
import TurnsView from "./TurnsView/TurnsView";
import TurnsForm from "./TurnsForm/TurnsForm";

const TurnsContainer = () => {
  const [turns, setTurns] = useState([]);
  const [addTurnEnable, setAddTurnEnable] = useState(false);

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

  const showForm = () => {
    setAddTurnEnable(!addTurnEnable);
  };
  return (
    <div className="client-container">
      <Main />
      <TurnsView listTurns={turns} />
      <button className="button" onClick={showForm}>
        {!addTurnEnable ? "+ Añadir turno" : "Cerrar formulario"}
      </button>
      {addTurnEnable && <TurnsForm />}
    </div>
  );
};

export default TurnsContainer;
