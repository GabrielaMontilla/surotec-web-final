import ProfileLayout from "../../components/profile/profileLayout/ProfileLayout";
import ProfileCard from "../../components/profile/profileCard/ProfileCard";
import ProfileMenu from "../../components/profile/profileMenu/ProfileMenu";
import ProfileForm from "../../components/profile/profileForm/ProfileForm";

function MiPerfilAdmin() {
  const adminUser = {
    nombre: "Admin User",
    email: "admin@test.com",
    avatar: "https://i.pravatar.cc/150?img=12",
  };

  return (
    <ProfileLayout>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          gap: "30px",
        }}
      >
        {/* Columna izquierda */}
        <div>
          <ProfileCard user={adminUser} role="Administrador Global" />
          <ProfileMenu />
        </div>

        {/* Columna derecha */}
        <ProfileForm user={adminUser} />
      </div>
    </ProfileLayout>
  );
}

export default MiPerfilAdmin;