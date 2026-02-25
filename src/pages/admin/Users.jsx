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
    // Agrega otros campos que quieras editar
  });
  const [saving, setSaving] = useState(false);

  // Cargar usuarios activos
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        const activeUsers = response.data.filter(user => user.status === 'ACTIVE');
        setUsers(activeUsers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Eliminar (soft delete)
  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres desactivar este usuario?')) return;
    setDeletingId(id);
    try {
      const userToUpdate = users.find(u => u.idUser === id);
      if (!userToUpdate) return;
      const updatedUser = { ...userToUpdate, status: 'INACTIVE' };
      await api.put(`/users/${id}`, updatedUser);
      setUsers(users.filter(u => u.idUser !== id));
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
      // Si hay más campos, agrégalos aquí
    });
    setShowEditModal(true);
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  // Guardar cambios
  const handleSaveEdit = async () => {
    if (!editingUser) return;
    setSaving(true);
    try {
      // Crear objeto con los datos actualizados
      const updatedUser = {
        ...editingUser,
        ...editFormData
        // Nota: No cambiamos el status aquí, solo datos personales
      };
      await api.put(`/users/${editingUser.idUser}`, updatedUser);
      
      // Actualizar la lista local
      setUsers(users.map(u => 
        u.idUser === editingUser.idUser ? { ...u, ...editFormData } : u
      ));
      
      setShowEditModal(false);
      setEditingUser(null);
    } catch (error) {
      console.error('Error al editar usuario:', error);
      alert('No se pudo guardar los cambios');
    } finally {
      setSaving(false);
    }
  };

  // Cerrar modal sin guardar
  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingUser(null);
  };

  // Filtrar usuarios por búsqueda
  const filteredUsers = users.filter(user =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="users-loading">Cargando usuarios...</div>;
  if (error) return <div className="users-error">Error: {error}</div>;

  return (
    <div className="users-container">
      <h2 className="users-title">Gestión de Usuarios</h2>
      
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
          {filteredUsers.map(user => (
            <tr key={user.idUser}>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td>
                <span className={`status-badge ${user.status === 'ACTIVE' ? 'active' : 'inactive'}`}>
                  {user.status === 'ACTIVE' ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td>{new Date(user.dateCreate).toLocaleDateString()}</td>
              <td>
                <button 
                  className="btn-edit" 
                  onClick={() => handleEdit(user)}
                >
                  Editar
                </button>
                <button 
                  className="btn-delete" 
                  onClick={() => handleDelete(user.idUser)}
                  disabled={deletingId === user.idUser}
                >
                  {deletingId === user.idUser ? 'Eliminando...' : 'Eliminar'}
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
              {/* Agrega más campos según necesites */}
              <div className="modal-actions">
                <button type="submit" disabled={saving}>
                  {saving ? 'Guardando...' : 'Guardar'}
                </button>
                <button type="button" onClick={handleCloseModal}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;