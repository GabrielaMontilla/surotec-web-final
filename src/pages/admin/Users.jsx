import React, { useState, useEffect } from 'react';
import { apiClient as api } from '../../services/api';
import './admin-common.css'; // Estilos comunes
import AdminLayout from '../../components/layout/AdminLayout';
import StatCard from '../../components/ui/StatCard';



<AdminLayout>
  <StatCard>

  </StatCard>
</AdminLayout>

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  // Modales
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({ firstName: '', lastName: '', email: '' });
  const [saving, setSaving] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    documentType: 'CC', documentNumber: '', firstName: '', lastName: '',
    username: '', age: '', email: '', password: ''
  });
  const [creating, setCreating] = useState(false);

  // Cargar usuarios
  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      // Filtramos activos para mostrar, pero en el mockup se ven todos (activos e inactivos)
      // Para el mockup, mostraremos todos, pero puedes ajustar según necesidad
      setUsers(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  // Handlers (similares a los anteriores)
  const handleDelete = async (id) => {
    if (!window.confirm('¿Desactivar usuario?')) return;
    setDeletingId(id);
    try {
      const userToUpdate = users.find(u => u.idUser === id);
      await api.put(`/users/${id}`, { ...userToUpdate, status: 'INACTIVE' });
      await fetchUsers();
    } catch (error) {
      alert('Error al desactivar');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditFormData({ firstName: user.firstName, lastName: user.lastName, email: user.email });
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;
    setSaving(true);
    try {
      await api.put(`/users/${editingUser.idUser}`, { ...editingUser, ...editFormData });
      await fetchUsers();
      setShowEditModal(false);
    } catch (error) {
      alert('Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  const handleCreateInputChange = (e) => {
    const { name, value } = e.target;
    setCreateFormData({ ...createFormData, [name]: value });
  };

  const handleCreate = async () => {
    setCreating(true);
    try {
      const newUser = {
        ...createFormData,
        age: createFormData.age ? Math.floor((new Date() - new Date(createFormData.age)) / (1000 * 60 * 60 * 24 * 365)) : 0,
        status: 'ACTIVE',
      };
      await api.post('/users', newUser);
      await fetchUsers();
      setShowCreateModal(false);
      setCreateFormData({ documentType: 'CC', documentNumber: '', firstName: '', lastName: '', username: '', age: '', email: '', password: '' });
    } catch (error) {
      alert('Error al crear');
    } finally {
      setCreating(false);
    }
  };

  const filteredUsers = users.filter(u =>
    `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Estadísticas
  const total = users.length;
  const active = users.filter(u => u.status === 'ACTIVE').length;
  const inactive = users.filter(u => u.status === 'INACTIVE').length;

  if (loading) return <div className="admin-page">Cargando...</div>;
  if (error) return <div className="admin-page">Error: {error}</div>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h2>Gestión de Usuarios</h2>
          <p>Administra todos los usuarios de la plataforma.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
          + Crear Usuario
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por nombre o email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">👥</div>
          <div className="stat-info">
            <h3>Total Usuarios</h3>
            <p>{total}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon active">✓</div>
          <div className="stat-info">
            <h3>Activos</h3>
            <p>{active}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon inactive">✗</div>
          <div className="stat-info">
            <h3>Inactivos</h3>
            <p>{inactive}</p>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>USUARIO</th>
              <th>ROL</th>
              <th>ESTADO</th>
              <th>ÚLTIMA CONEXIÓN</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.idUser}>
                <td>
                  <div>{user.firstName} {user.lastName}</div>
                  <small style={{ color: '#7f8c8d' }}>{user.email}</small>
                </td>
                <td>{user.role || '—'}</td> {/* Placeholder */}
                <td>
                  <span className={`status-badge ${user.status === 'ACTIVE' ? 'active' : 'inactive'}`}>
                    {user.status === 'ACTIVE' ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>{user.lastConnection || '—'}</td> {/* Placeholder */}
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon edit" onClick={() => handleEdit(user)} title="Editar">✏️</button>
                    <button className="btn-icon delete" onClick={() => handleDelete(user.idUser)} disabled={deletingId === user.idUser} title="Eliminar">
                      {deletingId === user.idUser ? '⏳' : '🗑️'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de edición (simplificado) */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Editar Usuario</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }}>
              <div className="form-group">
                <label>Nombre</label>
                <input type="text" name="firstName" value={editFormData.firstName} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Apellido</label>
                <input type="text" name="lastName" value={editFormData.lastName} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={editFormData.email} onChange={handleInputChange} required />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Guardando...' : 'Guardar'}</button>
                <button type="button" className="btn-secondary" onClick={() => setShowEditModal(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de creación (simplificado) */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal-content modal-lg">
            <h3>Crear Nuevo Usuario</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
              <div className="form-row">
                <div className="form-group">
                  <label>Tipo Documento</label>
                  <select name="documentType" value={createFormData.documentType} onChange={handleCreateInputChange} required>
                    {['CC', 'TI', 'PAS', 'CE', 'RC', 'NIT', 'PEP'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Número Documento</label>
                  <input type="text" name="documentNumber" value={createFormData.documentNumber} onChange={handleCreateInputChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Nombre</label>
                  <input type="text" name="firstName" value={createFormData.firstName} onChange={handleCreateInputChange} required />
                </div>
                <div className="form-group">
                  <label>Apellido</label>
                  <input type="text" name="lastName" value={createFormData.lastName} onChange={handleCreateInputChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" name="username" value={createFormData.username} onChange={handleCreateInputChange} required />
                </div>
                <div className="form-group">
                  <label>Fecha Nacimiento</label>
                  <input type="date" name="age" value={createFormData.age} onChange={handleCreateInputChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" value={createFormData.email} onChange={handleCreateInputChange} required />
                </div>
                <div className="form-group">
                  <label>Contraseña</label>
                  <input type="password" name="password" value={createFormData.password} onChange={handleCreateInputChange} required />
                </div>
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn-primary" disabled={creating}>{creating ? 'Creando...' : 'Crear'}</button>
                <button type="button" className="btn-secondary" onClick={() => setShowCreateModal(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;