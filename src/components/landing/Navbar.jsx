import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          <img src="/logo-2.png" alt="SUROTEC" />
        </NavLink>
        
        <ul className="navbar-menu">
          <li>
            <NavLink to="/" end>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/nosotros">
              Quiénes somos
            </NavLink>
          </li>
          <li>
            <NavLink to="/noticias">
              Noticias
            </NavLink>
          </li>
          <li>
            <NavLink to="/contacto">
              Contacto
            </NavLink>
          </li>
        </ul>

        <NavLink to="/login" className="navbar-btn">
          <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
            <polyline points="10 17 15 12 10 7"/>
            <line x1="15" y1="12" x2="3" y2="12"/>
          </svg>
          Iniciar sesión
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
