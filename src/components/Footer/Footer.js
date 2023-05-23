import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import "./footer.css"

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="data-container">
        <div>
          <h2>Dirección</h2>
          <p>Av. San Martin 340</p>
        </div>
        <div className="social-media-container">
          <h2>Seguinos en nuestras redes:</h2>
          <div className="social-media">
            <a href=""><FontAwesomeIcon icon={faInstagram} /></a>
            <a href=""><FontAwesomeIcon icon={faFacebook} /></a>
            <a href=""><FontAwesomeIcon icon={faWhatsapp} /></a>
          </div>
        </div>
        <div>
          <h2>Horarios de atención:</h2>
          <p>Martes a domingos: 9am - 23pm </p>
        </div>
      </div>
      <div className='copyright'>
        <p>Daguiga Reservation System - &copy; 2023 All rights reserved. </p>
      </div>
    </div>
  )
}

export default Footer