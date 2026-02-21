// src/router/routes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';

// Landing pages
import Home from '../pages/landing/Home';
import Nosotros from '../pages/landing/Nosotros';
import Noticias from '../pages/landing/Noticias';
import Contacto from '../pages/landing/Contacto';
import EnConstruccion from '../pages/landing/EnConstruccion';

// Auth
// import Login from '../pages/auth/Login';

// Admin pages
// import AdminDashboard from '../pages/admin/AdminDashboard';
import Users from '../pages/admin/Users';
// import Students from '../pages/admin/Students';
// import Cohorts from '../pages/admin/Cohorts';
// import Employees from '../pages/admin/Employees';
// import Roles from '../pages/admin/Roles';
// import Projects from '../pages/admin/Projects';
// import News from '../pages/admin/News';
// import Donations from '../pages/admin/Donations';

// Student pages
// import StudentDashboard from '../pages/student/StudentDashboard';
// import StudentProfile from '../pages/student/StudentProfile';

export default function AppRouter() {
  return (
    <Routes>
      {/* Redirigir la raíz a la landing (o a login si prefieres) */}
      {/* <Route path="/" element={<Navigate to="/" />} /> */}
      
      {/* Landing routes */}
      <Route path="/" element={<Home />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/noticias" element={<Noticias />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/en-construccion" element={<EnConstruccion />} />

      {/* Auth */}
      {/* <Route path="/login" element={<Login />} /> */}

      {/* Admin routes */}
      {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
      <Route path="/admin/users" element={<Users />} />
      {/* <Route path="/admin/students" element={<Students />} />
      <Route path="/admin/cohorts" element={<Cohorts />} />
      <Route path="/admin/employees" element={<Employees />} />
      <Route path="/admin/roles" element={<Roles />} />
      <Route path="/admin/projects" element={<Projects />} />
      <Route path="/admin/news" element={<News />} />
      <Route path="/admin/donations" element={<Donations />} /> */}

      {/* Student routes */}
      {/* <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/profile" element={<StudentProfile />} /> */}

      {/* Ruta 404 - cualquier otra dirección */}
      {/* <Route path="*" element={<h1>404 - Página no encontrada</h1>} /> */}
    </Routes>
  );
}