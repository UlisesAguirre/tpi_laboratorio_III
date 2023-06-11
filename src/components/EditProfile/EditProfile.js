import Form from "../Form/Form/Form"
import ClientMenu from "../ClientMenu/ClientMenu"

import "./editProfile.css"
import ProfileDataView from "../ProfileDataView/ProfileDataView"
import { useState } from "react"
import ListUser from "../ListUser/ListUser"



const EditProfile = ({edit}) => {
  const [editProfile, setEditProfile] = useState(edit);

  const client = {
    id: 1,
    icon: "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg",
    name: "Tito",
    lastName: "Fuentes",
    phone: "3416476578",
    email: "tugrp@example.com",
    password: "123456",
    role: "client", //Ir variando entre los roles de admin, client y superAdmin para ver las diferencias. (userContext)
  }

  const editProfileHandler = () => {
    setEditProfile(true);
  };

  return (
    <div className="client-container">
      <ClientMenu client={client} />
      <div className="editProfile-container">
        {client.role === "client"? (
          editProfile ?
            (<Form title={"Editar perfil"} buttonTitle={"Guardar"} link={"/edit-profile"} data={client} register={false} />)
            : (<ProfileDataView user={client} editProfile={editProfileHandler} />)
          
        ): client.role === "admin"? <ListUser typeUser={"clients"} /> : <ListUser typeUser={"users"}/>}
      </div>
    </div>
  )
}

export default EditProfile