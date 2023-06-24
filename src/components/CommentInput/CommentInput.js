import { useContext, useState } from 'react';
import Main from '../MainContainer/Main/Main';
import StarRating from '../shared/StarRating/StarRating';
import UserContext from '../Context/UserContext';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';

import "./commentInput.css";

const CommentInput = () => {

    const navigate = useNavigate();

    const { user } = useContext(UserContext);

    const [comment, setComment] = useState("");
    const [rating, setRating] = useState("");

    const commentHandler = (event) => {
        setComment(event.target.value);
    };

    const sendComment = async () => {

        if (comment.length === 0) return alert("Ingrese un comentario mas extenso");

        if(rating.length === 0) return alert("Recuerdo marcar su calificación");

        const date = new Date();

        const commentData = {
            icon: user.icon,
            name: user.name,
            rate: rating,
            comment: comment,
            date: date
        };

        try {
            const docRef = await db.collection("comments").add(commentData);
            console.log("Comment added with ID: ", docRef.id);
            alert("Comentario enviado correctamente")
            navigate("/main")
        } catch (error) {
            console.error("Error adding comment: ", error);
        }
    };

    return (
        <div className="client-container">
            <Main />
            <div className='comment-container'>
                <h2>Deja tu comentario:</h2>
                <div className='comment-background'>
                    <div className='rating-container'>
                        <p>Califica tu experiencia</p>
                        <StarRating setRating={setRating} />
                    </div>
                    <input type="text" onChange={commentHandler} placeholder='Comparte detalles sobre tu estadia en Pizzeria Paradiso :)' />
                    <div className='button-comment-container'>
                        <button className='button' onClick={sendComment}>Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentInput;