import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="admin-layout-wrapper">
      <Sidebar isCollapsed={isSidebarCollapsed} />

      <div className="main-wrapper">
        <Topbar toggleSidebar={toggleSidebar} />

        <main className="main-content">
          {/* Aquí adentro se inyectará el Dashboard, Usuarios, etc. */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
