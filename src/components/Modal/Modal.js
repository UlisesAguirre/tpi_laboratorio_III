import React from 'react'
import "./modal.css"

const Modal = ({children, estado, cambiarEstado}) => {
    
    return (
        <>
        {estado && 
            <div className='modal-container'>
                <div className='modal-sub-container' >
                    <div className='encabezado-modal' >
                        <h3>Aviso</h3>
                        <button className='boton-cruz' onClick={cambiarEstado} >X</button>
                    </div>
                    
                    {children}
                </div>
            </div>}
        </>
    )
}


export default Modal