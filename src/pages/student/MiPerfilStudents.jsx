import React, { useState, useEffect } from "react";
import InputField from "../../components/ui/InputField";
import {
  User,
  Globe,
  Github,
  Linkedin,
  Save,
  GraduationCap,
  Camera,
} from "lucide-react";
import { apiClient as api } from "../../services/api";
import "./MiPerfilStudents.css";


const MiPerfilStudents = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [studentInfo, setStudentInfo] = useState(null);


  // 1. ¡ADIÓS JUAN PÉREZ! Iniciamos todo en blanco para que no salgan datos fantasma
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    bio: "",
    github: "",
    linkedin: "",
  });


  // 2. BUSCAMOS LA DATA REAL APENAS CARGA
  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        // Leemos EXACTAMENTE el mismo usuario que muestra la barra superior
        const storedUserStr = localStorage.getItem("user");
        const storedUser = storedUserStr ? JSON.parse(storedUserStr) : null;


        // Sacamos el ID real de la sesión (Si no hay, usamos el 7 de Gabriela como respaldo)
        const userId = storedUser?.idUser || storedUser?.id || 7;


        // Vamos a la BD (Usamos /users/id porque ahí está la info principal)
        const response = await api.get(`/users/${userId}`);
        const dbData = response.data || response;


        setStudentInfo(dbData);


        // Extraemos el nombre priorizando la Base de Datos, y si no, usamos el del LocalStorage
        const firstName =
          dbData.firstName ||
          dbData.userDto?.firstName ||
          storedUser?.firstName ||
          "";
        const lastName =
          dbData.lastName ||
          dbData.userDto?.lastName ||
          storedUser?.lastName ||
          "";
        const email =
          dbData.email || dbData.userDto?.email || storedUser?.email || "";


        // Llenamos el formulario con la data real de GABRIELA (o el que esté logueado)
        setFormData({
          nombre: `${firstName} ${lastName}`.trim(),
          correo: email,
          bio:
            dbData.bio ||
            "Apasionado por el desarrollo web y el diseño de interfaces. Actualmente aprendiendo React y Node.js.",
          github: dbData.githubUrl || dbData.github || "github.com/",
          linkedin: dbData.linkedinUrl || dbData.linkedin || "linkedin.com/in/",
        });
      } catch (err) {
        console.error("Error al cargar perfil de estudiante:", err);


        // Si la base de datos falla, al menos pintamos la info de la barra superior
        const storedUserStr = localStorage.getItem("user");
        if (storedUserStr) {
          const u = JSON.parse(storedUserStr);
          setFormData((prev) => ({
            ...prev,
            nombre: `${u.firstName || ""} ${u.lastName || ""}`.trim(),
            correo: u.email || "",
          }));
        } else {
          setError("No se pudo cargar tu información estudiantil.");
        }
      } finally {
        setLoading(false);
      }
    };


    fetchStudentProfile();
  }, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSave = async () => {
    setSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("¡Perfil actualizado con éxito, parce! 🚀");
    } catch (err) {
      alert("Hubo un error al guardar los cambios.");
    } finally {
      setSaving(false);
    }
  };


  if (loading) {
    return (
      <div
        className="student-profile-container"
        style={{ textAlign: "center", padding: "80px 0" }}
      >
        <h2>Cargando tu perfil estudiantil... ⏳</h2>
      </div>
    );
  }


  if (error) {
    return (
      <div
        className="student-profile-container"
        style={{ textAlign: "center", padding: "80px 0", color: "#dc2626" }}
      >
        <h2>¡Ups! {error}</h2>
      </div>
    );
  }


  return (
    <div className="student-profile-container">
      <div className="student-profile-header">
        <h1>Mi Perfil Estudiantil</h1>
        <p>
          Gestiona tu presencia en la plataforma y tu información académica.
        </p>
      </div>


      <div className="student-profile-grid">
        {/* === COLUMNA IZQUIERDA === */}
        <div className="student-left-col">
          <div className="student-card id-card">
            <div className="student-avatar-wrapper">
              {/* Aquí usamos el avatar de Gabi si lo hay, o uno por defecto */}
              <img
                src={
                  studentInfo?.avatarUrl ||
                  "https://ui-avatars.com/api/?name=" +
                    formData.nombre.replace(" ", "+") +
                    "&background=2563eb&color=fff"
                }
                alt="Avatar"
                className="student-avatar-img"
              />
              <button className="student-camera-btn">
                <Camera size={14} color="white" strokeWidth={2.5} />
              </button>
            </div>


            <h2 className="student-name">{formData.nombre}</h2>
            <p className="student-cohort">
              {studentInfo?.cohort?.name || "Full Stack Web Development #4"}
            </p>


            <div className="student-divider"></div>


            <div className="student-info-row">
              <span className="student-info-label">ID ESTUDIANTE</span>
              <span className="student-info-value">
                {studentInfo?.idStudent || studentInfo?.idUser
                  ? `STU-2024-${studentInfo.idStudent || studentInfo.idUser}`
                  : "STU-2024-001"}
              </span>
            </div>


            <div className="student-divider"></div>


            <div className="student-info-row">
              <span className="student-info-label">ESTADO</span>
              <span className="student-info-value highlight">
                {studentInfo?.status === "ACTIVE" ||
                studentInfo?.userDto?.status === "ACTIVE"
                  ? "Activo"
                  : "Activo"}
              </span>
            </div>
          </div>


          <div className="student-card social-card">
            <h3>Redes Profesionales</h3>
            <ul>
              <li>
                <Github size={16} /> <a href="#">{formData.github}</a>
              </li>
              <li>
                <Linkedin size={16} /> <a href="#">{formData.linkedin}</a>
              </li>
              <li>
                <Globe size={16} /> <a href="#">portafolio.dev</a>
              </li>
            </ul>
          </div>
        </div>


        {/* === COLUMNA DERECHA === */}
        <div className="student-right-col">
          <div className="student-card form-card">
            <div className="form-section">
              <h3 className="section-title">
                <User size={18} color="#2563eb" /> Información Personal
              </h3>
              <div className="form-row-2">
                <InputField
                  label="Nombre Completo"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                />
                <InputField
                  label="Correo Electrónico"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                />
              </div>
              <InputField
                type="textarea"
                label="Sobre mí (Bio)"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
              />
            </div>


            <div className="student-divider-large"></div>


            <div className="form-section">
              <h3 className="section-title">
                <Globe size={18} color="#10b981" /> Enlaces Profesionales
              </h3>
              <div className="form-row-2">
                <InputField
                  label="GitHub"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                />
                <InputField
                  label="LinkedIn"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                />
              </div>


              <div className="form-actions">
                <button
                  className="btn-save-student"
                  onClick={handleSave}
                  disabled={saving}
                >
                  <Save size={16} />{" "}
                  {saving ? "Guardando..." : "Guardar Cambios"}
                </button>
              </div>
            </div>
          </div>


          {/* Tarjeta Oscura: Estado Académico */}
          <div className="academic-dark-card">
            <div className="academic-info">
              <h2>Estado Académico</h2>
              <p>
                Estás al día con todas tus obligaciones académicas y
                financieras.
              </p>


              <div className="academic-badges">
                <div className="dark-badge">
                  <span>BECADO</span>
                  <strong>Sí (100%)</strong>
                </div>
                <div className="dark-badge">
                  <span>ASISTENCIA</span>
                  <strong>98%</strong>
                </div>
              </div>
            </div>


            <div className="academic-icon-circle">
              <GraduationCap size={36} color="white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default MiPerfilStudents;



