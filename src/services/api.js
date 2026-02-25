import axios from 'axios';

const URL_BASE = "http://localhost:8086"

const api = axios.create({
  baseURL: URL_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// export const endpoints = {
//   users: {
//     base: URL_BASE + "/users",
//     getAll: URL_BASE + "/users",
//     getById: (id) => URL_BASE + "/users/" + id,
//     create: URL_BASE + "/users",
//     update: (id) => URL_BASE + "/users/" + id,
//     delete: (id) => URL_BASE + "/users/" + id,
//     login: URL_BASE + "/users/login",
//     byStatus: URL_BASE + "/users/status"
//   },

//   students: {
//     base: URL_BASE + "/students",
//     getAll: URL_BASE + "/students",
//     getById: (id) => URL_BASE + "/students/" + id,
//     create: URL_BASE + "/students",
//     update: (id) => URL_BASE + "/students/" + id,
//     delete: (id) => URL_BASE + "/students/" + id,
//     byStatus: URL_BASE + "/students/status"
//   },

//   cohorts: {
//     base: URL_BASE + "/api/cohorts",
//     getAll: URL_BASE + "/api/cohorts",
//     getById: (id) => URL_BASE + "/api/cohorts/" + id,
//     create: URL_BASE + "/api/cohorts",
//     update: (id) => URL_BASE + "/api/cohorts/" + id,
//     delete: (id) => URL_BASE + "/api/cohorts/" + id
//   },

//   roles: {
//     base: URL_BASE + "/api/v1/roles",
//     getAll: URL_BASE + "/api/v1/roles",
//     getById: (id) => URL_BASE + "/api/v1/roles/" + id,
//     create: URL_BASE + "/api/v1/roles",
//     update: (id) => URL_BASE + "/api/v1/roles/" + id,
//     delete: (id) => URL_BASE + "/api/v1/roles/" + id
//   },

//   employees: {
//     base: URL_BASE + "/api/employees",
//     getAll: URL_BASE + "/api/employees",
//     getById: (id) => URL_BASE + "/api/employees/" + id,
//     create: URL_BASE + "/api/employees",
//     update: (id) => URL_BASE + "/api/employees/" + id,
//     delete: (id) => URL_BASE + "/api/employees/" + id
//   },

//   employeeRoles: {
//     assign: (employeeId, roleId) =>
//       URL_BASE + "/api/v1/employees/" + employeeId + "/roles/" + roleId,
//     remove: (employeeId, roleId) =>
//       URL_BASE + "/api/v1/employees/" + employeeId + "/roles/" + roleId
//   },

//   projects: {
//     base: URL_BASE + "/api/projects",
//     getAll: URL_BASE + "/api/projects",
//     getById: (id) => URL_BASE + "/api/projects/" + id,
//     create: URL_BASE + "/api/projects",
//     update: (id) => URL_BASE + "/api/projects/" + id,
//     delete: (id) => URL_BASE + "/api/projects/" + id
//   },

//   news: {
//     base: URL_BASE + "/api/news",
//     create: URL_BASE + "/api/news",
//     getById: (id) => URL_BASE + "/api/news/" + id,
//     update: (id) => URL_BASE + "/api/news/" + id,
//     delete: (id) => URL_BASE + "/api/news/" + id,
//     byStatus: (status) => URL_BASE + "/api/news/status/" + status,
//     byEmployee: (employeeId) =>
//       URL_BASE + "/api/news/employee/" + employeeId
//   },

//   donations: {
//     base: URL_BASE + "/donations",
//     getAll: URL_BASE + "/donations",
//     getById: (id) => URL_BASE + "/donations/" + id,
//     create: URL_BASE + "/donations",
//     delete: (id) => URL_BASE + "/donations/" + id
//   }
// }

export const endpoints = {
  users: {
    base: "/users",
    getAll: "/users",
    getById: (id) => `/users/${id}`,
    create: "/users",
    update: (id) => `/users/${id}`,
    delete: (id) => `/users/${id}`,
    login: "/users/login",
    byStatus: "/users/status"
  },

  students: {
    base: "/students",
    getAll: "/students",
    getById: (id) => `/students/${id}`,
    create: "/students",
    update: (id) => `/students/${id}`,
    delete: (id) => `/students/${id}`,
    byStatus: "/students/status"
  },

  cohorts: {
    base: "/api/cohorts",
    getAll: "/api/cohorts",
    getById: (id) => `/api/cohorts/${id}`,
    create: "/api/cohorts",
    update: (id) => `/api/cohorts/${id}`,
    delete: (id) => `/api/cohorts/${id}`
  },

  roles: {
    base: "/api/v1/roles",
    getAll: "/api/v1/roles",
    getById: (id) => `/api/v1/roles/${id}`,
    create: "/api/v1/roles",
    update: (id) => `/api/v1/roles/${id}`,
    delete: (id) => `/api/v1/roles/${id}`
  },

  employees: {
    base: "/employees",
    getAll: "/employees",
    getById: (id) => `/employees/${id}`,
    create: "/employees",
    update: (id) => `/employees/${id}`,
    delete: (id) => `/employees/${id}`
  },

  employeeRoles: {
    assign: (employeeId, roleId) => `/api/v1/employees/${employeeId}/roles/${roleId}`,
    remove: (employeeId, roleId) => `/api/v1/employees/${employeeId}/roles/${roleId}`
  },

  projects: {
    base: "/api/projects",
    getAll: "/api/projects",
    getById: (id) => `/api/projects/${id}`,
    create: "/api/projects",
    update: (id) => `/api/projects/${id}`,
    delete: (id) => `/api/projects/${id}`
  },

  news: {
    base: "/api/news",
    create: "/api/news",
    getById: (id) => `/api/news/${id}`,
    update: (id) => `/api/news/${id}`,
    delete: (id) => `/api/news/${id}`,
    byStatus: (status) => `/api/news/status/${status}`,
    byEmployee: (employeeId) => `/api/news/employee/${employeeId}`
  },

  donations: {
    base: "/donations",
    getAll: "/donations",
    getById: (id) => `/donations/${id}`,
    create: "/donations",
    delete: (id) => `/donations/${id}`
  }
};

// Exportamos la instancia de axios como default, y endpoints como exportación nombrada
export default api;
