import ConfirmModal from "../../shared/ConfirmModal/ConfirmModal";
import { db } from "../../../firebase";

import "./profileDataView.css";
import { useContext, useState } from "react";
import UserContext from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Modal from "../../shared/Modal/Modal";

const ProfileDataView = ({ user, editProfile }) => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [modal, setModal] = useState({
    modalOpen: false,
    modalTitle: "",
    modalMessage: "",
  });

  const editProfileHandler = () => {
    editProfile();
  };

  const deleteUser = async (user) => {
    try {
      const userRef = db.collection("users").where("email", "==", user.email);
      const querySnapshot = await userRef.get();

      querySnapshot.docs.forEach((doc) => {
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
      <div className="data-container-background">
        <div className="data-container">
          <h3>Nombre:</h3>
          <p>{user.name}</p>
        </div>
        <div className="data-container">
          <h3>Apellido:</h3>
          <p>{user.lastName}</p>
        </div>
        <div className="data-container">
          <h3>Numero de telefono:</h3>
          <p>{user.phone}</p>
        </div>
        <div className="data-container">
          <h3>Email:</h3>
          <p>{user.email}</p>
        </div>
        <div className="button-data-container">
          <button onClick={editProfileHandler} className="button">
            Editar
          </button>
          <ConfirmModal
            title={"Eliminar"}
            titleModalButton={"Eliminar"}
            finalMessage={"Usuario eliminado"}
            user={user}
            deleteUser={deleteUser}
          />
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
