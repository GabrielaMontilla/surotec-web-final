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
    base: "/employees",
    getAll: "/employees",
    getById: (id) => `/employees/${id}`,
    create: "/employees",
    update: (id) => `/employees/${id}`,
    delete: (id) => `/employees/${id}`,
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

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8086";

async function request(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText}`);
  }

  return response.json();
}

// ─── USER ──────────────────────────────────────────────────────────
export const getUserById = (idUser) => request(`/users/${idUser}`);
export const getAllUsers = () => request("/users");

// ─── STUDENT ───────────────────────────────────────────────────────
export const getAllStudents = () => request("/students");
export const getStudentById = (idStudent) => request(`/students/${idStudent}`);

// ─── NOTICIAS ──────────────────────────────────────────────────────
export const getNews = () => request("/api/news/status/PUBLISHED");
export const getNewsByEmployee = (employeeId) =>
  request(`/api/news/employee/${employeeId}`);

// ─── PROYECTOS ─────────────────────────────────────────────────────
export const getProjects = () => request("/api/projects");
export const getProjectById = (id) => request(`/api/projects/${id}`);
export const createProject = (projectData) =>
  request("/api/projects", {
    method: "POST",
    body: JSON.stringify(projectData),
  });

// ─── COHORTES ──────────────────────────────────────────────────────
export const getCohorts = () => request("/api/cohorts");
export const getCohortById = (id) => request(`/api/cohorts/${id}`);

// ─── EMPLEADOS ─────────────────────────────────────────────────────
export const getEmployees = () => request("/api/employees");
export const getEmployeeById = (id) => request(`/api/employees/${id}`);

// ─── PUENTE PARA COMPATIBILIDAD CON EL LOGIN Y OTROS COMPONENTES ───
// Envolvemos las respuestas en un objeto { data: ... } para simular Axios
export const apiClient = {
  get: async (url) => {
    const data = await request(url);
    return { data };
  },
  post: async (url, payload) => {
    const data = await request(url, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return { data };
  },
  put: async (url, payload) => {
    const data = await request(url, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    return { data };
  },
  delete: async (url) => {
    const data = await request(url, {
      method: "DELETE",
    });
    return { data };
  },
};

// Por si tu Login usa la función directa:
export const loginUser = async (credentials) => {
  const data = await request("/users/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
  return { data }; // También simulamos Axios aquí
};

// ✅ Agregamos export default de apiClient para importaciones más simples
export default apiClient;

