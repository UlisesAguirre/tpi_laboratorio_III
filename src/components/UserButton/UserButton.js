import { Link } from "react-router-dom"

import "./userButton.css"

const UserButton = () => {
  return (
    <div className='userButton-container'>
        <div className='userButton-button-container'>
            <Link to="/login"><button className="button">Ingresar</button></Link>
            <Link to="/"><button className="button">Registrarme</button></Link>
        </div>
    </div>
  )
}

export default UserButton