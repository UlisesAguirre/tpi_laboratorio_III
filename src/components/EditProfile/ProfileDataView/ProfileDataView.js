import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase";
import UserContext from "../../Context/UserContext";
import { ThemeContext } from "../../Context/ThemeContext";
import ConfirmModal from "../../shared/ConfirmModal/ConfirmModal";
import Modal from "../../shared/Modal/Modal";
import "./profileDataView.css";

const ProfileDataView = ({ userData, editProfile }) => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { logout, user: userLog } = useContext(UserContext);

  const [modal, setModal] = useState({
    modalOpen: false,
    modalTitle: "",
    modalMessage: "",
  });
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const editProfileHandler = () => {
    editProfile();
  };

  const handleConfirmDeleteUser = async () => {
    try {
      const userToDelete = await db
        .collection("users")
        .where("email", "==", userLog.email)
        .get();
      userToDelete.docs.forEach((doc) => {
        doc.ref.delete();
      });
      logout();
      navigate("/");
    } catch (error) {
      setModal({
        modalOpen: false,
        modalTitle: "Error",
        modalMessage: "Ocurrio un error al eliminar el usuario",
      });
    }
  };

  return (
    <div className="profileDataView-container">
      <h2>Mi perfil:</h2>
      <div className={`data-container-background ${theme}`}>
        <div className="data-container">
          <h3>Nombre:</h3>
          <p>{userData.name}</p>
        </div>
        <div className="data-container">
          <h3>Apellido:</h3>
          <p>{userData.lastName}</p>
        </div>
        <div className="data-container">
          <h3>Numero de telefono:</h3>
          <p>{userData.phone}</p>
        </div>
        <div className="data-container">
          <h3>Email:</h3>
          <p>{userData.email}</p>
        </div>
        <div className="button-data-container">
          <button onClick={editProfileHandler} className="button">
            Editar
          </button>
          <button className="button" onClick={() => setConfirmModalOpen(true)}>
            Eliminar usuario
          </button>
          {confirmModalOpen && (
            <ConfirmModal
              title="Eliminar usuario"
              message="¿Estás seguro de que deseas eliminar tu cuenta?"
              onConfirm={handleConfirmDeleteUser}
              onCancel={() => setConfirmModalOpen(false)}
            />
          )}
        </div>
      </div>
      {modal.modalOpen && (
        <Modal
          title={modal.modalTitle}
          message={modal.modalMessage}
          onClose={() => setModal({ modalOpen: false })}
        />
      )}
    </div>
  );
};

export default ProfileDataView;
