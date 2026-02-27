import { Routes, Route } from "react-router-dom";

// --- PÁGINAS PÚBLICAS ---
import Home from "../pages/landing/Home";
import Nosotros from "../pages/landing/Nosotros";
import Noticias from "../pages/landing/Noticias";
import Contacto from "../pages/landing/Contacto";
import EnConstruccion from "../pages/landing/EnConstruccion";

// --- AUTH ---
import Login from "../pages/Login";
import RecuperarPassword from "../pages/RecuperarPassword";

// --- ADMIN ---
import AdminDashboard from "../pages/admin/AdminDashboard";
import Users from "../pages/admin/Users";
import Students from "../pages/admin/Students";
import Employees from "../pages/admin/Employees";

// --- STUDENT ---
import StudentArea from "../pages/student/StudentArea";

export function AppRoutes() {
  return (
    <Routes>
      {/* RUTAS PÚBLICAS - LANDING */}
      <Route path="/" element={<Home />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/noticias" element={<Noticias />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/en-construccion" element={<EnConstruccion />} />

      {/* RUTAS DE AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/recuperar" element={<RecuperarPassword />} />

      {/* RUTAS PRIVADAS - ADMIN */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<Users />} />
      <Route path="/admin/students" element={<Students />} />
      <Route path="/admin/employees" element={<Employees />} />

      {/* RUTAS PRIVADAS - STUDENT */}
      <Route path="/student/dashboard" element={<StudentArea />} />
      <Route path="/student-dashboard" element={<StudentArea />} />

      {/* RUTA 404 */}
      <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
    </Routes>
  );
}
