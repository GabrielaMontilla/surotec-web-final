import React from "react";
import { Menu, Search, Bell } from "lucide-react";

const Topbar = ({ toggleSidebar }) => {
  // Sacamos el usuario del localStorage por si quieres mostrar su nombre real
  const user = JSON.parse(localStorage.getItem("user")) || {
    firstName: "Admin",
    lastName: "User",
    role: "Admin",
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-btn" onClick={toggleSidebar}>
          <Menu size={24} color="#111827" />
        </button>
        <div className="search-bar">
          <Search size={18} color="#9ca3af" className="search-icon" />
          <input type="text" placeholder="Buscar contenido..." />
        </div>
      </div>

      <div className="topbar-right">
        <button className="notification-btn">
          <Bell size={20} color="#111827" />
          <span className="notification-dot"></span>
        </button>
        <div className="user-profile">
          <div className="user-info">
            <span className="user-name">
              {user.firstName} {user.lastName}
            </span>
            <span className="user-role">{user.role}</span>
          </div>
          {/* Avatar temporal, luego puedes poner la imagen real */}
          <div className="avatar">
            {user.firstName.charAt(0)}
            {user.lastName.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
