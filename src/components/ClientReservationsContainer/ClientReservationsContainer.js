import React, { useEffect, useState } from "react";
import Main from "../MainContainer/Main/Main";
import ClientReservationTable from "./ClientReservationsTable/ClientReservationTable";
import useGetData from "../CustomsHook/useGetData";
import Modal from "../shared/Modal/Modal";

const ClientReservationsContainer = () => {
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
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ClientReservationTable listTurns={turns} />
      )}
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

export default ClientReservationsContainer;
