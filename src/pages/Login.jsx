import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthCard from "../components/layout/AuthCard"; 
import InputField from "../components/ui/InputField"; 
import Button from "../components/ui/Button"; 
import { apiClient, endpoints } from "../services/api"; 
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    if (errorMsg) setErrorMsg("");
  };

const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      setErrorMsg("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await apiClient.post(endpoints.users.login, form);
      const userData = response.data;

      // 1. Guardar la sesión
      if (userData.token) {
        localStorage.setItem("token", userData.token);
      }
      localStorage.setItem("user", JSON.stringify(userData));

      // --- DIAGNÓSTICO EN TIEMPO REAL ---
      // Esto te mostrará una ventana emergente con lo que el backend devolvió
      console.log("Datos del usuario:", userData);
      
      // 2. Extraer ID y Rol con nombres alternativos (por si el backend usa CamelCase)
      const userId = parseInt(userData.id || userData.idUser || 0);
      const rawRoles = (userData.role || userData.roles || "").toString().toUpperCase();

      // 3. TRIPLE VALIDACIÓN PARA REDIRECCIÓN
      // Se irá a ADMIN si: Su ID es del 1 al 6 O si el backend dice que es ADMIN
      const isEmployee = (userId >= 1 && userId <= 6);
      const hasAdminRole = rawRoles.includes("ADMIN");

      if (isEmployee || hasAdminRole) {
        alert(`ID detectado: ${userId} - Redirigiendo a ADMIN`);
        navigate("/admin/dashboard");
      } else {
        alert(`ID detectado: ${userId} - Redirigiendo a STUDENT`);
        navigate("/student/dashboard");
      }

    } catch (error) {
      console.error("Error en login:", error);
      setErrorMsg("Error de credenciales o servidor.");
    }
  };
  return (
    <div className="auth-container">
      <AuthCard>
        <div className="logo-section">
          <div className="logo-box">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <h1>Surotec</h1>
          <p>Plataforma de Gestión Educativa</p>
        </div>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Usuario o Correo"
            name="username"
            placeholder="gmontilla / jperez"
            value={form.username}
            onChange={handleChange}
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9ca3af"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            }
          />

          <InputField
            label="Contraseña"
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            rightLabel={
              <Link to="/recuperar" className="link-text">
                ¿Olvidaste tu contraseña?
              </Link>
            }
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9ca3af"
                strokeWidth="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            }
          />

          {errorMsg && <div className="error-alert">{errorMsg}</div>}

          <Button type="submit">Iniciar Sesión</Button>
        </form>

        <div className="auth-footer">
          <span>¿Problemas para acceder?</span>{" "}
          <Link to="/recuperar" className="link-text bold">
            Recuperar contraseña
          </Link>
        </div>
      </AuthCard>
    </div>
  );
};

export default Login;