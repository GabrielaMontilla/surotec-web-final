import React from "react";
import "./QuickAccessButton.css";

const QuickAccessButton = ({
  title,
  icon: IconComponent,
  iconColor,
  onClick,
}) => {
  return (
    <button className="quick-access-btn" onClick={onClick}>
      <div className="quick-icon-wrapper">
        {/* Renderizamos el ícono con el color que nos pasen */}
        {IconComponent && (
          <IconComponent size={24} color={iconColor} strokeWidth={2} />
        )}
      </div>
      <span className="quick-title">{title}</span>
    </button>
  );
};

export default QuickAccessButton;
