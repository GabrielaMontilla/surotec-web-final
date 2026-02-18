import React from 'react';
import Navbar from '../../components/landing/Navbar';
import Footer from '../../components/landing/Footer';
import './Nosotros.css';

const Nosotros = () => {
  const contextItems = [
    {
      number: '01',
      title: 'Migración y educación',
      subtitle: 'Impacto Empresarial',
      description: 'Los jóvenes están migrando a las ciudades buscando oportunidades educativas, particularmente en tecnología.'
    },
    {
      number: '02',
      title: 'Desfase Educativo',
      subtitle: 'Desfase Educativo',
      description: 'El enfoque educativo en el campo se centra principalmente en la agricultura, lo cual no está alineado con los intereses de las nuevas generaciones.'
    },
    {
      number: '03',
      title: 'Impacto Empresarial',
      subtitle: 'Impacto Empresarial',
      description: 'Los jóvenes están migrando a las ciudades buscando oportunidades educativas, particularmente en tecnología.'
    },
    {
      number: '04',
      title: 'Pobreza Urbana',
      subtitle: 'Pobreza Urbana',
      description: 'La limitada oferta de empleo en las ciudades los obliga a dedicarse a actividades mal remuneradas, lo que conlleva a mayores niveles de pobreza.'
    }
  ];

  return (
    <div className="nosotros">
      <Navbar />

      {/* Hero Section */}
      <section className="nosotros-hero">
        <div className="nosotros-hero-content">
          <h1>Nosotros</h1>
        </div>
      </section>

      {/* Intro Section */}
      <section className="nosotros-intro">
        <div className="intro-box">
          <p>
            En Surotec trabajamos para educar a los jóvenes de la ruralidad en nuevas tecnologías para que, desde sus lugares de origen, puedan acceder a empleos formales, bien sea a nivel local e internacional de forma remota. Fomentamos en ellos el conocimiento en inglés y las dinámicas culturales globales. Todo esto apalancado a un proyecto de vida con propósito, que impacte positivamente en su vida, su su familia, su comunidad y su región.
          </p>
        </div>
      </section>

      {/* Historia Section */}
      <section className="historia">
        <h2>Nuestra Historia</h2>
        
        <div className="historia-content">
          <div className="historia-image">
            <div className="image-circle">
              <img src="/rio-cauca.png" alt="Fundadora" />
              <div className="circle-decoration">FUNDADORA SUROTEC</div>
            </div>
          </div>

          <div className="historia-text">
            <h3>El inicio</h3>
            <p>
              Nuestra historia tiene sus raíces en el Suroeste, donde Elizabeth, sembró una visión. Ella imaginó el poder de la educación tecnológica en el campo como la llave para revitalizar la economía local y fortalecer nuestra cultura. Así, se propuso construir sinergia en el territorio entre jóvenes con vocación por la tecnología y los emprendimientos locales e incluso grandes teniendo como objetivo la colaboración, el comprenso social, el aprendizaje centrado y la conexión profunda con el territorio.
            </p>
          </div>
        </div>
      </section>

      {/* Contexto Section */}
      <section className="contexto">
        <h2>Contexto de la región</h2>
        
        <div className="contexto-illustration">
          <img src="/region.png" alt="Ilustración de la región" />
        </div>

        <div className="contexto-grid">
          {contextItems.map((item) => (
            <div key={item.number} className="contexto-card">
              <div className="contexto-number">{item.number}</div>
              <h3 className="contexto-title">{item.title}</h3>
              <h4 className="contexto-subtitle">{item.subtitle}</h4>
              <p className="contexto-description">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Nosotros;
