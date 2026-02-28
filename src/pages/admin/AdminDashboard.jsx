import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import StatCard from "../../components/ui/StatCard";
import QuickAccessButton from "../../components/ui/QuickAccessButton";
import RecentUserItem from "../../components/ui/RecentUserItem";
import { apiClient, endpoints } from "../../services/api"; // <-- Importamos tu API
import {
  Users,
  GraduationCap,
  BookOpen,
  Briefcase,
  HeartHandshake,
  UserPlus,
  Upload,
  Heart,
  Loader2
} from "lucide-react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [data, setData] = useState({
    totalUsers: 0,
    activeStudents: 0,
    totalProjects: 0,
    recentUsers: [],
    loading: true
  });

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        // Ejecutamos las peticiones en paralelo para mayor velocidad
        const [usersRes, projectsRes] = await Promise.all([
          apiClient.get(endpoints.users.getAll),
          apiClient.get(endpoints.projects.getAll)
        ]);

        const allUsers = usersRes.data || [];
        const allProjects = projectsRes.data || [];

        // Filtramos estudiantes activos basándonos en tu ENUM del SQL
        const activeStudentsCount = allUsers.filter(u => u.status === 'ACTIVE').length;

        setData({
          totalUsers: allUsers.length,
          activeStudents: activeStudentsCount,
          totalProjects: allProjects.length,
          // Tomamos los últimos 4 usuarios registrados
          recentUsers: allUsers.slice(-4).reverse(),
          loading: false
        });
      } catch (error) {
        console.error("Error cargando estadísticas:", error);
        setData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchAdminStats();
  }, []);

  if (data.loading) {
    return (
      <AdminLayout>
        <div className="loading-container">
          <Loader2 className="spinner" />
          <p>Cargando panel administrativo...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-dashboard-container">
        <div className="dashboard-header">
          <h1>Dashboard Administrativo</h1>
          <p>Resumen real de la plataforma Ikuna.</p>
        </div>

        {/* 1. ESTADÍSTICAS DINÁMICAS */}
        <div className="stats-grid">
          <StatCard
            title="Total Usuarios"
            value={data.totalUsers}
            icon={Users}
            trend="+1"
            trendType="positive"
          />
          <StatCard
            title="Estudiantes Activos"
            value={data.activeStudents}
            icon={GraduationCap}
            trend="Estable"
            trendType="neutral"
          />
          <StatCard
            title="Proyectos"
            value={data.totalProjects}
            icon={Briefcase}
            trend="+18%"
            trendType="positive"
          />
          <StatCard
            title="Donaciones"
            value="$0" // Pendiente vincular endpoint donations
            icon={HeartHandshake}
            trend="0%"
            trendType="neutral"
          />
        </div>

        <div className="dashboard-main-grid">
          <div className="dashboard-widget-card dashboard-left-col">
            <h3 className="widget-title">Actividad Reciente</h3>
            <div className="chart-placeholder">
              {/* Aquí puedes integrar Recharts más adelante */}
              Gráfico sincronizado con {data.totalUsers} usuarios.
            </div>
          </div>

          <div className="dashboard-right-col">
            {/* Accesos Rápidos */}
            <div className="dashboard-widget-card">
              <h3 className="widget-title">Accesos Rápidos</h3>
              <div className="quick-access-grid">
                <QuickAccessButton title="Nuevo Usuario" icon={UserPlus} iconColor="#3b82f6" onClick={() => alert("Abrir formulario usuario")} />
                <QuickAccessButton title="Subir Proyecto" icon={Upload} iconColor="#d946ef" onClick={() => alert("Abrir formulario proyecto")} />
                <QuickAccessButton title="Donación" icon={Heart} iconColor="#ec4899" onClick={() => alert("Registrar donación")} />
              </div>
            </div>

            {/* Usuarios Recientes de la Base de Datos */}
            <div className="dashboard-widget-card">
              <h3 className="widget-title">Usuarios Recientes</h3>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {data.recentUsers.map((user, index) => (
                  <RecentUserItem
                    key={user.id}
                    name={`${user.first_name} ${user.last_name}`}
                    email={user.email}
                    time="Recién registrado"
                    colorClass={index % 2 === 0 ? "avatar-blue" : "avatar-purple"}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;