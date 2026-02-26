import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './Students.css';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  // Estado para el modal de edición
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
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

  // Cargar estudiantes activos
  const fetchStudents = async () => {
    try {
      const response = await api.get('/students');
      const activeStudents = response.data.filter(s => s.status === 'ACTIVE');
      setStudents(activeStudents);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Soft delete
  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres desactivar este estudiante?')) return;
    setDeletingId(id);
    try {
      const studentToUpdate = students.find(s => s.idStudent === id);
      if (!studentToUpdate) return;
      const updatedStudent = { ...studentToUpdate, status: 'INACTIVE' };
      await api.put(`/students/${id}`, updatedStudent);
      await fetchStudents();
    } catch (error) {
      console.error('Error al desactivar estudiante:', error);
      alert('No se pudo desactivar el estudiante');
    } finally {
      setDeletingId(null);
    }
  };

  // Abrir modal de edición
  const handleEdit = (student) => {
    setEditingStudent(student);
    setEditFormData({
      firstName: student.userDto?.firstName || '',
      lastName: student.userDto?.lastName || '',
      email: student.userDto?.email || '',
    });
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  // Guardar cambios (editar)
  const handleSaveEdit = async () => {
    if (!editingStudent) return;
    setSaving(true);
    try {
      // Primero actualizar usuario
      await api.put(`/users/${editingStudent.userDto.idUser}`, {
        ...editingStudent.userDto,
        firstName: editFormData.firstName,
        lastName: editFormData.lastName,
        email: editFormData.email,
      });

      // Luego actualizar estudiante (aunque solo status, pero se envía todo)
      const updatedStudent = {
        ...editingStudent,
        userDto: {
          ...editingStudent.userDto,
          firstName: editFormData.firstName,
          lastName: editFormData.lastName,
          email: editFormData.email,
        }
      };
      await api.put(`/students/${editingStudent.idStudent}`, updatedStudent);

      await fetchStudents();
      setShowEditModal(false);
      setEditingStudent(null);
    } catch (error) {
      console.error('Error al editar estudiante:', error);
      alert('No se pudo guardar los cambios');
    } finally {
      setSaving(false);
    }
  };

  // Funciones para creación
  const handleCreateInputChange = (e) => {
    const { name, value } = e.target;
    setCreateFormData({ ...createFormData, [name]: value });
  };

  const handleCreate = async () => {
    setCreating(true);
    try {
      const now = new Date().toISOString();
      // Construir el objeto StudentDto con userDto anidado
      const newStudent = {
        userDto: {
          documentType: createFormData.documentType,
          documentNumber: createFormData.documentNumber,
          firstName: createFormData.firstName,
          lastName: createFormData.lastName,
          username: createFormData.username,
          age: createFormData.age ? new Date(createFormData.age).toISOString() : null,
          email: createFormData.email,
          password: createFormData.password,
          status: 'ACTIVE',
          dateCreate: now,
          dateUpdate: now,
        },
        status: 'ACTIVE',
        dateCreate: now,
        dateUpdate: now,
      };

      await api.post('/students', newStudent);
      await fetchStudents();
      setShowCreateModal(false);
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
      console.error('Error al crear estudiante:', error);
      alert('No se pudo crear el estudiante');
    } finally {
      setCreating(false);
    }
  };

  const filteredStudents = students.filter(s =>
    `${s.userDto?.firstName || ''} ${s.userDto?.lastName || ''}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.userDto?.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="students-loading">Cargando estudiantes...</div>;
  if (error) return <div className="students-error">Error: {error}</div>;

  return (
    <div className="students-container">
      <div className="students-header">
        <h2 className="students-title">Gestión de Estudiantes</h2>
        <button className="btn-create" onClick={() => setShowCreateModal(true)}>+ Crear Estudiante</button>
      </div>

      <div className="students-search">
        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="students-table">
        <thead>
          <tr>
            <th>ESTUDIANTE</th>
            <th>EMAIL</th>
            <th>ESTADO</th>
            <th>FECHA CREACIÓN</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map(s => (
            <tr key={s.idStudent}>
              <td>{s.userDto?.firstName} {s.userDto?.lastName}</td>
              <td>{s.userDto?.email}</td>
              <td>
                <span className={`status-badge ${s.status === 'ACTIVE' ? 'active' : 'inactive'}`}>
                  {s.status === 'ACTIVE' ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td>{new Date(s.dateCreate).toLocaleDateString()}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(s)}>Editar</button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(s.idStudent)}
                  disabled={deletingId === s.idStudent}
                >
                  {deletingId === s.idStudent ? 'Eliminando...' : 'Eliminar'}
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
            <h3>Editar Estudiante</h3>
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
            <h3>Crear Nuevo Estudiante</h3>
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

export default Students;