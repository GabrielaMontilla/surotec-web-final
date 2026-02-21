import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import RecuperarPassword from "./pages/RecuperarPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/recuperar" element={<RecuperarPassword />} />
    </Routes>
  );
}

export default App;
