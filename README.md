# Plataforma Web Surotec – Frontend

Frontend desarrollado en **React + JavaScript** para la Plataforma Web Surotec.

Incluye una landing page pública y un sistema interno con autenticación y control de roles, conectado a un backend desarrollado en Java (Programación Orientada a Objetos) con base de datos MySQL.

---

## Descripción del Proyecto

Surotec es una iniciativa enfocada en el desarrollo tecnológico de comunidades rurales, formando jóvenes en herramientas digitales para facilitar su acceso a oportunidades laborales sin abandonar su territorio.

La plataforma permite:

- Visualización pública de información institucional
- Registro e inicio de sesión
- Gestión de proyectos por parte de estudiantes
- Supervisión y administración por parte del rol administrador
- Comunicación con backend a través de API REST

---

## Arquitectura General


Frontend (React + JavaScript)
↓
HTTP Requests (REST API)
↓
Backend (Java - OOP - Spring Boot)
↓
Base de Datos MySQL


El frontend consume los endpoints expuestos por el backend para autenticación, gestión de usuarios y proyectos.

---

## Tecnologías Utilizadas

### Frontend

- React
- JavaScript (ES6+)
- React Router DOM
- Axios o Fetch API
- CSS / Tailwind CSS (según implementación)

### Backend (Repositorio independiente)

- Java
- Programación Orientada a Objetos (OOP)
- Spring Boot
- MySQL

---

## Módulos del Sistema

### 1. Landing Page (Pública)

Secciones:

- Inicio
- Quiénes Somos
- Noticias
- Contacto
- Inscripción

Incluye información institucional, problemática rural y propuesta de valor.

---

### 2. Sistema Interno (Privado)

#### Autenticación

- Inicio de sesión
- Validación contra backend
- Control de acceso por roles (Admin / Estudiante)
- Rutas protegidas mediante componente `ProtectedRoute`

---

### Dashboard Estudiante

Funcionalidades:

- Visualización de perfil
- Subida de proyectos
- Consulta de estado de proyectos
- Seguimiento de impacto

---

### Dashboard Administrador

Funcionalidades:

- Gestión de usuarios
- Visualización de proyectos
- Supervisión general del sistema
- Control administrativo

---

## Estructura del Proyecto


/src
│
├── assets/
├── components/
│ ├── landing/
│ ├── auth/
│ ├── dashboard/
│ └── shared/
│
├── pages/
│ ├── Home.jsx
│ ├── Login.jsx
│ ├── StudentDashboard.jsx
│ └── AdminDashboard.jsx
│
├── services/
│ ├── api.js
│ ├── authService.js
│ └── projectService.js
│
├── routes/
│ └── ProtectedRoute.jsx
│
├── App.jsx
└── main.jsx


---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/frontend-surotec.git
cd frontend-surotec
2. Instalar dependencias
npm install
Variables de Entorno

Crear un archivo .env en la raíz del proyecto.

Si utilizas Vite:

VITE_API_BASE_URL=http://localhost:8085/api
VITE_LOGIN_ENDPOINT=/auth/login
VITE_STUDENT_ENDPOINT=/student
VITE_ADMIN_ENDPOINT=/admin

Ajustar las rutas según la configuración del backend.

Ejecución del Proyecto

Si utilizas Vite:
npm run dev

Aplicación disponible en:
http://localhost:5173

Si utilizas Create React App:
npm start

Aplicación disponible en:
http://localhost:3000
Requisitos

Node.js 18+
Backend en ejecución (ejemplo: puerto 8085)
Base de datos MySQL activa

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return registry -> registry
            .addMapping("/**")
            .allowedOrigins("http://localhost:5173")
            .allowedMethods("*");
    }
}

Estado del Proyecto
Landing page funcional
Sistema de autenticación implementado
Dashboards por rol implementados
Integración completa con backend y base de datos

Equipo de Desarrollo:
Gabriela Montilla – Full Stack Developer
Juan Sebastian Usuga – Full Stack Developer
Samuel Ospina – Full Stack Developer
Esteban Castaño – Full Stack Developer
Samuel Alvarez – Full Stack Developer
Lorena Mejia – Full Stack Developer

Licencia

Proyecto académico – Surotec 2026.
