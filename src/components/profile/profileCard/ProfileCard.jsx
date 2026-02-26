import "./ProfileCard.css";

function ProfileCard({ user, role }) {
  return (
    <div className="profile-card">
      <div className="profile-card-avatar">
        <img
          src={user?.avatar || "https://i.pravatar.cc/150?img=3"}
          alt="avatar"
        />
      </div>

      <h3 className="profile-card-name">
        {user?.nombre || "Admin User"}
      </h3>

      <p className="profile-card-role">
        {role || "Administrador Global"}
      </p>

      <span className="profile-card-badge">
        VERIFICADO
      </span>
    </div>
  );
}

export default ProfileCard;