import axios from "axios";

// CONFIGURACIÓN BASE
const URL_BASE = "http://localhost:8086";

export const apiClient = axios.create({
  baseURL: URL_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// INTERCEPTOR (Preparado para JWT)
// Cuando se tenga login con token,
// aquí se agregará automáticamente a cada request

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);


export const endpoints = {
  users: {
    base: "/users",
    getAll: "/users",
    getById: (id) => `/users/${id}`,
    create: "/users",
    update: (id) => `/users/${id}`,
    delete: (id) => `/users/${id}`,
    login: "/users/login",
    byStatus: "/users/status",
  },

  students: {
    base: "/students",
    getAll: "/students",
    getById: (id) => `/students/${id}`,
    create: "/students",
    update: (id) => `/students/${id}`,
    delete: (id) => `/students/${id}`,
    byStatus: "/students/status",
  },

  cohorts: {
    base: "/api/cohorts",
    getAll: "/api/cohorts",
    getById: (id) => `/api/cohorts/${id}`,
    create: "/api/cohorts",
    update: (id) => `/api/cohorts/${id}`,
    delete: (id) => `/api/cohorts/${id}`,
  },

  roles: {
    base: "/api/v1/roles",
    getAll: "/api/v1/roles",
    getById: (id) => `/api/v1/roles/${id}`,
    create: "/api/v1/roles",
    update: (id) => `/api/v1/roles/${id}`,
    delete: (id) => `/api/v1/roles/${id}`,
  },

  employees: {
    base: "/api/employees",
    getAll: "/api/employees",
    getById: (id) => `/api/employees/${id}`,
    create: "/api/employees",
    update: (id) => `/api/employees/${id}`,
    delete: (id) => `/api/employees/${id}`,
  },

  employeeRoles: {
    assign: (employeeId, roleId) =>
      `/api/v1/employees/${employeeId}/roles/${roleId}`,
    remove: (employeeId, roleId) =>
      `/api/v1/employees/${employeeId}/roles/${roleId}`,
  },

  projects: {
    base: "/api/projects",
    getAll: "/api/projects",
    getById: (id) => `/api/projects/${id}`,
    create: "/api/projects",
    update: (id) => `/api/projects/${id}`,
    delete: (id) => `/api/projects/${id}`,
  },

  news: {
    base: "/api/news",
    create: "/api/news",
    getById: (id) => `/api/news/${id}`,
    update: (id) => `/api/news/${id}`,
    delete: (id) => `/api/news/${id}`,
    byStatus: (status) => `/api/news/status/${status}`,
    byEmployee: (employeeId) => `/api/news/employee/${employeeId}`,
  },

  donations: {
    base: "/donations",
    getAll: "/donations",
    getById: (id) => `/donations/${id}`,
    create: "/donations",
    delete: (id) => `/donations/${id}`,
  },
};
