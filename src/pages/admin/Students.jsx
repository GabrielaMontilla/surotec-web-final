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

    // Función para cargar estudiantes activos desde el backend
    const fetchStudents = async () => {
        try {
            const response = await api.get('/students');
            // Filtrar solo estudiantes con status 'ACTIVE' (del estudiante, no del usuario)
            const activeStudents = response.data.filter(s => s.status === 'ACTIVE');
            setStudents(activeStudents);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Cargar estudiantes al montar el componente
    useEffect(() => {
        fetchStudents();
    }, []);

    // Soft delete (cambiar estado del estudiante a INACTIVE)
    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de que quieres desactivar este estudiante?')) return;
        setDeletingId(id);
        try {
            const studentToUpdate = students.find(s => s.idStudent === id);
            if (!studentToUpdate) return;

            // Crear objeto con status actualizado (estructura anidada)
            const updatedStudent = {
                ...studentToUpdate,
                status: 'INACTIVE'
            };

            await api.put(`/students/${id}`, updatedStudent);
            await fetchStudents(); // Recargar la lista
        } catch (error) {
            console.error('Error al desactivar estudiante:', error);
            alert('No se pudo desactivar el estudiante');
        } finally {
            setDeletingId(null);
        }
    };

    // Abrir modal de edición con los datos actuales
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

    // Guardar cambios (PUT) con estructura anidada
    const handleSaveEdit = async () => {
        if (!editingStudent) return;
        setSaving(true);
        try {
            // 1. Actualizar usuario
            await api.put(`/users/${editingStudent.userDto.idUser}`, {
                ...editingStudent.userDto,
                firstName: editFormData.firstName,
                lastName: editFormData.lastName,
                email: editFormData.email
            });

            // 2. Actualizar estudiante (por si acaso, aunque no sea necesario)
            const updatedStudent = {
                ...editingStudent,
                userDto: {
                    ...editingStudent.userDto,
                    firstName: editFormData.firstName,
                    lastName: editFormData.lastName,
                    email: editFormData.email
                }
            };
            await api.put(`/students/${editingStudent.idStudent}`, updatedStudent);

            await fetchStudents();
            setShowEditModal(false);
            setEditingStudent(null);
        } catch (error) {
            console.error('Error:', error);
            alert('No se pudo guardar');
        } finally {
            setSaving(false);
        }
    };

    // Filtrar estudiantes por nombre, apellido o email (usando userDto)
    const filteredStudents = students.filter(s =>
        `${s.userDto?.firstName || ''} ${s.userDto?.lastName || ''}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.userDto?.email || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="students-loading">Cargando estudiantes...</div>;
    if (error) return <div className="students-error">Error: {error}</div>;

    return (
        <div className="students-container">
            <h2 className="students-title">Gestión de Estudiantes</h2>

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

export default Students;