import React from "react";
import "./InputField.css"; // <-- Importamos sus propios estilos


const InputField = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  icon,
  rightLabel,
}) => {
  return (
    <div className="input-group">
      <div className="label-row">
        <label>{label}</label>
        {/* Renderiza el link de "Olvidaste contraseña" solo si se lo pasamos */}
        {rightLabel && rightLabel}
      </div>


      <div className="input-wrapper">
        {/* Renderiza el ícono solo si se lo pasamos (como en el Login) */}
        {icon && <span className="input-icon">{icon}</span>}


        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          // Si hay ícono, le pone una clase extra para hacerle espacio
          className={icon ? "with-icon" : "standard-input"}
        />
      </div>
    </div>
  );
};


export default InputField;
