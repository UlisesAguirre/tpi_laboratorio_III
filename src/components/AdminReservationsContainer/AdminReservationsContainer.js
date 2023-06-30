import React, { useEffect, useState } from "react";
import useGetData from "../CustomsHook/useGetData";
import Main from "../MainContainer/Main/Main";
import AdminReservationTable from "./TurnsView/AdminReservationTable";
import Modal from "../shared/Modal/Modal";
import "./adminReservationsContainer.css";

const AdminReservationsContainer = () => {
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
      {loading ? <p>Cargando...</p> : <AdminReservationTable listTurns={turns} />}
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

export default AdminReservationsContainer;
