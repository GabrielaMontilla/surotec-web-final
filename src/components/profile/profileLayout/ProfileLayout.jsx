import "./ProfileLayout.css";

function ProfileLayout({ children }) {
  return (
    <div className="profile-layout">
      <div className="profile-layout-container">
        {children}
      </div>
    </div>
  );
}

export default ProfileLayout;