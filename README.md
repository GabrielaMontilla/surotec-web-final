Plataforma Web Surotec – Frontend

Este repositorio contiene el frontend de la Plataforma Web Surotec, desarrollado en React con JavaScript.

La aplicación incluye:

Landing page pública informativa
Sistema interno con autenticación
Dashboard para estudiantes
Dashboard para administradores
Integración con backend desarrollado en Java (OOP)
Conexión con base de datos MySQL

Descripción del Proyecto

Surotec es una organización que trabaja para transformar vidas a través de la tecnología, la educación y la cultura, formando jóvenes de la ruralidad en herramientas digitales para que puedan acceder a oportunidades laborales sin abandonar sus territorios.

La plataforma web desarrollada permite:
Visualizar información institucional (landing pública)
Autenticación de usuarios por roles
Publicación de proyectos por parte de estudiantes
Gestión y supervisión de comunidad por parte del administrador
Centralización y seguimiento del talento formado

Arquitectura General
Frontend (React + JavaScript)
Comunicación HTTP (REST API)
Backend (Java – Programación Orientada a Objetos)
Base de Datos MySQL

El frontend consume los endpoints expuestos por el backend para autenticación, gestión de usuarios y gestión de proyectos.

Tecnologías Utilizadas
Frontend
React
JavaScript (ES6+)
React Router DOM
Axios o Fetch API
CSS / Tailwind (si aplica)

Backend (Repositorio independiente)
Java
Programación Orientada a Objetos (OOP)
Spring Boot 
MySQL

Módulos del Sistema
1. Landing Page (Pública)
Secciones principales:
Inicio
Quiénes Somos
Noticias
Contacto
Quiero Inscribirme

Incluye:
Propósito institucional
Problemática rural (Educación, Empleo, Desarrollo Rural)
Propuesta de valor.

2. Sistema Interno (Privado)
Autenticación
Inicio de sesión
Validación contra backend
Control de acceso por roles (Admin / Estudiante)
Dashboard Estudiante

Funcionalidades:
Visualizar perfil
Subir proyectos
Consultar estado de proyectos
Visualizar impacto generado
Dashboard Administrador

Funcionalidades:
Gestión de usuarios
Visualización de proyectos
Supervisión general de la comunidad
Control administrativo
Estructura del Proyecto

/src
├── assets/
├── components/
│ ├── landing/
│ ├── auth/
│ ├── dashboard/
│ └── shared/
├── pages/
│ ├── Home.jsx
│ ├── Login.jsx
│ ├── StudentDashboard.jsx
│ └── AdminDashboard.jsx
├── services/
│ ├── api.js
│ ├── authService.js
│ └── projectService.js
├── routes/
│ └── ProtectedRoute.jsx
├── App.jsx
└── main.jsx

Instalación
Clonar el repositorio
git clone https://github.com/tu-organizacion/frontend-surotec.git

cd frontend-surotec
Instalar dependencias

npm install

Variables de Entorno
Crear un archivo .env en la raíz del proyecto:

Para Vite:
VITE_API_BASE_URL=http://localhost:8080/api

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
Conexión con Backend

El backend debe estar ejecutándose en el puerto configurado (8085) y la base de datos MySQL activa.


El sistema implementa:

Control de acceso basado en roles
Validación de autenticación
Componente ProtectedRoute para restringir acceso a dashboards
Problemas Comunes
Error CORS

Asegurarse de habilitar CORS en el backend:

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
Landing Page funcional
Sistema de autenticación implementado
Dashboard Estudiante funcional
Dashboard Admin funcional
Integración con backend y base de datos


Equipo de Desarrollo

Gabriela Montilla – Full Stack Developer
Juan Sebastian Usuga – Full Stack Developer
Samuel Ospina – Full Stack Developer
Esteban Castaño – Full Stack Developer
Samuel Alvarez – Full Stack Developer
Lorena Mejia – Full Stack Developer

Licencia

Proyecto académico – Surotec 2026.
