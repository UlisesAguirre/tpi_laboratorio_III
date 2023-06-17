import Main from "../MainContainer/Main/Main";

import "./editProfile.css";
import ProfileDataView from "./ProfileDataView/ProfileDataView";
import { useContext, useEffect, useState } from "react";
import UserContext from "../Context/UserContext";
import { db } from "../../firebase";
import FullForm from "../Forms/FullForm/FullForm";
import ListUser from "../ListUserContainer/ListUser/ListUser";


const EditProfile = ({ edit }) => {
  const [editProfile, setEditProfile] = useState(edit);

  const [userLog, setUserLog] = useState([]);

  const { user } = useContext(UserContext);

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
      console.error("Error durante el inicio de sesión:", error);
      alert("Ocurrió un error durante el inicio de sesión");
    }
  };

  useEffect(() => {
    getByEmailFirebase(user.email);
  }, [user.email]);

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
            user.role === "admin" ? <ListUser typeUser={"clients"} /> : <ListUser typeUser={"users"} />
        )}
      </div>
    </div>
  );
};

export default EditProfile;
