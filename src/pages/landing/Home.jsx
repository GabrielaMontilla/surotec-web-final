import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/landing/Navbar';
import Footer from '../../components/landing/Footer';
import './Home.css';

const Home = () => {
  const newsItems = [
    {
      id: 1,
      date: '10/06/2025',
      title: 'Conversatorio en la Universidad Eafit con ...',
      image: '/noticias-1.png'
    },
    {
      id: 2,
      date: '17/08/2025',
      title: 'En Surotec promovemos las marcas locales',
      image: '/noticias-2.png'
    },
    {
      id: 3,
      date: '16/08/2024',
      title: 'Inicio de clases en La Pintada',
      image: '/noticias-3.png'
    }
  ];

  const partners = [
    { name: 'Globant', logo: '/partners/globant.png' },
    { name: 'CESDE', logo: '/partners/cesde.png' },
    { name: 'Universidad EAFIT', logo: '/partners/eafit.png' },
    { name: 'Fomento', logo: '/partners/fomento.png' },
    { name: 'Comfama', logo: '/partners/comfama.png' },
    { name: 'ARGOS', logo: '/partners/argos.png' },
    { name: 'Vision', logo: '/partners/vision-suro.png' }
  ];

  return (
    <div className="home">
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Desde el suroeste antioqueño creamos un ecosistema tecnológico que florece en el campo.</h1>
        </div>
      </section>

      {/* Propósito Section */}
      <section className="proposito">
        <h2>Nuestro propósito</h2>
        <p className="proposito-subtitle">
          Creemos en el poder de la tecnología, la educación y la cultura para transformar vidas. Soñamos con futuro donde los jóvenes, formados en las nuevas herramientas digitales, alcancen su máximo potencial, contribuyan al desarrollo de sus comunidades y mejoren su calidad de vida, sin que ni años de identidad cultural
        </p>

        <div className="proposito-cards">
          <div className="proposito-card">
            <h3>Educación</h3>
            <p>Tailor Armin's Landing Page UI Kit to your unique style and brand with customizable components, in no time!</p>
            <Link to="/en-construccion" className="card-link">Learn More →</Link>
          </div>

          <div className="proposito-card">
            <h3>Empleabilidad</h3>
            <p>Tailor Armin's Landing Page UI Kit to your unique style and brand with customizable components, in no time!</p>
            <Link to="/en-construccion" className="card-link">Learn More →</Link>
          </div>

          <div className="proposito-card">
            <h3>Comunidad</h3>
            <p>Tailor Armin's Landing Page UI Kit to your unique style and brand with customizable components, in no time!</p>
            <Link to="/en-construccion" className="card-link">Learn More →</Link>
          </div>
        </div>
      </section>

      {/* Noticias Section */}
      <section className="noticias-section">
        <h2>Noticias</h2>
        <p className="noticias-subtitle">Conectamos la innovación con las historias del suroeste. Descubre las noticias, eventos y proyectos que están transformando nuestra región.</p>

        <div className="noticias-grid">
          {newsItems.map((news) => (
            <div key={news.id} className="news-card">
              <div className="news-image">
                <img src={news.image} alt={news.title} />
              </div>
              <div className="news-content">
                <p className="news-date">{news.date}</p>
                <h3 className="news-title">{news.title}</h3>
                <Link to="/en-construccion" className="news-btn">Leer el artículo</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Aliados Section */}
      <section className="aliados">
        <h2>Aliados</h2>
        <div className="aliados-grid">
          {partners.map((partner, index) => (
            <div key={index} className="partner-logo">
              <img src={partner.logo} alt={partner.name} />
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-container">
          <div className="newsletter-content">
            <div className="newsletter-logo">
              <img src="/logo-2.png" alt="SUROTEC" />
              <h3>Transformamos el mundo por medio de la tecnología, la educación y la cultura</h3>
            </div>

            <div className="newsletter-form-box">
              <h2>Escríbenos!</h2>
              
              <form className="newsletter-form">
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
                    <textarea placeholder="Mensaje" rows="3" required></textarea>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-checkbox">
                    <input type="checkbox" id="privacy-home" required />
                    <label htmlFor="privacy-home">
                      Política de privacidad *
                      <br />
                      <small>Al enviar mis datos acepto la <a href="#">política de tratamiento de datos</a></small>
                    </label>
                  </div>
                </div>

                <button type="submit" className="newsletter-submit-btn">Enviar</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
