import React, { useState, useEffect } from 'react';
import { apiClient as api } from '../../services/api';
import './admin-common.css';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  // Modales
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editFormData, setEditFormData] = useState({ firstName: '', lastName: '', email: '' });
  const [saving, setSaving] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    documentType: 'CC', documentNumber: '', firstName: '', lastName: '',
    username: '', age: '', email: '', password: ''
  });
  const [creating, setCreating] = useState(false);

  const fetchStudents = async () => {
    try {
      const response = await api.get('/students');
      setStudents(response.data); // Mostramos todos (activos e inactivos)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Desactivar estudiante?')) return;
    setDeletingId(id);
    try {
      const studentToUpdate = students.find(s => s.idStudent === id);
      await api.put(`/students/${id}`, { ...studentToUpdate, status: 'INACTIVE' });
      await fetchStudents();
    } catch (error) {
      alert('Error al desactivar');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setEditFormData({
      firstName: student.userDto?.firstName || '',
      lastName: student.userDto?.lastName || '',
      email: student.userDto?.email || ''
    });
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSaveEdit = async () => {
    if (!editingStudent) return;
    setSaving(true);
    try {
      // Actualizar usuario
      await api.put(`/users/${editingStudent.userDto.idUser}`, {
        ...editingStudent.userDto,
        ...editFormData
      });
      // Actualizar estudiante (solo el status si es necesario)
      await api.put(`/students/${editingStudent.idStudent}`, { ...editingStudent });
      await fetchStudents();
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
      const newStudent = {
        status: 'ACTIVE',
        userDto: {
          ...createFormData,
          age: createFormData.age ? Math.floor((new Date() - new Date(createFormData.age)) / (1000 * 60 * 60 * 24 * 365)) : 0,
          status: 'ACTIVE'
        }
      };
      await api.post('/students', newStudent);
      await fetchStudents();
      setShowCreateModal(false);
      setCreateFormData({ documentType: 'CC', documentNumber: '', firstName: '', lastName: '', username: '', age: '', email: '', password: '' });
    } catch (error) {
      alert('Error al crear');
    } finally {
      setCreating(false);
    }
  };

  const filteredStudents = students.filter(s =>
    `${s.userDto?.firstName || ''} ${s.userDto?.lastName || ''}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.userDto?.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const total = students.length;
  const active = students.filter(s => s.status === 'ACTIVE').length;
  const inactive = students.filter(s => s.status === 'INACTIVE').length;

  if (loading) return <div className="admin-page">Cargando...</div>;
  if (error) return <div className="admin-page">Error: {error}</div>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h2>Gestión de Estudiantes</h2>
          <p>Administra todos los estudiantes de la plataforma.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
          + Crear Estudiante
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
            <h3>Total Estudiantes</h3>
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
                <td>
                  <div>{s.userDto?.firstName} {s.userDto?.lastName}</div>
                  <small style={{ color: '#7f8c8d' }}>{s.userDto?.email}</small>
                </td>
                <td>{s.userDto?.email}</td>
                <td>
                  <span className={`status-badge ${s.status === 'ACTIVE' ? 'active' : 'inactive'}`}>
                    {s.status === 'ACTIVE' ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>{new Date(s.dateCreate).toLocaleDateString()}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon edit" onClick={() => handleEdit(s)} title="Editar">✏️</button>
                    <button className="btn-icon delete" onClick={() => handleDelete(s.idStudent)} disabled={deletingId === s.idStudent} title="Eliminar">
                      {deletingId === s.idStudent ? '⏳' : '🗑️'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de edición */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Editar Estudiante</h3>
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

      {/* Modal de creación */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal-content modal-lg">
            <h3>Crear Nuevo Estudiante</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
              <div className="form-row">
                <div className="form-group">
                  <label>Tipo Documento</label>
                  <select name="documentType" value={createFormData.documentType} onChange={handleCreateInputChange} required>
                    {['CC','TI','PAS','CE','RC','NIT','PEP'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
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

export default Students;