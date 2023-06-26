import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import Main from "../MainContainer/Main/Main";
import "./turnsContainer.css";
import TurnsView from "./TurnsView/TurnsView";

const TurnsContainer = () => {
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
      <TurnsView listTurns={turns} />
    </div>
  );
};

export default TurnsContainer;
