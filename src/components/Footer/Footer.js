import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import "./footer.css"
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="info-container">
        <div>
          <h2>Dirección</h2>
          <p>Av. San Martin 340</p>
        </div>
        <div className="social-media-container">
          <h2>Seguinos en nuestras redes:</h2>
          <div className="social-media">
            <Link><FontAwesomeIcon icon={faInstagram} /></Link>
            <Link><FontAwesomeIcon icon={faFacebook} /></Link>
            <Link><FontAwesomeIcon icon={faWhatsapp} /></Link>
          </div>
        </div>
        <div className='business-hours-container'>
          <h2>Horarios de atención:</h2>
          <p>Todos los dias:</p>
          <p>12 a 16 hs</p>
          <p>20 a 00 hs</p>
        </div>
      </div>
      <div className='copyright'>
        <p>Daguiga Reservation System - &copy; 2023 All rights reserved. </p>
      </div>
    </div>
  )
}

export default Footer