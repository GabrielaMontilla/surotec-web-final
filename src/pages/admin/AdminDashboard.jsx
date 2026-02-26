import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import StatCard from "../../components/ui/StatCard";
import QuickAccessButton from "../../components/ui/QuickAccessButton"; // <-- Importamos el botón
import RecentUserItem from "../../components/ui/RecentUserItem";
// Importamos los íconos (agregamos los nuevos para los botones)
import {
  Users,
  GraduationCap,
  BookOpen,
  Briefcase,
  HeartHandshake,
  UserPlus,
  Upload,
  Heart,
} from "lucide-react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="admin-dashboard-container">
        {/* HEADER */}
        <div className="dashboard-header">
          <h1>Dashboard Administrativo</h1>
          <p>Resumen general del estado de la plataforma.</p>
        </div>

        {/* 1. ESTADÍSTICAS */}
        <div className="stats-grid">
          <StatCard
            title="Total Usuarios"
            value="1,284"
            icon={Users}
            trend="+12.5%"
            trendType="positive"
          />
          <StatCard
            title="Estudiantes Activos"
            value="842"
            icon={GraduationCap}
            trend="+3.2%"
            trendType="positive"
          />
          <StatCard
            title="Cohortes"
            value="24"
            icon={BookOpen}
            trend="0%"
            trendType="neutral"
          />
          <StatCard
            title="Proyectos"
            value="156"
            icon={Briefcase}
            trend="+18%"
            trendType="positive"
          />
          <StatCard
            title="Donaciones"
            value="$12,450"
            icon={HeartHandshake}
            trend="-2.4%"
            trendType="negative"
          />
        </div>

        {/* 2. CONTENEDOR INFERIOR (2 COLUMNAS) */}
        <div className="dashboard-main-grid">
          {/* COLUMNA IZQUIERDA: Gráfico */}
          <div className="dashboard-widget-card dashboard-left-col">
            <h3 className="widget-title">Actividad de Estudiantes</h3>
            <div className="chart-placeholder">
              [Aquí pondremos el gráfico de Recharts]
            </div>
          </div>

          {/* COLUMNA DERECHA: Accesos Rápidos y Usuarios Recientes */}
          <div className="dashboard-right-col">
            {/* Tarjeta de Accesos Rápidos */}
            <div className="dashboard-widget-card">
              <h3 className="widget-title">Accesos Rápidos</h3>
              <div className="quick-access-grid">
                <QuickAccessButton
                  title="Nuevo Usuario"
                  icon={UserPlus}
                  iconColor="#3b82f6"
                  onClick={() => alert("Modal Nuevo Usuario")}
                />
                <QuickAccessButton
                  title="Nueva Cohorte"
                  icon={BookOpen}
                  iconColor="#10b981"
                  onClick={() => alert("Modal Nueva Cohorte")}
                />
                <QuickAccessButton
                  title="Subir Proyecto"
                  icon={Upload}
                  iconColor="#d946ef"
                  onClick={() => alert("Modal Subir Proyecto")}
                />
                <QuickAccessButton
                  title="Donación"
                  icon={Heart}
                  iconColor="#ec4899"
                  onClick={() => alert("Modal Donación")}
                />
              </div>
            </div>

            {/* Tarjeta de Usuarios Recientes */}
            {/* Tarjeta de Usuarios Recientes */}
            <div className="dashboard-widget-card">
              <h3 className="widget-title">Usuarios Recientes</h3>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <RecentUserItem
                  name="Gabriela Montilla"
                  email="gabriela@example.com"
                  time="Hace 2 horas"
                  colorClass="avatar-blue"
                />
                <RecentUserItem
                  name="Carlos Restrepo"
                  email="carlos.r@test.com"
                  time="Hace 5 horas"
                  colorClass="avatar-green"
                />
                <RecentUserItem
                  name="Laura Gómez"
                  email="laura.g@test.com"
                  time="Hace 1 día"
                  colorClass="avatar-purple"
                />
                <RecentUserItem
                  name="Andrés Felipe"
                  email="andres@test.com"
                  time="Hace 2 días"
                  colorClass="avatar-orange"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
