import React, { useEffect, useState } from "react";
import Main from "../MainContainer/Main/Main";
import TurnsView from "./TurnsView/TurnsView";
import useGetData from "../CustomsHook/useGetData";
import "./turnsContainer.css";
import Modal from "../shared/Modal/Modal";

const TurnsContainer = () => {
  
  const { data: turns, loading, error } = useGetData("turns");
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    if (error) {
      setModalOpen(true);
    }
  }, [error]);

  return (
    <div className="client-container">
      <Main />
      {loading?<p>Cargando...</p>:<TurnsView listTurns={turns} />}
      {modalOpen && (
        <Modal
          title={"Error"}
          message={`Error al obtener los turnos ${error}`}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default TurnsContainer;
