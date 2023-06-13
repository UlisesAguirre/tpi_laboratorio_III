import React from 'react'
import ClientMenu from '../ClientMenu/ClientMenu'
import StarRating from '../StarRating/StarRating'

import "./commentInput.css"

const CommentInput = () => {
    return (
        <div className="client-container">
            <ClientMenu />
            <div className='comment-container'>
                <h2>Deja tu comentario</h2>
                <div className='comment-background'>
                    <div className='rating-container'>
                        <p>Califica tu experiencia</p>
                        <StarRating />
                    </div>
                    <input type="text" placeholder='Comparte detalles sobre tu estadia en Pizzeria Paradiso :)' />
                    <div className='button-comment-container'>
                        <button className='button'>Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentInput