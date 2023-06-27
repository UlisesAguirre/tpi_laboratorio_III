import { useContext, useEffect, useState } from "react";
import ComentCard from "./ComentCard/ComentCard";
import { db } from "../../firebase";
import { ThemeContext } from "../Context/ThemeContext";

import "./comments.css";
import Modal from "../shared/Modal/Modal";

const Comments = () => {
  const { theme } = useContext(ThemeContext);

  const [comments, setComments] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedCards, setDisplayedCards] = useState([]);
  const [modal, setModal] = useState({
    modalOpen: false,
    modalTitle: "",
    modalMessage: "",
  });

  const getComments = async () => {
    try {
      const querySnapshot = await db
        .collection("comments")
        .orderBy("date", "desc")
        .get();
      const data = querySnapshot.docs.map((doc) => doc.data());
      setComments(data);
    } catch (error) {
      setModal({
        modalOpen: true,
        modalTitle: "Error",
        modalMessage: "Ocurrió un error al obtener los comentarios",
      });
    }
  };

  const handlePrevClick = () => {
    if (comments.length < 3 || activeIndex === 0) return;
    setActiveIndex((prevIndex) => prevIndex - 1);
  };

  const handleNextClick = () => {
    if (comments.length < 3 || activeIndex === comments.length - 1) return;
    setActiveIndex((prevIndex) => prevIndex + 1);
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    let sortedComments = [...comments];

    if (value === "worse") {
      sortedComments.sort((a, b) => a.rate - b.rate);
    } else if (value === "better") {
      sortedComments.sort((a, b) => b.rate - a.rate);
    }

    setComments(sortedComments);
    setActiveIndex(0);
  };

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    const startIndex = activeIndex;
    const endIndex = activeIndex + 2;
    const newDisplayedCards = comments.slice(startIndex, endIndex + 1);

    if (newDisplayedCards.length <= 2) return;
    setDisplayedCards(newDisplayedCards);
  }, [comments, activeIndex]);

  return (
    <div className={theme}>
      <div className="comments">
        <h1>Nuestros clientes</h1>
        <div className="select-comments">
          <label htmlFor="orderBy">Ordenar por:</label>
          <select
            name="orderBy"
            id="orderBy"
            className="button"
            onChange={handleSortChange}
          >
            <option value="">-- Selecionar --</option>
            <option value="better">Mejor calificacion</option>
            <option value="worse">Peor calificacion</option>
          </select>
        </div>
        <div className="comment-box">
          {activeIndex === 0 ? null : (
            <button className="circle-button" onClick={handlePrevClick}>
              &lt;
            </button>
          )}
          <div className="comment-card-box">
            {displayedCards.map((c, index) => (
              <ComentCard
                key={index}
                name={c.name}
                comment={c.comment}
                rate={c.rate}
                date={c.date}
              />
            ))}
          </div>
          {activeIndex + 2 == comments.length - 1 ? null : (
            <button className="circle-button" onClick={handleNextClick}>
              &gt;
            </button>
          )}
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

export default Comments;
