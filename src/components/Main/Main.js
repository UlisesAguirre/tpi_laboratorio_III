import NavBar from "../NavBar/NavBar"
import DescriptionRestaurant from "../DescriptionRestaurant/DescriptionRestaurant"

import "./main.css"


//Ejemplo comentario cliente


const Main = () => {

  return (
    <div className="main-container" >
      {/* Div para poder aplicar el background solo a un parte */}
      <div className="fixed-main">  
        <NavBar/>
        <DescriptionRestaurant/>
      </div>
    </div>
  )
}

export default Main