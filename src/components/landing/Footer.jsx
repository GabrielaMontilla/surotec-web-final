import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src="/logo-2.png" alt="SUROTEC" />
        </div>

        <div className="footer-sections">
          <div className="footer-column">
            <h3>QUIÉNES SOMOS</h3>
            <ul>
              <li><Link to="/nosotros">Historia</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>QUÉ HACEMOS</h3>
            <ul>
              <li><Link to="/noticias">Noticias</Link></li>
              <li><Link to="/en-construccion">Proyectos</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>CONTACTO</h3>
            <ul>
              <li><Link to="/contacto">Escríbenos</Link></li>
              <li><a href="mailto:info@surotec.com">info@surotec.com</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 SUROTEC. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
