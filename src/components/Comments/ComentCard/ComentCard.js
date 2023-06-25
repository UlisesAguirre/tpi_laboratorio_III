import { useEffect, useState } from "react"
import StarRating from "../../shared/StarRating/StarRating"
import iconUser from "../../../assets/img/user.png"

import "./comentCard.css"

const ComentCard = ({ key, name, comment, rate, date }) => {

  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    // Convertir el objeto Timestamp a un objeto Date
    const timestamp = new Date(date.seconds * 1000 + date.nanoseconds / 1000000);

    // Formato de fecha "dd/mm/aaaa hh:mm"
    const day = String(timestamp.getDate()).padStart(2, "0");
    const month = String(timestamp.getMonth() + 1).padStart(2, "0");
    const year = timestamp.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    setFormattedDate(formattedDate);
  }, [])

  return (
    <div className="comentCard-container" key={key}>
      <div className="title-user-container">
        <div className="icon-user-container">
          <img src={iconUser} alt="" />
          <p>{name}</p>
        </div>
        <div className="coment-rating-container">
          <p><StarRating rate={rate} mode={true} /></p>
        </div>
      </div>

      <p className="coment">"{comment}"</p>
      <p className="date">{formattedDate}</p>
    </div>
  )
}

export default ComentCard