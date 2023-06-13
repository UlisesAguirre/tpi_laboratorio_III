
import { Link } from "react-router-dom"
import "./descriptionRestaurant.css"

const DescriptionRestaurant = () => {
  return (
    <div className="description-container">
      <h2>Somos autenticos en sabor</h2>
      <p>Deliciosas pizzas hechas a mano con ingredientes frescos y recetas caseras. Reserva tu mesa de forma
        rápida y fácil en nuestra página web.</p>
      <div className="button-menu">
        <button className="button"><Link>¡Conocé nuestro menú!</Link></button>
      </div>
    </div>
  )
}

export default DescriptionRestaurant
