import React from "react";

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
        {rightLabel && rightLabel}
      </div>
      <div className="input-wrapper">
        {icon && <span className="input-icon">{icon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          className={icon ? "with-icon" : ""}
        />
      </div>
    </div>
  );
};

export default InputField;
