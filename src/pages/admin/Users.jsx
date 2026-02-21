import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './Users.css'; // Importamos los estilos

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users'); // Endpoint público
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
      const response = await api.get('/users');
      console.log('Respuesta completa:', response);
      console.log('Datos (response.data):', response.data);
      console.log('¿Es array?', Array.isArray(response.data));
      console.log('Primer elemento:', response.data[0]);
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  // Filtrar usuarios localmente
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
                <button className="btn-edit">Editar</button>
                <button className="btn-delete">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

// import React, { useState } from 'react';
// import './Users.css';

// const Users = () => {
//   // Datos de ejemplo (mock)
//   const [users] = useState([
//     { idUser: 1, firstName: 'Gabriela', lastName: 'Montilla', email: 'gabriela@example.com', status: 'ACTIVE', dateCreate: '2025-01-01T09:00:00' },
//     { idUser: 2, firstName: 'Esteban', lastName: 'Castaño', email: 'esteban@example.com', status: 'ACTIVE', dateCreate: '2025-01-01T09:00:00' },
//     { idUser: 3, firstName: 'Samuel', lastName: 'Olazábal', email: 'samuel@example.com', status: 'ACTIVE', dateCreate: '2025-01-01T09:00:00' },
//     { idUser: 4, firstName: 'Sebastian', lastName: 'Usuga', email: 'sebastian@example.com', status: 'ACTIVE', dateCreate: '2025-01-01T09:00:00' },
//     { idUser: 5, firstName: 'Lorena', lastName: 'Mejia', email: 'lorena@example.com', status: 'ACTIVE', dateCreate: '2025-01-01T09:00:00' },
//   ]);

//   const [searchTerm, setSearchTerm] = useState('');

//   // Filtrar usuarios según búsqueda
//   const filteredUsers = users.filter(user =>
//     `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="users-container">
//       <h2 className="users-title">Gestión de Usuarios</h2>
      
//       <div className="users-search">
//         <input
//           type="text"
//           placeholder="Buscar por nombre o email..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       <table className="users-table">
//         <thead>
//           <tr>
//             <th>USUARIO</th>
//             <th>EMAIL</th>
//             <th>ESTADO</th>
//             <th>FECHA CREACIÓN</th>
//             <th>ACCIONES</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredUsers.map(user => (
//             <tr key={user.idUser}>
//               <td>{user.firstName} {user.lastName}</td>
//               <td>{user.email}</td>
//               <td>
//                 <span className={`status-badge ${user.status === 'ACTIVE' ? 'active' : 'inactive'}`}>
//                   {user.status === 'ACTIVE' ? 'Activo' : 'Inactivo'}
//                 </span>
//               </td>
//               <td>{new Date(user.dateCreate).toLocaleDateString()}</td>
//               <td>
//                 <button className="btn-edit">Editar</button>
//                 <button className="btn-delete">Eliminar</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Users;