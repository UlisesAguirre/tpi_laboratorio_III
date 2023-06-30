import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import "./descriptionRestaurant.css";

const DescriptionRestaurant = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="description-container">
      <h2>Somos autenticos en sabor</h2>
      <p>
        Deliciosas pizzas hechas a mano con ingredientes frescos y recetas
        caseras. Reserva tu mesa de forma rápida y fácil en nuestra página web.
      </p>
      <div className="button-menu">
        <button className="button">
          <Link to={user ? "/main" : "/login"}>¡Hace tu reserva!</Link>
        </button>
      </div>
    </div>
  );
};

export default DescriptionRestaurant;
