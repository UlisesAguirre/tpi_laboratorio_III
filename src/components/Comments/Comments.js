import ComentCard from "../ComentCard/ComentCard"

import "./comments.css"

const Comments = () => {

    const userComent = {
        icon: "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg",
        name: "Usuario",
        coment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, quasi.",
        rate: 4,
        date: "14/4/22"

    }

    return (
        <div className="comments-container">
            <div className="comments">
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
                        icon={userComent.icon}
                        name={userComent.name}
                        coment={userComent.coment}
                        rate={userComent.rate}
                        date={userComent.date}
                    />
                    <ComentCard
                        icon={userComent.icon}
                        name={userComent.name}
                        coment={userComent.coment}
                        rate={userComent.rate}
                        date={userComent.date}
                    />
                    <ComentCard
                        icon={userComent.icon}
                        name={userComent.name}
                        coment={userComent.coment}
                        rate={userComent.rate}
                        date={userComent.date}
                    />
                    <button className="circle-button">&gt;</button>
                </div>

            </div>
        </div>
    )
}

export default Comments
