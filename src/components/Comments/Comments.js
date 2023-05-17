
import ComentCard from "../ComentCard/ComentCard"

import "./comments.css"

const Comments = ({ icon, name, coment, rate, date }) => {
    return (
        <div className="comments-container">
            <h1>Nuestros clientes</h1>
            <div className="select-comments">
                <label for="orderBy">Ordenar por:</label>
                <select name="orderBy" id="orderBy" className="button">
                    <option value="">-- Selecionar --</option>
                    <option value="new">Mas recientes</option>
                    <option value="older">Mas antiguas</option>
                    <option value="better">Mas alta</option>
                    <option value="worse">Mas baja</option>
                </select>
            </div>
            <div className="comment-box">
                <button className="circle-button">&lt;</button>
                <ComentCard
                    icon={icon}
                    name={name}
                    coment={coment}
                    rate={rate}
                    date={date}
                />
                <ComentCard
                    icon={icon}
                    name={name}
                    coment={coment}
                    rate={rate}
                    date={date}
                />
                <ComentCard
                    icon={icon}
                    name={name}
                    coment={coment}
                    rate={rate}
                    date={date}
                />
                <button className="circle-button">&gt;</button>
            </div>

        </div>
    )
}

export default Comments
