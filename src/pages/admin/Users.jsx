import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  // Estado para el modal de edición
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [saving, setSaving] = useState(false);

  // Estado para el modal de creación
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    documentType: 'CC',
    documentNumber: '',
    firstName: '',
    lastName: '',
    username: '',
    age: '',
    email: '',
    password: '',
  });
  const [creating, setCreating] = useState(false);

  // Cargar usuarios activos
  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      const activeUsers = response.data.filter(u => u.status === 'ACTIVE');
      setUsers(activeUsers);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Soft delete
  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres desactivar este usuario?')) return;
    setDeletingId(id);
    try {
      const userToUpdate = users.find(u => u.idUser === id);
      if (!userToUpdate) return;
      const updatedUser = { ...userToUpdate, status: 'INACTIVE' };
      await api.put(`/users/${id}`, updatedUser);
      await fetchUsers();
    } catch (error) {
      console.error('Error al desactivar usuario:', error);
      alert('No se pudo desactivar el usuario');
    } finally {
      setDeletingId(null);
    }
  };

  // Abrir modal de edición
  const handleEdit = (user) => {
    setEditingUser(user);
    setEditFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
    });
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  // Guardar cambios (editar)
  const handleSaveEdit = async () => {
    if (!editingUser) return;
    setSaving(true);
    try {
      const updatedUser = {
        ...editingUser,
        firstName: editFormData.firstName,
        lastName: editFormData.lastName,
        email: editFormData.email,
      };
      await api.put(`/users/${editingUser.idUser}`, updatedUser);
      await fetchUsers();
      setShowEditModal(false);
      setEditingUser(null);
    } catch (error) {
      console.error('Error al editar usuario:', error);
      alert('No se pudo guardar los cambios');
    } finally {
      setSaving(false);
    }
  };

  // Funciones para el modal de creación
  const handleCreateInputChange = (e) => {
    const { name, value } = e.target;
    setCreateFormData({ ...createFormData, [name]: value });
  };

  const handleCreate = async () => {
    setCreating(true);
    try {
      // Construir objeto usuario (sin id)
      const newUser = {
        documentType: createFormData.documentType,
        documentNumber: createFormData.documentNumber,
        firstName: createFormData.firstName,
        lastName: createFormData.lastName,
        username: createFormData.username,
        age: createFormData.age,
        email: createFormData.email,
        password: createFormData.password,
        status: 'ACTIVE',
        dateCreate: new Date().toISOString(),
        dateUpdate: new Date().toISOString(),
      };
      await api.post('/users', newUser);
      await fetchUsers();
      setShowCreateModal(false);
      // Resetear formulario
      setCreateFormData({
        documentType: 'CC',
        documentNumber: '',
        firstName: '',
        lastName: '',
        username: '',
        age: '',
        email: '',
        password: '',
      });
    } catch (error) {
      console.error('Error al crear usuario:', error);
      alert('No se pudo crear el usuario');
    } finally {
      setCreating(false);
    }
  };

  // Filtrar usuarios
  const filteredUsers = users.filter(u =>
    `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="users-loading">Cargando usuarios...</div>;
  if (error) return <div className="users-error">Error: {error}</div>;

  return (
    <div className="users-container">
      <div className="users-header">
        <h2 className="users-title">Gestión de Usuarios</h2>
        <button className="btn-create" onClick={() => setShowCreateModal(true)}>+ Crear Usuario</button>
      </div>

      <div className="users-search">
        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="users-table">
        <thead>
          <tr>
            <th>USUARIO</th>
            <th>EMAIL</th>
            <th>ESTADO</th>
            <th>FECHA CREACIÓN</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(u => (
            <tr key={u.idUser}>
              <td>{u.firstName} {u.lastName}</td>
              <td>{u.email}</td>
              <td>
                <span className={`status-badge ${u.status === 'ACTIVE' ? 'active' : 'inactive'}`}>
                  {u.status === 'ACTIVE' ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td>{new Date(u.dateCreate).toLocaleDateString()}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(u)}>Editar</button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(u.idUser)}
                  disabled={deletingId === u.idUser}
                >
                  {deletingId === u.idUser ? 'Eliminando...' : 'Eliminar'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de edición */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Editar Usuario</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }}>
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  name="firstName"
                  value={editFormData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Apellido:</label>
                <input
                  type="text"
                  name="lastName"
                  value={editFormData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit" disabled={saving}>
                  {saving ? 'Guardando...' : 'Guardar'}
                </button>
                <button type="button" onClick={() => setShowEditModal(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de creación */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Crear Nuevo Usuario</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
              <div className="form-group">
                <label>Tipo de documento:</label>
                <select
                  name="documentType"
                  value={createFormData.documentType}
                  onChange={handleCreateInputChange}
                  required
                >
                  <option value="CC">CC</option>
                  <option value="TI">TI</option>
                  <option value="PAS">PAS</option>
                  <option value="CE">CE</option>
                  <option value="RC">RC</option>
                  <option value="NIT">NIT</option>
                  <option value="PEP">PEP</option>
                </select>
              </div>
              <div className="form-group">
                <label>Número de documento:</label>
                <input
                  type="text"
                  name="documentNumber"
                  value={createFormData.documentNumber}
                  onChange={handleCreateInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  name="firstName"
                  value={createFormData.firstName}
                  onChange={handleCreateInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Apellido:</label>
                <input
                  type="text"
                  name="lastName"
                  value={createFormData.lastName}
                  onChange={handleCreateInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  value={createFormData.username}
                  onChange={handleCreateInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Fecha de nacimiento:</label>
                <input
                  type="date"
                  name="age"
                  value={createFormData.age}
                  onChange={handleCreateInputChange}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={createFormData.email}
                  onChange={handleCreateInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contraseña:</label>
                <input
                  type="password"
                  name="password"
                  value={createFormData.password}
                  onChange={handleCreateInputChange}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit" disabled={creating}>
                  {creating ? 'Creando...' : 'Crear'}
                </button>
                <button type="button" onClick={() => setShowCreateModal(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;