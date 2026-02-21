import { Routes, Route } from "react-router-dom";
/*import Login from "./pages/Login";*/
/*import Dashboard from "./pages/Dashboard";*/
import MiPerfilAdmin from "./pages/admin/MiPerfilAdmin";

function App() {
  return (
    <Routes>
      <Route path="/admin/perfil" element={<MiPerfilAdmin />} />
    </Routes>
  );
}

export default App;