import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './Employees.css';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  // Estado para el modal de edición
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editFormData, setEditFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    area: '',
    hireDate: '',
  });
  const [saving, setSaving] = useState(false);

  // Función para cargar empleados activos (sin /api)
  const fetchEmployees = async () => {
    try {
      const response = await api.get('/employees'); // Cambiado: sin /api
      // Filtrar solo empleados con status 'ACTIVE' del usuario
      const activeEmployees = response.data.filter(emp => emp.userDto?.status === 'ACTIVE');
      setEmployees(activeEmployees);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Soft delete: desactivar usuario
  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres desactivar este empleado?')) return;
    setDeletingId(id);
    try {
      const empToUpdate = employees.find(e => e.idEmployee === id);
      if (!empToUpdate) return;

      await api.put(`/users/${empToUpdate.userDto.idUser}`, {
        ...empToUpdate.userDto,
        status: 'INACTIVE'
      });

      await fetchEmployees();
    } catch (error) {
      console.error('Error al desactivar empleado:', error);
      alert('No se pudo desactivar el empleado');
    } finally {
      setDeletingId(null);
    }
  };

  // Abrir modal de edición
  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setEditFormData({
      firstName: employee.userDto?.firstName || '',
      lastName: employee.userDto?.lastName || '',
      email: employee.userDto?.email || '',
      position: employee.position || '',
      area: employee.area || '',
      hireDate: employee.hireDate ? employee.hireDate.split('T')[0] : '',
    });
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  // Guardar cambios (dos llamadas)
  const handleSaveEdit = async () => {
    if (!editingEmployee) return;
    setSaving(true);
    try {
      // 1. Actualizar usuario (sin /api)
      await api.put(`/users/${editingEmployee.userDto.idUser}`, {
        ...editingEmployee.userDto,
        firstName: editFormData.firstName,
        lastName: editFormData.lastName,
        email: editFormData.email,
      });

      // 2. Actualizar empleado (sin /api)
      const updatedEmployee = {
        ...editingEmployee,
        position: editFormData.position,
        area: editFormData.area,
        hireDate: editFormData.hireDate ? editFormData.hireDate + 'T00:00:00' : editingEmployee.hireDate,
      };
      await api.put(`/employees/${editingEmployee.idEmployee}`, updatedEmployee); // Cambiado: sin /api

      await fetchEmployees();
      setShowEditModal(false);
      setEditingEmployee(null);
    } catch (error) {
      console.error('Error al editar empleado:', error);
      if (error.response) {
        alert(`Error ${error.response.status}: ${JSON.stringify(error.response.data)}`);
      } else {
        alert('No se pudo guardar los cambios');
      }
    } finally {
      setSaving(false);
    }
  };

  // Filtrar empleados
  const filteredEmployees = employees.filter(e =>
    `${e.userDto?.firstName || ''} ${e.userDto?.lastName || ''}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (e.userDto?.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (e.position || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Estadísticas
  const total = employees.length;
  const active = employees.filter(e => e.userDto?.status === 'ACTIVE').length;
  const inactive = employees.filter(e => e.userDto?.status === 'INACTIVE').length;

  if (loading) return <div className="employees-loading">Cargando empleados...</div>;
  if (error) return <div className="employees-error">Error: {error}</div>;

  return (
    <div className="employees-container">
      <h2 className="employees-title">Gestión de Empleados</h2>

      {/* Tarjetas de resumen */}
      <div className="summary-cards">
        <div className="summary-card total">
          <p>Total Empleados</p>
          <span>{total}</span>
        </div>
        <div className="summary-card active">
          <p>Activos</p>
          <span>{active}</span>
        </div>
        <div className="summary-card inactive">
          <p>Inactivos</p>
          <span>{inactive}</span>
        </div>
      </div>

      {/* Buscador */}
      <div className="employees-search">
        <input
          type="text"
          placeholder="Buscar por nombre, email o cargo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tabla */}
      <table className="employees-table">
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
              <td>{e.userDto?.firstName} {e.userDto?.lastName}</td>
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
                <button className="btn-edit" onClick={() => handleEdit(e)}>Editar</button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(e.idEmployee)}
                  disabled={deletingId === e.idEmployee}
                >
                  {deletingId === e.idEmployee ? 'Eliminando...' : 'Eliminar'}
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
            <h3>Editar Empleado</h3>
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
              <div className="form-group">
                <label>Cargo:</label>
                <input
                  type="text"
                  name="position"
                  value={editFormData.position}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Área:</label>
                <input
                  type="text"
                  name="area"
                  value={editFormData.area}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Fecha de Ingreso:</label>
                <input
                  type="date"
                  name="hireDate"
                  value={editFormData.hireDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="modal-actions">
                <button type="submit" disabled={saving}>
                  {saving ? 'Guardando...' : 'Guardar'}
                </button>
                <button type="button" onClick={() => setShowEditModal(false)}>
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

export default Employees;