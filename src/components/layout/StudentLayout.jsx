// src/components/layout/StudentLayout.jsx
import React, { useState, useEffect } from "react";
import "./StudentLayout.css";
import {
  LayoutDashboard,
  BookOpen,
  Newspaper,
  User,
  LogOut,
  Bell,
  Menu,
  GraduationCap,
  X,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getUserById } from "../../services/api";

export function StudentLayout({ children, user, onLogout, setView, currentView }) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen]       = useState(false);
  const [isLoggingOut, setIsLoggingOut]               = useState(false);
  const [userData, setUserData]                       = useState(null);

  /* Trae el nombre real del usuario desde la BD */
  useEffect(() => {
    if (!user?.id) return;
    getUserById(user.id)
      .then((data) => setUserData(data))
      .catch(() => setUserData(null));
  }, [user?.id]);

  const displayName = userData
    ? `${userData.firstName ?? userData.first_name ?? ""} ${userData.lastName ?? userData.last_name ?? ""}`.trim()
    : user?.name ?? "Estudiante";

  const menuItems = [
    { id: "dashboard", label: "Mi Dashboard",  icon: LayoutDashboard },
    { id: "projects",  label: "Mis Proyectos", icon: BookOpen },
    { id: "news",      label: "Noticias",       icon: Newspaper },
    { id: "profile",   label: "Mi Perfil",      icon: User },
  ];

  const notifications = [
    { id: 1, title: "Nuevo Proyecto Asignado",          time: "Hace 5 min",   type: "info",    icon: BookOpen },
    { id: 2, title: "Tarea Calificada: React Avanzado", time: "Hace 2 horas", type: "success", icon: CheckCircle2 },
    { id: 3, title: "Recordatorio: Sesión de Mentoria", time: "Hoy, 4:00 PM", type: "warning", icon: Clock },
  ];

  const handleNavClick = (viewId) => {
    setView(viewId);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setIsMobileMenuOpen(false);
    setIsLoggingOut(true);
    setTimeout(() => onLogout(), 2000);
  };

  return (
    <div className="layout">

      {/* ── PANTALLA CERRANDO SESIÓN ── */}
      <AnimatePresence>
        {isLoggingOut && (
          <motion.div
            className="logout-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="logout-box"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="logout-icon"><LogOut size={28} /></div>
              <p className="logout-title">Cerrando sesión...</p>
              <p className="logout-subtitle">Hasta pronto, {displayName.split(" ")[0]} 👋</p>
              <div className="logout-spinner">
                <div className="logout-spinner-bar" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── NAVBAR ── */}
      <header className="navbar">
        <div className="navbar-inner">

          <div className="navbar-left">
            <div className="navbar-logo" onClick={() => setView("dashboard")}>
              <span className="navbar-logo-text">
                <img src="/logo-2.png" alt="SUROTEC" />
              </span>
            </div>

            <nav className="navbar-nav">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`navbar-nav-btn ${currentView === item.id ? "navbar-nav-btn--active" : ""}`}
                >
                  <item.icon size={16} />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="navbar-right">

            {/* Notificaciones */}
            <div className="notif-wrapper">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`notif-btn ${isNotificationsOpen ? "notif-btn--active" : ""}`}
              >
                <Bell size={20} />
                <span className="notif-badge" />
              </button>

              <AnimatePresence>
                {isNotificationsOpen && (
                  <>
                    <div className="notif-backdrop" onClick={() => setIsNotificationsOpen(false)} />
                    <motion.div
                      className="notif-dropdown"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="notif-dropdown-header">
                        <h4 className="notif-dropdown-title">Notificaciones</h4>
                        <span className="notif-count-badge">3 Nuevas</span>
                      </div>
                      <div className="notif-list">
                        {notifications.map((n) => (
                          <div key={n.id} className="notif-item">
                            <div className={`notif-item-icon notif-item-icon--${n.type}`}>
                              <n.icon size={18} />
                            </div>
                            <div className="notif-item-body">
                              <p className="notif-item-title">{n.title}</p>
                              <p className="notif-item-time"><Clock size={11} /> {n.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button className="notif-see-all">Ver todas las notificaciones</button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <div className="navbar-divider" />

            {/* Usuario con nombre real */}
            <div className="navbar-user">
              <div className="navbar-user-info">
                <p className="navbar-user-name">{displayName}</p>
                <p className="navbar-user-role">ESTUDIANTE</p>
              </div>
              <button className="navbar-avatar" onClick={() => setView("profile")}>
                <img
                  src="https://images.unsplash.com/photo-1729824186568-be656d0eecf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200"
                  alt="Avatar"
                />
              </button>
              <button className="navbar-logout" onClick={handleLogout} title="Cerrar Sesión">
                <LogOut size={18} />
              </button>
            </div>

            <button
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── MENÚ MÓVIL ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.25 }}
          >
            <div className="mobile-menu-header">
              <div className="navbar-logo">
                <div className="navbar-logo-icon"><GraduationCap size={22} /></div>
                <span className="mobile-menu-logo-text">Surotec</span>
              </div>
              <button className="mobile-menu-close" onClick={() => setIsMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <nav className="mobile-menu-nav">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`mobile-menu-nav-btn ${currentView === item.id ? "mobile-menu-nav-btn--active" : ""}`}
                >
                  <item.icon size={22} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="mobile-menu-footer">
              <div className="mobile-menu-user">
                <div className="mobile-menu-avatar">
                  <img
                    src="https://images.unsplash.com/photo-1729824186568-be656d0eecf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200"
                    alt="Avatar"
                  />
                </div>
                <div>
                  <p className="mobile-menu-user-name">{displayName}</p>
                  <p className="mobile-menu-user-id">
                    @{userData?.username ?? "estudiante"}
                  </p>
                </div>
              </div>
              <button className="mobile-menu-logout" onClick={handleLogout}>
                <LogOut size={22} />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CONTENIDO ── */}
      <main className="layout-main">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="layout-footer">
        <p className="layout-footer-text">© 2026 Surotec. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}