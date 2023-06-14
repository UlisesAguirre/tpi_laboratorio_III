import ClientMenu from "../ClientMenu/ClientMenu"

import "./clientMain.css"

  import UserContext from "../Context/UserContext"
import { useContext } from "react"
  

const ClientMain = () => {
  const { user } = useContext(UserContext)
  console.log(user)

  return (
    <div className="client-container">
        <ClientMenu />
    </div>
  )
}

export default ClientMain