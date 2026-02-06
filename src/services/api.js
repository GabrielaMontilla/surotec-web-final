const URL_BASE = "http://localhost:8086"

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
