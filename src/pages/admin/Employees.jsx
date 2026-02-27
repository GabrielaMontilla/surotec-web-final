import React, { useState, useEffect } from 'react';
import { apiClient as api } from '../../services/api';
import './admin-common.css';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  // Modales
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editFormData, setEditFormData] = useState({
    firstName: '', lastName: '', email: '', position: '', area: '', hireDate: ''
  });
  const [saving, setSaving] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    documentType: 'CC', documentNumber: '', firstName: '', lastName: '',
    username: '', age: '', email: '', password: '',
    position: '', area: '', hireDate: ''
  });
  const [creating, setCreating] = useState(false);

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/employees');
      setEmployees(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEmployees(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Desactivar empleado?')) return;
    setDeletingId(id);
    try {
      const empToUpdate = employees.find(e => e.idEmployee === id);
      await api.put(`/users/${empToUpdate.userDto.idUser}`, { ...empToUpdate.userDto, status: 'INACTIVE' });
      await fetchEmployees();
    } catch (error) {
      alert('Error al desactivar');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setEditFormData({
      firstName: employee.userDto?.firstName || '',
      lastName: employee.userDto?.lastName || '',
      email: employee.userDto?.email || '',
      position: employee.position || '',
      area: employee.area || '',
      hireDate: employee.hireDate ? employee.hireDate.split('T')[0] : ''
    });
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSaveEdit = async () => {
    if (!editingEmployee) return;
    setSaving(true);
    try {
      // Actualizar usuario
      await api.put(`/users/${editingEmployee.userDto.idUser}`, {
        ...editingEmployee.userDto,
        firstName: editFormData.firstName,
        lastName: editFormData.lastName,
        email: editFormData.email
      });
      // Actualizar empleado
      const updatedEmployee = {
        ...editingEmployee,
        position: editFormData.position,
        area: editFormData.area,
        hireDate: editFormData.hireDate ? editFormData.hireDate + 'T00:00:00' : editingEmployee.hireDate
      };
      await api.put(`/employees/${editingEmployee.idEmployee}`, updatedEmployee);
      await fetchEmployees();
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
      const newEmployee = {
        position: createFormData.position,
        area: createFormData.area,
        hireDate: createFormData.hireDate ? createFormData.hireDate + 'T00:00:00' : null,
        userDto: {
          documentType: createFormData.documentType,
          documentNumber: createFormData.documentNumber,
          firstName: createFormData.firstName,
          lastName: createFormData.lastName,
          username: createFormData.username,
          age: createFormData.age ? Math.floor((new Date() - new Date(createFormData.age)) / (1000 * 60 * 60 * 24 * 365)) : 0,
          email: createFormData.email,
          password: createFormData.password,
          status: 'ACTIVE'
        }
      };
      await api.post('/employees', newEmployee);
      await fetchEmployees();
      setShowCreateModal(false);
      setCreateFormData({ documentType: 'CC', documentNumber: '', firstName: '', lastName: '', username: '', age: '', email: '', password: '', position: '', area: '', hireDate: '' });
    } catch (error) {
      alert('Error al crear');
    } finally {
      setCreating(false);
    }
  };

  const filteredEmployees = employees.filter(e =>
    `${e.userDto?.firstName || ''} ${e.userDto?.lastName || ''}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (e.userDto?.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (e.position || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const total = employees.length;
  const active = employees.filter(e => e.userDto?.status === 'ACTIVE').length;
  const inactive = employees.filter(e => e.userDto?.status === 'INACTIVE').length;

  if (loading) return <div className="admin-page">Cargando...</div>;
  if (error) return <div className="admin-page">Error: {error}</div>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h2>Gestión de Empleados</h2>
          <p>Administra el personal administrativo y académico.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
          + Crear Empleado
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por nombre, email o cargo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">👥</div>
          <div className="stat-info">
            <h3>Total Empleados</h3>
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
              <th>EMPLEADO</th>
              <th>EMAIL</th>
              <th>CARGO</th>
              <th>ÁREA</th>
              <th>FECHA INGRESO</th>
              <th>ESTADO</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(e => (
              <tr key={e.idEmployee}>
                <td>
                  <div>{e.userDto?.firstName} {e.userDto?.lastName}</div>
                  <small style={{ color: '#7f8c8d' }}>{e.userDto?.email}</small>
                </td>
                <td>{e.userDto?.email}</td>
                <td>{e.position || '—'}</td>
                <td>{e.area || '—'}</td>
                <td>{e.hireDate ? new Date(e.hireDate).toLocaleDateString() : '—'}</td>
                <td>
                  <span className={`status-badge ${e.userDto?.status === 'ACTIVE' ? 'active' : 'inactive'}`}>
                    {e.userDto?.status === 'ACTIVE' ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon edit" onClick={() => handleEdit(e)} title="Editar">✏️</button>
                    <button className="btn-icon delete" onClick={() => handleDelete(e.idEmployee)} disabled={deletingId === e.idEmployee} title="Eliminar">
                      {deletingId === e.idEmployee ? '⏳' : '🗑️'}
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
          <div className="modal-content modal-lg">
            <h3>Editar Empleado</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }}>
              <div className="form-row">
                <div className="form-group">
                  <label>Nombre</label>
                  <input type="text" name="firstName" value={editFormData.firstName} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Apellido</label>
                  <input type="text" name="lastName" value={editFormData.lastName} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" value={editFormData.email} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Cargo</label>
                  <input type="text" name="position" value={editFormData.position} onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Área</label>
                  <input type="text" name="area" value={editFormData.area} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Fecha Ingreso</label>
                  <input type="date" name="hireDate" value={editFormData.hireDate} onChange={handleInputChange} />
                </div>
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
            <h3>Crear Nuevo Empleado</h3>
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
              <h4>Datos del Empleado</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Cargo</label>
                  <input type="text" name="position" value={createFormData.position} onChange={handleCreateInputChange} />
                </div>
                <div className="form-group">
                  <label>Área</label>
                  <input type="text" name="area" value={createFormData.area} onChange={handleCreateInputChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Fecha Ingreso</label>
                  <input type="date" name="hireDate" value={createFormData.hireDate} onChange={handleCreateInputChange} />
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

export default Employees;