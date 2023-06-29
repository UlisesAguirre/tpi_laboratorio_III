import { useContext, useState } from "react";
import Main from "../MainContainer/Main/Main";
import StarRating from "../shared/StarRating/StarRating";
import UserContext from "../Context/UserContext";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

import "./commentInput.css";
import Modal from "../shared/Modal/Modal";
import { ThemeContext } from "../Context/ThemeContext";

const CommentInput = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [modal, setModal] = useState({
    modalOpen: false,
    modalTitle: "",
    modalMessage: "",
  });

  const closeModal = () => {
    setModal({ modalOpen: false });
  };

  const commentHandler = (event) => {
    setComment(event.target.value);
  };

  const sendComment = async () => {
    if (comment.length === 0)
      return setModal({
        modalOpen: true,
        modalTitle: "Aviso",
        modalMessage: "El comentario no puede estar vacio",
      });

    if (rating.length === 0)
      return setModal({
        modalOpen: true,
        modalTitle: "Aviso",
        modalMessage: "Recuerde marcar su calificación",
      });

    const date = new Date();

    const commentData = {
      icon: user.icon,
      name: user.name,
      rate: rating,
      comment: comment,
      date: date,
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
        <div className={`comment-background ${theme}`}>
          <div className='rating-container'>
            <p>Califica tu experiencia</p>
            <StarRating setRating={setRating} />
          </div>
          <textarea cols="30" rows="10" onChange={commentHandler} placeholder='Comparte detalles sobre tu estadia en Pizzeria Paradiso :)' />
          <div className='button-comment-container'>
            <button className='button' onClick={sendComment}>Enviar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentInput;
