import React from "react";
import "./RecentUserItem.css";

const RecentUserItem = ({ name, email, time, colorClass }) => {
  // Esta pequeña magia coge el nombre (Ej: "Gabriela Montilla") y saca "GM"
  const getInitials = (fullName) => {
    if (!fullName) return "NN";
    const names = fullName.trim().split(" ");
    if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  const initials = getInitials(name);

  return (
    <div className="recent-user-item">
      <div className={`user-avatar ${colorClass}`}>{initials}</div>
      <div className="recent-user-info">
        <p className="recent-user-name">{name}</p>
        <p className="recent-user-email">{email}</p>
      </div>
      <span className="recent-user-time">{time}</span>
    </div>
  );
};

export default RecentUserItem;
