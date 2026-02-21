import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthCard from "../components/layout/AuthCard"; // Ajusta la ruta si es necesario
import InputField from "../components/ui/InputField"; // Ajusta la ruta si es necesario
import Button from "../components/ui/Button"; // Ajusta la ruta si es necesario
import { apiClient, endpoints } from "../services/api"; // <-- Importando tu configuración de API
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
    // Limpiamos el error si el usuario empieza a escribir
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos vacíos
    if (!form.username || !form.password) {
      setErrorMsg("Por favor, completa todos los campos.");
      return;
    }

    try {
      // Usamos tu apiClient y el endpoint de login
      const response = await apiClient.post(endpoints.users.login, form);
      const userData = response.data;

      // Guardamos el token para el interceptor y la data del usuario
      if (userData.token) {
        localStorage.setItem("token", userData.token);
      }
      localStorage.setItem("user", JSON.stringify(userData));

      // REDIRECCIÓN SEGÚN EL ROL
      // Ojo: Ajusta 'userData.role' por el nombre exacto que te envíe tu backend (ej. userData.rol, userData.tipo)
      // Ajusta "ADMIN" y "STUDENT" a los valores exactos de tu base de datos
      if (userData.role === "ADMIN" || userData.role === "ROLE_ADMIN") {
        navigate("/admin/dashboard");
      } else if (
        userData.role === "STUDENT" ||
        userData.role === "ROLE_STUDENT"
      ) {
        navigate("/student/dashboard");
      } else {
        // Por si no trae rol o es diferente
        navigate("/student/dashboard"); // Valor por defecto temporal
      }
    } catch (error) {
      console.log("Error en login:", error.response?.data || error.message);
      setErrorMsg("Credenciales incorrectas. Intenta de nuevo.");
    }
  };

  return (
    <div className="auth-container">
      <AuthCard>
        {/* Sección del Logo y Títulos */}
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
            label="Correo Electrónico"
            name="username"
            placeholder="admin@test.com"
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
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M2 4l10 8 10-8" />
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

          {/* Renderizado condicional del error */}
          {errorMsg && <div className="error-alert">{errorMsg}</div>}

          <Button type="submit">Iniciar Sesión</Button>
        </form>

        {/* Footer de la tarjeta */}
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
