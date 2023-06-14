import Form from "../Form/Form/Form"
import ClientMenu from "../ClientMenu/ClientMenu"

import "./editProfile.css"
import ProfileDataView from "../ProfileDataView/ProfileDataView"
import { useContext, useEffect, useState } from "react"
import ListUser from "../ListUser/ListUser"
import UserContext from "../Context/UserContext"
import { db } from "../../firebase"



const EditProfile = ({ edit }) => {
  const [editProfile, setEditProfile] = useState(edit);

  const [userLog, setUserLog] = useState([])

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
      console.log(email)
      setUserLog(querySnapshot.docs[0].data());
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
      alert("Ocurrió un error durante el inicio de sesión");
    }
  };

  useEffect(() => {
    getByEmailFirebase(user.email);
  }, [])



  return (
    <div className="client-container">
      <ClientMenu />
      <div className="editProfile-container">
        {user.role === "client" ? (
          editProfile ?
            (<Form title={"Editar perfil"} buttonTitle={"Guardar"} link={"/edit-profile"} data={userLog} register={false} />)
            : (<ProfileDataView user={userLog} editProfile={editProfileHandler} />)

        ) : user.role === "admin" ? <ListUser typeUser={"clients"} /> : <ListUser typeUser={"users"} />}
      </div>
    </div>
  )
}

export default EditProfile