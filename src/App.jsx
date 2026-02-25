// src/App.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/AdminDashboard";
import RecuperarPassword from "./pages/RecuperarPassword";
import Home from "./pages/landing/Home";
import Nosotros from "./pages/landing/Nosotros";
import Noticias from "./pages/landing/Noticias";
import Contacto from "./pages/landing/Contacto";
import EnConstruccion from "./pages/landing/EnConstruccion";
import { StudentLayout } from "./components/layout/StudentLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProjects from "./pages/student/StudentProjects";
import StudentNews from "./pages/student/StudentNews";
import { getUserById } from "./services/api";
import "./App.css";

const USER_ID = 7;

/* ─── Área de estudiante ───────────────────────────────────────── */
function StudentArea() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    // Forzamos el estado inicial de carga
    // setLoadingUser(true);

    getUserById(USER_ID)
      .then((data) => {
        if (isMounted) {
          setUser(data);
          setLoadingUser(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setUserError(err.message);
          setLoadingUser(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = () => navigate("/");

  if (loadingUser) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 12,
          background: "#f9f9f9",
          color: "#888",
          fontSize: 15,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            border: "3px solid #e5e5e5",
            borderTop: "3px solid #0AA387",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        Cargando sesión...
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (userError || !user) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 12,
          background: "#f9f9f9",
          color: "#ef4444",
          fontSize: 15,
        }}
      >
        <p>⚠️ No se pudo cargar el usuario.</p>
        <p style={{ fontSize: 12, color: "#aaa" }}>{userError}</p>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: 8,
            padding: "10px 24px",
            background: "#0AA387",
            color: "white",
            border: "none",
            borderRadius: 12,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <StudentDashboard userId={USER_ID} onNavigate={setCurrentView} />
        );
      case "projects":
        return <StudentProjects />;
      case "news":
        return <StudentNews />;
      case "profile":
        return <PlaceholderView title="Mi Perfil" />;
      default:
        return (
          <StudentDashboard userId={USER_ID} onNavigate={setCurrentView} />
        );
    }
  };

  return (
    <StudentLayout
      user={user}
      currentView={currentView}
      setView={setCurrentView}
      onLogout={handleLogout}
    >
      {renderView()}
    </StudentLayout>
  );
}

function PlaceholderView({ title }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        gap: 16,
        background: "white",
        borderRadius: 20,
        border: "1px dashed #e5e5e5",
        color: "#aaa",
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: 32 }}>🚧</p>
      <p style={{ fontSize: 18, fontWeight: "bold", color: "#555" }}>{title}</p>
      <p style={{ fontSize: 14 }}>Esta sección está en construcción.</p>
    </div>
  );
}

/* ─── App Unificada y Limpia ────────────────────────────────────── */
function App() {
  return (
    <Router>
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/en-construccion" element={<EnConstruccion />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/recuperar" element={<RecuperarPassword />} />

        {/* Privadas */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/student/dashboard" element={<StudentArea />} />
        <Route path="/student-dashboard" element={<StudentArea />} />
      </Routes>
    </Router>
  );
}

export default App;
 