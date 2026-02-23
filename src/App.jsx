import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/AdminDashboard";
import RecuperarPassword from "./pages/RecuperarPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* Actualizamos la ruta para que coincida con el Login y el Sidebar */}
      <Route path="/admin/dashboard" element={<Dashboard />} />

      {/* Ponemos una temporal para el estudiante para que no se reviente */}
      <Route
        path="/student/dashboard"
        element={<h1>Dashboard de Estudiante (En construcción)</h1>}
      />

      <Route path="/recuperar" element={<RecuperarPassword />} />
    </Routes>
  );
}

export default App;
