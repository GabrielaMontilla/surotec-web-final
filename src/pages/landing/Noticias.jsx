import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/landing/Navbar';
import Footer from '../../components/landing/Footer';
import './Noticias.css';

const Noticias = () => {
  const newsItems = [
    {
      id: 1,
      date: '10/06/2025',
      title: 'Conversatorio en la Universidad Eafit con ...',
      image: '/noticias-1.png'
    },
    {
      id: 2,
      date: '10/06/2025',
      title: 'Conversatorio en la Universidad Eafit con ...',
      image: '/noticias-2.png'
    },
    {
      id: 3,
      date: '10/06/2025',
      title: 'Conversatorio en la Universidad Eafit con ...',
      image: '/noticias-3.png'
    },
    {
      id: 8,
      date: '10/06/2025',
      title: 'Conversatorio en la Universidad Eafit con ...',
      image: '/noticias-1.png'
    },
  ];

  return (
    <div className="noticias-page">
      <Navbar />

      {/* Hero Section */}
      <section className="noticias-hero">
        <h1>Noticias</h1>
      </section>

      {/* News Grid */}
      <section className="noticias-content">
        <div className="noticias-grid-page">
          {newsItems.slice(0, 4).map((news) => (
            <div key={news.id} className="news-card-page">
              <div className="news-image-page">
                <img src={news.image} alt={news.title} />
              </div>
              <div className="news-content-page">
                <p className="news-date-page">{news.date}</p>
                <h3 className="news-title-page">{news.title}</h3>
                <Link to="/en-construccion" className="news-btn-page">Leer el artículo</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="noticias-cta">
        <div className="cta-content">
          <div className="cta-image">
            <img src="/region.png" alt="Ilustración" />
          </div>
          <div className="cta-form-box">
            <h2>Camina con nosotros hacia nuevas ideas, proyectos y oportunidades</h2>
            <p className="cta-subtitle">Déjanos tus datos y recibe noticias, convocatorias y oportunidades!</p>
            
            <form className="cta-form">
              <div className="form-row">
                <div className="form-field">
                  <label>Nombre *</label>
                  <input type="text" placeholder="Nombre" required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>Correo *</label>
                  <input type="email" placeholder="Correo" required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>Teléfono</label>
                  <input type="tel" placeholder="Teléfono" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>Fecha de Nacimiento *</label>
                  <input type="date" placeholder="Fecha de Nacimiento" required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>Mensaje *</label>
                  <textarea placeholder="Mensaje" rows="4" required></textarea>
                </div>
              </div>

              <div className="form-row">
                <div className="form-checkbox">
                  <input type="checkbox" id="privacy" required />
                  <label htmlFor="privacy">
                    Acepto la política de privacidad *
                    <br />
                    <small>Al enviar mis datos acepto la <a href="#">política de tratamiento de datos</a></small>
                  </label>
                </div>
              </div>

              <button type="submit" className="cta-submit-btn">Enviar</button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Noticias;
