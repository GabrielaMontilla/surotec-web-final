// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import MiPerfilAdmin from "./pages/admin/MiPerfilAdmin";

// --- PÁGINAS PÚBLICAS ---
import Home from "./pages/landing/Home";
import Nosotros from "./pages/landing/Nosotros";
import Noticias from "./pages/landing/Noticias";
import Contacto from "./pages/landing/Contacto";
import EnConstruccion from "./pages/landing/EnConstruccion";

// --- AUTH (TU TRABAJO) ---
import Login from "./pages/Login";
import RecuperarPassword from "./pages/RecuperarPassword";

// --- ADMIN (TU TRABAJO) ---
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import Students from "./pages/admin/Students";
import Employees from "./pages/admin/Employees";

// Nota: Aquí NO importamos MiPerfilAdmin porque eso está en la rama de Lorena

// --- STUDENT (TRABAJO DE GABRIELA) ---
import { StudentLayout } from "./components/layout/StudentLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProjects from "./pages/student/StudentProjects";
import StudentNews from "./pages/student/StudentNews";
import MiPerfilStudents from "./pages/student/MiPerfilStudents";
import { getUserById } from "./services/api";

import "./App.css";

const USER_ID = 7;

/* ─── Área de estudiante de Gabriela ──────────────── */
function StudentArea() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    let isMounted = true;
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

  if (loadingUser)
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        Cargando sesión...
      </div>
    );
  if (userError || !user)
    return (
      <div style={{ color: "red", textAlign: "center", marginTop: "50px" }}>
        Error: {userError}
      </div>
    );

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
        return <MiPerfilStudents /> // Dejamos el placeholder de Gabriela para que Lorena lo cambie luego
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

/* ─── App Unificada ────────────────────────────────────── */
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/noticias" element={<Noticias />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/en-construccion" element={<EnConstruccion />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/recuperar" element={<RecuperarPassword />} />

      {/* Privadas - ADMIN */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<Users />} />
      <Route path="/admin/students" element={<Students />} />
      <Route path="/admin/employees" element={<Employees />} />
      <Route path="/admin/perfil" element={<MiPerfilAdmin />} />

      {/* Privadas - STUDENT */}
      <Route path="/student/dashboard" element={<StudentArea />} />
      <Route path="/student-dashboard" element={<StudentArea />} />
    </Routes>
  );
}

export default App;
