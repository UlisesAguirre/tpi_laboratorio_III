
import NavBar from "../NavBar/NavBar"
import DescriptionRestaurant from "../DescriptionRestaurant/DescriptionRestaurant"
import Comments from "../Comments/Comments"

import "./main.css"


//Ejemplo comentario cliente

const userComent = {
  icon: "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg",
  name : "Usuario",
  coment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, quasi.",
  rate: 4,
  date: "14/4/22"

}

const Main = () => {
  return (
    <div className="main-container" >
      {/* Div para poder aplicar el background solo a un parte */}
      <div className="fixed-main">  
        <NavBar/>
        <DescriptionRestaurant/>
      </div>
      <Comments
          icon = {userComent.icon}
          name = {userComent.name}
          coment = {userComent.coment}
          rate = {userComent.rate}
          date = {userComent.date}
      />
    </div>
  )
}

export default Main