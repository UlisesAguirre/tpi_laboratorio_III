
import "./comentCard.css"

const ComentCard = ({icon, name, coment, rate, date}) => {

  console.log(icon)

  return (
    <div className="comentCard-container">
      <img src={icon} alt="" />
      <div className="title-user-coment">
        <p>{name}</p>
        <p>{rate}</p>
      </div>
      <p className="coment">"{coment}"</p>
      <p className="date">{date}</p>
    </div>
  )
}

export default ComentCard