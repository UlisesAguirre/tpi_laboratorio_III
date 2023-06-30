import { useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import UserContext from "../Context/UserContext";
import Main from "../MainContainer/Main/Main";
import FullForm from "../Forms/FullForm/FullForm";
import ProfileDataView from "./ProfileDataView/ProfileDataView";
import Modal from "../shared/Modal/Modal";
import "./editProfile.css";

const EditProfile = ({ edit }) => {
  const { user } = useContext(UserContext);

  const [editProfile, setEditProfile] = useState(edit);
  const [modal, setModal] = useState({
    modalOpen: false,
    modalTitle: "",
    modalMessage: "",
  });
  const [userLog, setUserLog] = useState([]);

  useEffect(() => {
    getByEmailFirebase(user.email);
  }, [user.email]);

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

  const editProfileHandler = () => {
    setEditProfile(true);
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
          <ProfileDataView
            userData={userLog}
            editProfile={editProfileHandler}
          />
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
