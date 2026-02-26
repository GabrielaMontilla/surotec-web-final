import React from "react";
import "./StatCard.css";

const StatCard = ({ title, value, icon: IconComponent, trend, trendType }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <div className="stat-icon-wrapper">
          {/* Renderizamos el ícono que nos pasen por props */}
          {IconComponent && <IconComponent size={20} color="#4b5563" />}
        </div>
        {/* Renderizamos el porcentaje de subida/bajada solo si existe */}
        {trend && (
          <span className={`stat-trend ${trendType}`}>
            {trend}{" "}
            {trendType === "positive"
              ? "↗"
              : trendType === "negative"
                ? "↘"
                : ""}
          </span>
        )}
      </div>
      <div className="stat-card-body">
        <p className="stat-title">{title}</p>
        <h3 className="stat-value">{value}</h3>
      </div>
    </div>
  );
};

export default StatCard;
