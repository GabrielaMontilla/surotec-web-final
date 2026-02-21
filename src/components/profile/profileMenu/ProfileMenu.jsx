import "./ProfileMenu.css";

function ProfileMenu() {
  return (
    <div className="profile-menu">
      <div className="profile-menu-item active">
        Información Personal
      </div>

      <div className="profile-menu-item">
        Seguridad
      </div>

      <div className="profile-menu-item">
        Notificaciones
      </div>
    </div>
  );
}

export default ProfileMenu;