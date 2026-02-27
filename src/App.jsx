// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
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
import Users from './pages/admin/Users';
import Students from './pages/admin/Students';
import Employees from './pages/admin/Employees';
// Nota: Aquí NO importamos MiPerfilAdmin porque eso está en la rama de Lorena

// --- STUDENT (TRABAJO DE GABRIELA) ---
import StudentArea from "./pages/student/StudentArea";

import "./App.css";


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

      {/* Privadas - STUDENT */}
      <Route path="/student/dashboard" element={<StudentArea />} />
      <Route path="/student-dashboard" element={<StudentArea />} />
    </Routes>
  );
}

export default App;