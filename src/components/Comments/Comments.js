import { useContext } from "react"
import ComentCard from "./ComentCard/ComentCard"

import "./comments.css"
import { ThemeContext } from "../Context/ThemeContext"

const Comments = () => {

    const {theme} = useContext(ThemeContext)

    const userComent = [
        {
            icon: "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg",
            name: "Usuario",
            coment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, quasi.",
            rate: 4,
            date: "14/4/22"
        },
        {
            icon: "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg",
            name: "Usuario",
            coment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, quasi.",
            rate: 4,
            date: "14/4/22"
        },
        {
            icon: "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg",
            name: "Usuario",
            coment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, quasi.",
            rate: 4,
            date: "14/4/22"
        }

    ]

    return (
        <div className={theme}>
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
                    {userComent.map(u => <ComentCard 
                        icon={u.icon}
                        name={u.name}
                        coment={u.coment}
                        rate={u.rate}
                        date={u.date}
                    />)}    
                    <button className="circle-button">&gt;</button>
                </div>

            </div>
        </div>
    )
}

export default Comments
