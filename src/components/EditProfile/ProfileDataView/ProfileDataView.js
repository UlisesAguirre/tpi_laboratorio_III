import CustomModal from "../../shared/Modal/CustomModal";
import { db } from "../../../firebase";

import "./profileDataView.css"
import { useContext } from "react";
import UserContext from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

const ProfileDataView = ({ user, editProfile }) => {

    const {logout} = useContext(UserContext);
    const navigate = useNavigate(); 

    const editProfileHandler = () => {
        editProfile()
    };

    const deleteUser = async (user) => {
        try {
          const userRef = db.collection("users").where("email", "==", user.email);
          const querySnapshot = await userRef.get();
      
          querySnapshot.docs.forEach((doc) => {
            doc.ref.delete();
          });
      
          console.log("Usuario eliminado con éxito");
          navigate("/");
          logout();
        } catch (error) {
          console.error("Error al eliminar el usuario:", error);
          alert("Ocurrió un error al eliminar el usuario");
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
                    <button onClick={editProfileHandler} className="button">Editar</button>
                    <CustomModal
                        title={"Eliminar"}
                        titleModalButton={"Eliminar"}
                        finalMessage={"Usuario eliminado"}
                        user={user}
                        deleteUser={deleteUser}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProfileDataView