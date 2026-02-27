import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  };

  // Fuerza el cierre del menú cada vez que cambia la ruta (clave para mobile)
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      const willOpen = !prev;
      document.body.style.overflow = willOpen ? 'hidden' : '';
      return willOpen;
    });
  };

  // Cerrar al pasar de mobile a desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const links = [
    { to: "/", label: "Inicio", end: true },
    { to: "/nosotros", label: "Quiénes somos" },
    { to: "/noticias", label: "Noticias" },
    { to: "/contacto", label: "Contacto" },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">

          <NavLink to="/" className="navbar-logo" onClick={closeMenu}>
            <img src="/logo-2.png" alt="SUROTEC" />
          </NavLink>

          <ul className={`navbar-menu${menuOpen ? ' open' : ''}`}>
            {links.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  onClick={closeMenu}  // ← cierra el menú al click
                >
                  {label}
                </NavLink>
              </li>
            ))}

            <li className="navbar-menu-cta">
              <NavLink
                to="/login"
                className="navbar-btn"
                onClick={closeMenu}
              >
                <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                  <polyline points="10 17 15 12 10 7"/>
                  <line x1="15" y1="12" x2="3" y2="12"/>
                </svg>
                Iniciar sesión
              </NavLink>
            </li>
          </ul>

          <NavLink to="/login" className="navbar-btn navbar-btn-desktop">
            <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10 17 15 12 10 7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
            Iniciar sesión
          </NavLink>

          <button
            className={`navbar-hamburger${menuOpen ? ' open' : ''}`}
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

        </div>
      </nav>

      <div
        className={`navbar-overlay${menuOpen ? ' open' : ''}`}
        onClick={closeMenu}
      />
    </>
  );
};

export default Navbar;