import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Briefcase,
  ShieldCheck,
  FolderOpen,
  Newspaper,
  HeartHandshake,
  User,
  LogOut,
} from "lucide-react";

const Sidebar = ({ isCollapsed }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuItems = [
    { path: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/users", icon: Users, label: "Usuarios" },
    { path: "/admin/students", icon: GraduationCap, label: "Estudiantes" },
    { path: "/admin/cohorts", icon: BookOpen, label: "Cohortes" },
    { path: "/admin/employees", icon: Briefcase, label: "Empleados" },
    { path: "/admin/roles", icon: ShieldCheck, label: "Roles" },
    { path: "/admin/projects", icon: FolderOpen, label: "Proyectos" },
    { path: "/admin/news", icon: Newspaper, label: "Noticias" },
    { path: "/admin/donations", icon: HeartHandshake, label: "Donaciones" },
    { path: "/admin/perfil", icon: User, label: "Mi Perfil" }, // Ajusta esta ruta si es diferente
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-logo">
        <div className="logo-icon-box">
          <GraduationCap size={24} color="#000" strokeWidth={2.5} />
        </div>
        {!isCollapsed && <span className="logo-text">Surotec</span>}
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
            title={isCollapsed ? item.label : ""} // Muestra tooltip cuando está colapsado
          >
            <item.icon size={20} className="nav-icon" />
            {!isCollapsed && <span className="nav-label">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          {!isCollapsed && <span>Cerrar Sesión</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
