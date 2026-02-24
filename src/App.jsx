// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/landing/Home';
import Nosotros from './pages/landing/Nosotros';
import Noticias from './pages/landing/Noticias';
import Contacto from './pages/landing/Contacto';
import EnConstruccion from './pages/landing/EnConstruccion';
import { StudentLayout } from "./components/layout/StudentLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProjects from "./pages/student/StudentProjects";
import StudentNews from "./pages/student/StudentNews";
// import StudentProfile from "./pages/student/StudentProfile";
import './App.css';

/* ─── Área de estudiante (SPA interna) ──────────────────────────── */
// Maneja la navegación entre secciones sin cambiar de ruta URL.
// El USER_ID viene del login — por ahora usamos el de prueba (Juan = 7)
const USER_ID = 1;

function StudentArea() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("dashboard");

  const handleLogout = () => {
    // Aquí limpiarías el token/sesión cuando implementes auth
    navigate("/");
  };

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <StudentDashboard userId={USER_ID} />;
      case "projects":
        return <StudentProjects />;
      case "news":
        return <StudentNews />;
      case "profile":
        // return <StudentProfile userId={USER_ID} />;
        return <PlaceholderView title="Mi Perfil" />;
      default:
        return <StudentDashboard userId={USER_ID} />;
    }
  };

  return (
    <StudentLayout
      user={{ name: "Juan", id: USER_ID }}
      currentView={currentView}
      setView={setCurrentView}
      onLogout={handleLogout}
    >
      {renderView()}
    </StudentLayout>
  );
}

/* ─── Placeholder temporal para vistas no implementadas aún ─────── */
function PlaceholderView({ title }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "80px 24px",
      gap: "16px",
      background: "white",
      borderRadius: "20px",
      border: "1px dashed #e5e5e5",
      color: "#aaa",
      textAlign: "center",
    }}>
      <p style={{ fontSize: 32 }}>🚧</p>
      <p style={{ fontSize: 18, fontWeight: "bold", color: "#555" }}>{title}</p>
      <p style={{ fontSize: 14 }}>Esta sección está en construcción.</p>
    </div>
  );
}

/* ─── App principal ─────────────────────────────────────────────── */
function App() {
  return (
    <Router>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/en-construccion" element={<EnConstruccion />} />

        {/* Área de estudiante — SPA interna */}
        <Route path="/student-dashboard" element={<StudentArea />} />
      </Routes>
    </Router>
  );
}

export default App;