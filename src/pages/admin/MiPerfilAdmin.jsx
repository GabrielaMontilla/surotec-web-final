import React, { useState } from "react";

// 1. IMPORTAMOS EL ADMINLAYOUT REAL (El mismo que usa tu Dashboard)
import AdminLayout from "../../components/layout/AdminLayout";

import ProfileCard from "../../components/profile/profileCard/ProfileCard";
import ProfileMenu from "../../components/profile/profileMenu/ProfileMenu";
import ProfileForm from "../../components/profile/profileForm/ProfileForm";
import ProfileSecurity from "../../components/profile/profileSecurity/ProfileSecurity";
import "./MiPerfilAdmin.css";

function MiPerfilAdmin() {
  const [activeTab, setActiveTab] = useState("personal");

  const adminUser = {
    nombre: "Admin User",
    email: "admin@test.com",
    avatar: "https://i.pravatar.cc/150?img=12",
  };

  return (
    // 2. ENVOLVEMOS TODO CON EL ADMINLAYOUT EN LUGAR DEL PROFILELAYOUT
    <AdminLayout>
      {/* Título y subtítulo de la página */}
      <div className="profile-header">
        <h1>Mi Perfil</h1>
        <p>Gestiona tu información personal y configuraciones de cuenta.</p>
      </div>

      <div className="admin-profile-grid">
        {/* Columna Izquierda */}
        <div className="profile-left-column">
          <ProfileCard user={adminUser} role="Administrador Global" />
          <ProfileMenu activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Columna Derecha */}
        <div className="profile-right-column">
          {activeTab === "personal" && <ProfileForm user={adminUser} />}
          {activeTab === "seguridad" && <ProfileSecurity />}
          {activeTab === "notificaciones" && (
            <div className="notifications-placeholder">
              <h3>Notificaciones</h3>
              <p>Configuración de alertas y correos (En construcción).</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default MiPerfilAdmin;
