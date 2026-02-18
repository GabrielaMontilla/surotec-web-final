import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/landing/Navbar';
import Footer from '../../components/landing/Footer';
import './EnConstruccion.css';

const EnConstruccion = () => {
  return (
    <div className="construccion-page">
      <Navbar />
      
      <section className="construccion-content">
        <div className="construccion-container">
          <div className="construccion-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
          </div>
          
          <h1>Página en Construcción</h1>
          <p>Estamos trabajando en esta sección. Pronto estará disponible.</p>
          
          <Link to="/" className="volver-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Volver al Inicio
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EnConstruccion;
