import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthCard from "../components/layout/AuthCard";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
// Importamos el mismo CSS porque reusaremos las clases estructurales
import "./Login.css";

const RecuperarPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí luego conectamos con Axios a tu endpoint de recuperación
    console.log("Enviando correo de recuperación a:", email);
    alert("Simulación: Instrucciones enviadas al correo");
  };

  return (
    <div className="auth-container">
      <AuthCard>
        {/* Usamos las mismas clases para el logo y títulos */}
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
          <h1>Recuperar Contraseña</h1>
          {/* El texto dividido en dos líneas como en el diseño */}
          <p>
            Ingresa tu correo electrónico y te enviaremos las
            <br />
            instrucciones
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Correo Electrónico"
            name="email"
            type="email"
            placeholder="tu@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          {/* Un poco de margen extra para separar el botón del input */}
          <div style={{ marginTop: "24px" }}>
            <Button type="submit">Enviar Instrucciones</Button>
          </div>
        </form>

        {/* Link para volver, centrado y sin borde superior */}
        <div className="back-link-container">
          <Link to="/" className="link-text bold">
            &larr; Volver al inicio de sesión
          </Link>
        </div>
      </AuthCard>
    </div>
  );
};

export default RecuperarPassword;
