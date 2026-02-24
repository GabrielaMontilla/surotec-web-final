import React from "react";
import { User, Key, Bell } from "lucide-react"; // Importamos los íconos
import "./ProfileMenu.css";


const ProfileMenu = ({ activeTab, setActiveTab }) => {
  return (
    <div className="profile-menu">
      <button
        className={`profile-menu-item ${activeTab === "personal" ? "active" : ""}`}
        onClick={() => setActiveTab("personal")}
      >
        <User size={18} />
        Información Personal
      </button>


      <button
        className={`profile-menu-item ${activeTab === "seguridad" ? "active" : ""}`}
        onClick={() => setActiveTab("seguridad")}
      >
        <Key size={18} />
        Seguridad
      </button>


      <button
        className={`profile-menu-item ${activeTab === "notificaciones" ? "active" : ""}`}
        onClick={() => setActiveTab("notificaciones")}
      >
        <Bell size={18} />
        Notificaciones
      </button>
    </div>
  );
};


export default ProfileMenu;


