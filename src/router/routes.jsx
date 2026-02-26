import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Users from "../pages/admin/Users";
import Students from "../pages/admin/Students";
import Cohorts from "../pages/admin/Cohorts";
import Employees from "../pages/admin/Employees";
import Roles from "../pages/admin/Roles";
import Projects from "../pages/admin/Projects";
import News from "../pages/admin/News";
import Donations from "../pages/admin/Donations";
import StudentDashboard from "../pages/student/StudentDashboard";
import StudentProfile from "../pages/student/StudentProfile";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/*default route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* authentication */}
        <Route path="/login" element={<Login />} />

        {/* administrator routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/students" element={<Students />} />
        <Route path="/admin/cohorts" element={<Cohorts />} />
        <Route path="/admin/employees" element={<Employees />} />
        <Route path="/admin/roles" element={<Roles />} />
        <Route path="/admin/projects" element={<Projects />} />
        <Route path="/admin/news" element={<News />} />
        <Route path="/admin/donations" element={<Donations />} />

        {/* student routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/profile" element={<StudentProfile />} />

        {/* not found route */}
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
