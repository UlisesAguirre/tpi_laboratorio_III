import React, { useContext } from 'react'
import logo from "../../assets/img/not-found.png"
import { ThemeContext } from '../Context/ThemeContext'

import "./notFound.css"

const NotFound = () => {

  const {theme} = useContext(ThemeContext);

  return (
    <div className={`notFound-container ${theme} `}>
      <h2>Pagina no encontrada :(</h2>
      <div className='notFound-logo-container'>
        <img src={logo} alt="" />
      </div>
    </div>
  )
}

export default NotFound