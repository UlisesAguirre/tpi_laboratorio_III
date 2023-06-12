import Form from "../Form/Form/Form"
import ClientMenu from "../ClientMenu/ClientMenu"

import "./editProfile.css"
import ProfileDataView from "../ProfileDataView/ProfileDataView"
import { useContext, useState } from "react"
import ListUser from "../ListUser/ListUser"
import UserContext from "../Context/UserContext"



const EditProfile = ({edit}) => {
  const [editProfile, setEditProfile] = useState(edit);

  const user = useContext(UserContext);

  const editProfileHandler = () => {
    setEditProfile(true);
  };

  return (
    <div className="client-container">
      <ClientMenu />
      <div className="editProfile-container">
        {user.role === "client"? (
          editProfile ?
            (<Form title={"Editar perfil"} buttonTitle={"Guardar"} link={"/edit-profile"} data={user} register={false} />)
            : (<ProfileDataView user={user} editProfile={editProfileHandler} />)
          
        ): user.role === "admin"? <ListUser typeUser={"clients"} /> : <ListUser typeUser={"users"}/>}
      </div>
    </div>
  )
}

export default EditProfile