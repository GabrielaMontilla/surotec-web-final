import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/landing/Home';
import Nosotros from './pages/landing/Nosotros';
import Noticias from './pages/landing/Noticias';
import Contacto from './pages/landing/Contacto';
import EnConstruccion from './pages/landing/EnConstruccion';
import StudentDashboard from "./pages/student/StudentDashboard";
import { StudentLayout } from "./components/layout/StudentLayout";

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/en-construccion" element={<EnConstruccion />} />
        <Route
  path="/student-dashboard"
  element={
    <StudentLayout
      user={{ name: "Juan" }}
      setView={() => {}}
      currentView="dashboard"
      onLogout={() => {}}
    >
      <StudentDashboard />
    </StudentLayout>
  }
/>
      </Routes>
    </Router>
  );
}

export default App;
