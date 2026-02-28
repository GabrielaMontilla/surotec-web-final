import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import ProfileCard from "../../components/profile/profileCard/ProfileCard";
import ProfileMenu from "../../components/profile/profileMenu/ProfileMenu";
import ProfileForm from "../../components/profile/profileForm/ProfileForm";
import ProfileSecurity from "../../components/profile/profileSecurity/ProfileSecurity";
import "./MiPerfilAdmin.css";


// 1. IMPORTAMOS TU FUNCIÓN DE LA API
import { getUserById } from "../../services/api";


function MiPerfilAdmin() {
  const [activeTab, setActiveTab] = useState("personal");


  // 2. CREAMOS LOS ESTADOS PARA GUARDAR LA DATA DE LA BD
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // 3. EL USE-EFFECT QUE VA Y BUSCA LA DATA APENAS CARGA LA PANTALLA
  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        // Intentamos sacar el ID del usuario desde el localStorage (como lo dejó el Login)
        // Si no hay nada, por ahora usamos un ID por defecto para pruebas (ej: 1)
        const storedUserStr = localStorage.getItem("user");
        const storedUser = storedUserStr ? JSON.parse(storedUserStr) : null;


        // Ajusta el "1" por el ID real de tu administrador en la Base de Datos si no hay sesión
        const userId = storedUser?.idUser || storedUser?.id || 1;


        // Vamos a la Base de Datos usando tu api.js
        const dbData = await getUserById(userId);


        // Transformamos lo que llegó de la BD al formato que necesitan tus diseños
        setAdminUser({
          idUser: dbData.idUser,
          nombre:
            `${dbData.firstName || ""} ${dbData.lastName || ""}`.trim() ||
            "Administrador",
          email: dbData.email || "Sin correo",
          avatar: "https://i.pravatar.cc/150?img=12", // Dejamos el avatar de prueba por ahora
          cargo: "Administrador Global",
          telefono: "+1 234 567 890", // Lo puedes cambiar si tu BD tiene teléfono
          rawData: dbData, // Guardamos toda la info original por si la necesitas luego
        });
      } catch (err) {
        console.error("Error al cargar el perfil de admin:", err);
        setError("No se pudo cargar la información del servidor.");
      } finally {
        setLoading(false); // Apagamos el estado de carga
      }
    };


    fetchAdminProfile();
  }, []);


  // 4. PANTALLAS DE CARGA O ERROR PARA QUE NO EXPLOTE LA VISTA
  if (loading) {
    return (
      <AdminLayout>
        <div className="profile-header">
          <h1>Cargando Perfil... ⏳</h1>
        </div>
      </AdminLayout>
    );
  }


  if (error || !adminUser) {
    return (
      <AdminLayout>
        <div className="profile-header">
          <h1 style={{ color: "red" }}>Error: {error}</h1>
        </div>
      </AdminLayout>
    );
  }


  // 5. RENDERIZAMOS LA VISTA YA CON LOS DATOS REALES (`adminUser`)
  return (
    <AdminLayout>
      <div className="profile-header">
        <h1>Mi Perfil</h1>
        <p>Gestiona tu información personal y configuraciones de cuenta.</p>
      </div>


      <div className="admin-profile-grid">
        {/* Columna Izquierda */}
        <div className="profile-left-column">
          {/* Le pasamos el adminUser real sacado de la BD */}
          <ProfileCard user={adminUser} role={adminUser.cargo} />
          <ProfileMenu activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>


        {/* Columna Derecha */}
        <div className="profile-right-column">
          {/* Aquí el ProfileForm recibe los datos reales para pintarlos en los Inputs */}
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



