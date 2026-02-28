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
import { motion, AnimatePresence } from "framer-motion"; // Ajustado para compatibilidad
import { getUserById } from "../../services/api";

export function StudentLayout({ children, onLogout, setView, currentView }) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userData, setUserData] = useState(null);

  // 1. OBTENCIÓN DINÁMICA DEL ID DESDE EL LOGIN
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = storedUser.idUser || storedUser.id; 

  useEffect(() => {
    if (!userId) return;

    // Llamada al endpoint real: /users/{idUser}
    getUserById(userId)
      .then((data) => {
        console.log("🚀 DATOS RECIBIDOS DEL BACKEND:", data);
        setUserData(data);
      })
      .catch((err) => {
        console.error("❌ Error al cargar datos del Layout:", err);
        setUserData(null);
      });
  }, [userId]);

  // 2. FORMATEO DINÁMICO DEL NOMBRE (Usando tus claves: firstName, lastName)
  const displayName = userData?.firstName 
    ? `${userData.firstName} ${userData.lastName || ""}`.trim() 
    : "Cargando...";

  // 3. DEFINICIÓN DEL ROL (Basado en el rango de IDs de tu base de datos)
  const displayRole = (userId >= 1 && userId <= 6) ? "Administrador" : "Estudiante";

  const menuItems = [
    { id: "dashboard", label: "Mi Dashboard", icon: LayoutDashboard },
    { id: "projects", label: "Mis Proyectos", icon: BookOpen },
    { id: "news", label: "Noticias", icon: Newspaper },
    { id: "profile", label: "Mi Perfil", icon: User },
  ];

  const notifications = [
    { id: 1, title: "Nuevo Proyecto Asignado", time: "Hace 5 min", type: "info", icon: BookOpen },
    { id: 2, title: "Tarea Calificada", time: "Hace 2 horas", type: "success", icon: CheckCircle2 },
  ];

  const handleNavClick = (viewId) => {
    setView(viewId);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setIsMobileMenuOpen(false);
    setIsLoggingOut(true);
    // Limpieza de seguridad al salir
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setTimeout(() => onLogout(), 2000);
  };

  return (
    <div className="layout">
      {/* Pantalla de cierre de sesión */}
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
            >
              <div className="logout-icon"><LogOut size={28} /></div>
              <p className="logout-title">Cerrando sesión...</p>
              <p className="logout-subtitle">Hasta pronto, {userData?.firstName || "estudiante"} 👋</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="navbar">
        <div className="navbar-inner">
          <div className="navbar-left">
            <div className="navbar-logo" onClick={() => setView("dashboard")}>
              <span className="navbar-logo-text">
                <img src="/logo-2.png" alt="SUROTEC" style={{ height: '32px' }} />
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
              <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="notif-btn">
                <Bell size={20} />
                <span className="notif-badge" />
              </button>
            </div>

            <div className="navbar-divider" />

            {/* Info del usuario dinámico */}
            <div className="navbar-user">
              <div className="navbar-user-info">
                <p className="navbar-user-name">{displayName}</p>
                <p className="navbar-user-role">{displayRole}</p>
              </div>
              <button className="navbar-avatar" onClick={() => setView("profile")}>
                {userData?.firstName ? (
                  <div className="avatar-placeholder">{userData.firstName.charAt(0)}</div>
                ) : (
                  <img src="https://images.unsplash.com/photo-1729824186568-be656d0eecf9?w=100" alt="Avatar" />
                )}
              </button>
              <button className="navbar-logout" onClick={handleLogout}>
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="layout-main">
        {children}
      </main>

      <footer className="layout-footer">
        <p className="layout-footer-text">© 2026 Surotec. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}