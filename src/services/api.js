/* const URL_BASE = "http://localhost:8086"

export const endpoints = {
  users: {
    base: URL_BASE + "/users",
    getAll: URL_BASE + "/users",
    getById: (id) => URL_BASE + "/users/" + id,
    create: URL_BASE + "/users",
    update: (id) => URL_BASE + "/users/" + id,
    delete: (id) => URL_BASE + "/users/" + id,
    login: URL_BASE + "/users/login",
    byStatus: URL_BASE + "/users/status"
  },

  students: {
    base: URL_BASE + "/students",
    getAll: URL_BASE + "/students",
    getById: (id) => URL_BASE + "/students/" + id,
    create: URL_BASE + "/students",
    update: (id) => URL_BASE + "/students/" + id,
    delete: (id) => URL_BASE + "/students/" + id,
    byStatus: URL_BASE + "/students/status"
  },

  cohorts: {
    base: URL_BASE + "/api/cohorts",
    getAll: URL_BASE + "/api/cohorts",
    getById: (id) => URL_BASE + "/api/cohorts/" + id,
    create: URL_BASE + "/api/cohorts",
    update: (id) => URL_BASE + "/api/cohorts/" + id,
    delete: (id) => URL_BASE + "/api/cohorts/" + id
  },

  roles: {
    base: URL_BASE + "/api/v1/roles",
    getAll: URL_BASE + "/api/v1/roles",
    getById: (id) => URL_BASE + "/api/v1/roles/" + id,
    create: URL_BASE + "/api/v1/roles",
    update: (id) => URL_BASE + "/api/v1/roles/" + id,
    delete: (id) => URL_BASE + "/api/v1/roles/" + id
  },

  employees: {
    base: URL_BASE + "/api/employees",
    getAll: URL_BASE + "/api/employees",
    getById: (id) => URL_BASE + "/api/employees/" + id,
    create: URL_BASE + "/api/employees",
    update: (id) => URL_BASE + "/api/employees/" + id,
    delete: (id) => URL_BASE + "/api/employees/" + id
  },

  employeeRoles: {
    assign: (employeeId, roleId) =>
      URL_BASE + "/api/v1/employees/" + employeeId + "/roles/" + roleId,
    remove: (employeeId, roleId) =>
      URL_BASE + "/api/v1/employees/" + employeeId + "/roles/" + roleId
  },

  projects: {
    base: URL_BASE + "/api/projects",
    getAll: URL_BASE + "/api/projects",
    getById: (id) => URL_BASE + "/api/projects/" + id,
    create: URL_BASE + "/api/projects",
    update: (id) => URL_BASE + "/api/projects/" + id,
    delete: (id) => URL_BASE + "/api/projects/" + id
  },

  news: {
    base: URL_BASE + "/api/news",
    create: URL_BASE + "/api/news",
    getById: (id) => URL_BASE + "/api/news/" + id,
    update: (id) => URL_BASE + "/api/news/" + id,
    delete: (id) => URL_BASE + "/api/news/" + id,
    byStatus: (status) => URL_BASE + "/api/news/status/" + status,
    byEmployee: (employeeId) =>
      URL_BASE + "/api/news/employee/" + employeeId
  },

  donations: {
    base: URL_BASE + "/donations",
    getAll: URL_BASE + "/donations",
    getById: (id) => URL_BASE + "/donations/" + id,
    create: URL_BASE + "/donations",
    delete: (id) => URL_BASE + "/donations/" + id
  }
}
 */

// src/services/api.js
const BASE_URL = "http://localhost:8086";

async function request(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status} en ${endpoint}`);
  }

  return response.json();
}

// ─── USER ──────────────────────────────────────────────────────────
// GET /users/{idUser}
export const getUserById = (idUser) => request(`/users/${idUser}`);

// ─── STUDENT ───────────────────────────────────────────────────────
// GET /students  → trae todos, luego filtramos por id_user en el hook
export const getAllStudents = () => request("/students");

// GET /students/{idStudent}
export const getStudentById = (idStudent) => request(`/students/${idStudent}`);

// ─── NOTICIAS ──────────────────────────────────────────────────────
// GET /api/news/status/PUBLISHED  → solo las publicadas
export const getNews = () => request("/api/news/status/PUBLISHED");

// ─── PROYECTOS ─────────────────────────────────────────────────────
// GET /api/projects  → todos (los proyectos son de empleados, no de estudiantes)
export const getProjects = () => request("/api/projects");

// ─── COHORTES ──────────────────────────────────────────────────────
// GET /api/cohorts
export const getCohorts = () => request("/api/cohorts");