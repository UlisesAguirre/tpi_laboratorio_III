import "./profileDataView.css"

const ProfileDataView = ({ user, editProfile }) => {

    const editProfileHandler = () => {
        editProfile()
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
                </div>
            </div>
        </div>
    )
}

export default ProfileDataView