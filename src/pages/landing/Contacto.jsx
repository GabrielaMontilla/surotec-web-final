import React, { useState } from 'react';
import Navbar from '../../components/landing/Navbar';
import Footer from '../../components/landing/Footer';
import './Contacto.css';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    correo: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Aquí puedes agregar la lógica para enviar el formulario
    alert('Mensaje enviado exitosamente');
  };

  const partners = [
    { name: 'Globant', logo: '/partners/globant.png' },
    { name: 'SENA', logo: '/partners/sena.png' },
    { name: 'Universidad EAFIT', logo: '/partners/eafit.png' },
    { name: 'Fomento', logo: '/partners/fomento.png' },
    { name: 'Comfama', logo: '/partners/comfama.png' },
    { name: 'ARGOS', logo: '/partners/argos.png' },
    { name: 'Vision', logo: '/partners/vision-suro.png' }
  ];

  return (
    <div className="contacto-page">
      <Navbar />

      {/* Hero Section con imagen */}
      <section className="contacto-hero">
        <div className="hero-overlay"></div>
      </section>

      {/* Formulario de contacto */}
      <section className="contacto-form-section">
        <div className="form-container">
          <div className="form-header">
            <h2>Contáctanos</h2>
            <p>Déjanos un mensaje para ponernos en contacto pronto</p>
          </div>

          <div className="contact-info">
            <div className="info-item">
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span>info.surotec@gmail.com</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="empresa"
                placeholder="Empresa"
                value={formData.empresa}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="correo"
                placeholder="Correo"
                value={formData.correo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <textarea
                name="mensaje"
                placeholder="Mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Enviar
            </button>
          </form>
        </div>
      </section>

      {/* Aliados Section */}
      <section className="contacto-aliados">
        <div className="aliados-grid-contacto">
          {partners.map((partner, index) => (
            <div key={index} className="partner-logo-contacto">
              <img src={partner.logo} alt={partner.name} />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contacto;
