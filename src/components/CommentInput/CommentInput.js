import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import UserContext from "../Context/UserContext";
import { ThemeContext } from "../Context/ThemeContext";
import Main from "../MainContainer/Main/Main";
import Modal from "../shared/Modal/Modal";
import StarRating from "../shared/StarRating/StarRating";
import "./commentInput.css";

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
      await db
        .collection("comments")
        .add(commentData)
        .then(() => {
          setModal({
            modalOpen: true,
            modalTitle: "Enviado",
            modalMessage: "Comentario enviado exitosamente!",
          });
          setTimeout(() => {
            navigate("/main");
          }, 2000);
        });
    } catch (error) {
      setModal({
        modalOpen: true,
        modalTitle: "Error",
        modalMessage: `Error al enviar el comentario:${error}`,
      });
    }
  };

  return (
    <div className="client-container">
      <Main />
      <div className="comment-container">
        <h2>Deja tu comentario:</h2>
        <div className={`comment-background ${theme}`}>
          <div className="rating-container">
            <p>Califica tu experiencia</p>
            <StarRating setRating={setRating} />
          </div>
          <textarea
            cols="30"
            rows="10"
            onChange={commentHandler}
            placeholder="Comparte detalles sobre tu estadia en Pizzeria Paradiso :)"
          />
          <div className="button-comment-container">
            <button className="button" onClick={sendComment}>
              Enviar
            </button>
          </div>
        </div>
      </div>
      {modal.modalOpen && (
        <Modal
          title={modal.modalTitle}
          message={modal.modalMessage}
          onClose={() => setModal({ modalOpen: false })}
        />
      )}
    </div>
  );
};

export default CommentInput;
