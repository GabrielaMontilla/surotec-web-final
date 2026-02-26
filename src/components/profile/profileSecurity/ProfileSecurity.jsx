import React, { useState } from "react";
import InputField from "../../ui/InputField";
import "./ProfileSecurity.css";


const ProfileSecurity = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });


  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };


  return (
    <div className="profile-security-container">
      <h3 className="profile-content-title">Seguridad de la Cuenta</h3>
      <span className="profile-subtitle">
        Gestiona tu contraseña y protege tu información.
      </span>


      <form className="security-form">
        <InputField
          label="Contraseña Actual"
          type="password"
          name="currentPassword"
          placeholder="••••••••"
          value={passwords.currentPassword}
          onChange={handleChange}
        />


        <div className="form-divider"></div>


        <InputField
          label="Nueva Contraseña"
          type="password"
          name="newPassword"
          placeholder="••••••••"
          value={passwords.newPassword}
          onChange={handleChange}
        />


        <InputField
          label="Confirmar Nueva Contraseña"
          type="password"
          name="confirmPassword"
          placeholder="••••••••"
          value={passwords.confirmPassword}
          onChange={handleChange}
        />


        <div className="profile-form-actions">
          <button type="submit" className="btn-blue-save">
            Actualizar Contraseña
          </button>
        </div>
      </form>
    </div>
  );
};


export default ProfileSecurity;
