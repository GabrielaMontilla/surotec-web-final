import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StudentLayout } from "../../components/layout/StudentLayout";
import StudentDashboard from "./StudentDashboard";
import StudentProjects from "./StudentProjects";
import StudentNews from "./StudentNews";
import { getUserById } from "../../services/api";
import MiPerfilStudents from "./MiPerfilStudents";

const USER_ID = 7;

function PlaceholderView({ title }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        gap: 16,
        background: "white",
        borderRadius: 20,
        border: "1px dashed #e5e5e5",
        color: "#aaa",
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: 32 }}>🚧</p>
      <p style={{ fontSize: 18, fontWeight: "bold", color: "#555" }}>{title}</p>
      <p style={{ fontSize: 14 }}>Esta sección está en construcción.</p>
    </div>
  );
}

export default function StudentArea() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getUserById(USER_ID)
      .then((data) => {
        if (isMounted) {
          setUser(data);
          setLoadingUser(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setUserError(err.message);
          setLoadingUser(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = () => navigate("/");

  if (loadingUser)
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        Cargando sesión...
      </div>
    );
  if (userError || !user)
    return (
      <div style={{ color: "red", textAlign: "center", marginTop: "50px" }}>
        Error: {userError}
      </div>
    );

  const changeView = (view) => {
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <StudentDashboard userId={USER_ID} onNavigate={changeView} />;
      case "projects":
        return <StudentProjects />;
      case "news":
        return <StudentNews />;
      case "profile":
        return <MiPerfilStudents />;
      default:
        return <StudentDashboard userId={USER_ID} onNavigate={changeView} />;
    }
  };

  return (
    <StudentLayout
      user={user}
      currentView={currentView}
      setView={changeView}
      onLogout={handleLogout}
    >
      {renderView()}
    </StudentLayout>
  );
}
