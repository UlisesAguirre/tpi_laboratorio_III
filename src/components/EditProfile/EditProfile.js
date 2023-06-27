import Main from "../MainContainer/Main/Main";

import "./editProfile.css";
import ProfileDataView from "./ProfileDataView/ProfileDataView";
import { useContext, useEffect, useState } from "react";
import UserContext from "../Context/UserContext";
import { db } from "../../firebase";
import FullForm from "../Forms/FullForm/FullForm";
import Modal from "../shared/Modal/Modal";

const EditProfile = ({ edit }) => {
  const [editProfile, setEditProfile] = useState(edit);
  const [modal, setModal] = useState({
    modalOpen: false,
    modalTitle: "",
    modalMessage: "",
  });

  const [userLog, setUserLog] = useState([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    getByEmailFirebase(user.email);
  }, [user.email]);

  const editProfileHandler = () => {
    setEditProfile(true);
  };

  const getByEmailFirebase = async (email) => {
    try {
      const querySnapshot = await db
        .collection("users")
        .where("email", "==", email)
        .get();
      setUserLog(querySnapshot.docs[0].data());
    } catch (error) {
      setModal({
        modalOpen: true,
        modalTitle: "Error",
        modalMessage: `Error al obtener los datos del usuario: ${error}`,
      });
    }
  };

  return (
    <div className="client-container">
      <Main />
      <div className="editProfile-container">
        {editProfile ? (
          <FullForm
            title={"Editar perfil"}
            buttonTitle={"Guardar"}
            link={"/edit-profile"}
            data={userLog}
            register={false}
          />
        ) : (
          <ProfileDataView user={userLog} editProfile={editProfileHandler} />
        )}
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

export default EditProfile;
