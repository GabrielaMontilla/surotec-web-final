import "./ProfileForm.css";

function ProfileForm({ user }) {
  return (
    <div className="profile-form">
      <h2 className="profile-form-title">Información Personal</h2>

      <div className="profile-form-grid">
        <div className="form-group">
          <label>Nombre Completo</label>
          <input type="text" defaultValue={user?.nombre || "Admin User"} />
        </div>

        <div className="form-group">
          <label>Correo Electrónico</label>
          <input type="email" defaultValue={user?.email || "admin@test.com"} />
        </div>

        <div className="form-group">
          <label>Cargo</label>
          <input type="text" defaultValue="Administrador Global" />
        </div>

        <div className="form-group">
          <label>Teléfono</label>
          <input type="text" defaultValue="+1 234 567 890" />
        </div>
      </div>

      <div className="profile-form-actions">
        <button className="btn-save">Guardar Cambios</button>
      </div>
    </div>
  );
}

export default ProfileForm;