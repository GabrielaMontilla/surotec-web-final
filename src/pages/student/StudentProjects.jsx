// src/pages/student/StudentProjects.jsx
import React, { useState, useEffect } from "react";
import "./StudentProjects.css";
import {
  BookOpen, Search, Clock, CheckCircle, ExternalLink,
  MessageCircle, Upload, Loader2, AlertCircle, X, Plus,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { getProjects, createProject } from "../../services/api";

/* ─── Helpers ───────────────────────────────────────────────────── */
const toRawGithub = (url) => {
  if (!url) return null;
  return url
    .replace("https://github.com/", "https://raw.githubusercontent.com/")
    .replace("/blob/", "/");
};

const statusLabel = (status) => {
  const s = (status ?? "").toUpperCase();
  if (s === "PUBLISHED") return "Aprobado";
  if (s === "DRAFT")     return "Pendiente";
  if (s === "ARCHIVED")  return "Archivado";
  return status;
};

const statusClass = (status) => {
  const s = (status ?? "").toUpperCase();
  if (s === "PUBLISHED") return "status--approved";
  if (s === "ARCHIVED")  return "status--review";
  return "status--pending";
};

/* ─── ADMIN_EMPLOYEE_ID ─────────────────────────────────────────────
   Según tu BD, Gabriela (employee_id=1) es Admin y revisará los
   proyectos que envíen los estudiantes. Cambia este valor si
   quieres asignarlo a otro empleado admin.
   ─────────────────────────────────────────────────────────────── */
const ADMIN_EMPLOYEE_ID = 1;

/* ─── Modal Ver Detalles / Enviar ───────────────────────────────── */
function ProjectModal({ project, onClose }) {
  const isPending = (project?.status ?? "").toUpperCase() === "DRAFT";

  return (
    <div className="sp-modal-overlay" onClick={onClose}>
      <motion.div
        className="sp-modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <div className="sp-modal-header">
          <h2 className="sp-modal-title">
            {isPending ? "Enviar Proyecto" : "Detalles del Proyecto"}
          </h2>
          <button className="sp-modal-close" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="sp-modal-body">
          <div className="sp-modal-project-info">
            <h4 className="sp-modal-project-title">{project?.title}</h4>
            <p className="sp-modal-project-desc">{project?.description}</p>
          </div>

          {isPending ? (
            <form onSubmit={(e) => { e.preventDefault(); toast.success("Enviado a revisión"); onClose(); }} className="sp-form">
              <div className="sp-form-group">
                <label className="sp-label">URL del Repositorio (GitHub)</label>
                <input type="url" required placeholder="https://github.com/usuario/proyecto" className="sp-input" />
              </div>
              <div className="sp-form-group">
                <label className="sp-label">URL de Demo (Opcional)</label>
                <input type="url" placeholder="https://proyecto-demo.vercel.app" className="sp-input" />
              </div>
              <div className="sp-form-group">
                <label className="sp-label">Comentarios para el instructor</label>
                <textarea rows={3} className="sp-textarea" placeholder="Explica brevemente los desafíos o características especiales..." />
              </div>
              <button type="submit" className="sp-btn-submit">Confirmar Entrega</button>
            </form>
          ) : (
            <div className="sp-modal-status-box">
              <p className="sp-modal-status-label">Estado de la Revisión</p>
              <div className="sp-modal-status-row">
                <CheckCircle size={20} className={(project?.status ?? "").toUpperCase() === "PUBLISHED" ? "sp-icon--green" : "sp-icon--gray"} />
                <span>
                  {(project?.status ?? "").toUpperCase() === "PUBLISHED"
                    ? "Proyecto aprobado por el instructor."
                    : "Tu proyecto está siendo revisado."}
                </span>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Modal Crear Proyecto ──────────────────────────────────────── */
function CreateProjectModal({ onClose, onCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    caption: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Envía el proyecto con employeeId del admin para que lo revise
      // status DRAFT por defecto — el admin lo cambia a PUBLISHED
      const payload = {
        employeeId: ADMIN_EMPLOYEE_ID,
        title:       form.title,
        description: form.description,
        imageUrl:    form.imageUrl  || null,
        caption:     form.caption   || null,
        status:      "DRAFT",
      };

      await createProject(payload);
      toast.success("¡Proyecto enviado! El administrador lo revisará pronto.");
      onCreated(); // refresca la lista
      onClose();
    } catch (err) {
      toast.error(`No se pudo enviar: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="sp-modal-overlay" onClick={onClose}>
      <motion.div
        className="sp-modal sp-modal--wide"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="sp-modal-header">
          <div className="sp-modal-header-left">
            <div className="sp-modal-icon">
              <Plus size={18} />
            </div>
            <div>
              <h2 className="sp-modal-title">Nuevo Proyecto</h2>
              <p className="sp-modal-subtitle">Lo revisará el equipo de Surotec antes de publicarlo.</p>
            </div>
          </div>
          <button className="sp-modal-close" onClick={onClose}><X size={20} /></button>
        </div>

        {/* Formulario */}
        <div className="sp-modal-body">
          <form onSubmit={handleSubmit} className="sp-form">

            <div className="sp-form-group">
              <label className="sp-label">Título del Proyecto <span className="sp-required">*</span></label>
              <input
                type="text"
                name="title"
                required
                maxLength={200}
                placeholder="Ej: Landing Page con React"
                className="sp-input"
                value={form.title}
                onChange={handleChange}
              />
            </div>

            <div className="sp-form-group">
              <label className="sp-label">Descripción <span className="sp-required">*</span></label>
              <textarea
                name="description"
                required
                rows={4}
                className="sp-textarea"
                placeholder="Explica de qué trata tu proyecto, qué tecnologías usaste y qué aprendiste..."
                value={form.description}
                onChange={handleChange}
              />
            </div>

            <div className="sp-form-row">
              <div className="sp-form-group">
                <label className="sp-label">URL de Imagen (Opcional)</label>
                <input
                  type="url"
                  name="imageUrl"
                  placeholder="https://raw.githubusercontent.com/..."
                  className="sp-input"
                  value={form.imageUrl}
                  onChange={handleChange}
                />
              </div>
              <div className="sp-form-group">
                <label className="sp-label">Caption de Imagen (Opcional)</label>
                <input
                  type="text"
                  name="caption"
                  maxLength={200}
                  placeholder="Descripción breve de la imagen"
                  className="sp-input"
                  value={form.caption}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Info de flujo */}
            <div className="sp-create-info">
              <div className="sp-create-info-dot sp-create-info-dot--yellow" />
              <p>Tu proyecto quedará en estado <strong>Pendiente</strong> hasta que el administrador lo apruebe y publique.</p>
            </div>

            <button type="submit" className="sp-btn-submit" disabled={submitting}>
              {submitting
                ? <><Loader2 size={16} className="sp-btn-spinner" /> Enviando...</>
                : <><Plus size={16} /> Enviar Proyecto</>
              }
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── StudentProjects ───────────────────────────────────────────── */
export default function StudentProjects() {
  const [projects, setProjects]               = useState([]);
  const [filtered, setFiltered]               = useState([]);
  const [loading, setLoading]                 = useState(true);
  const [error, setError]                     = useState(null);
  const [search, setSearch]                   = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [showCreate, setShowCreate]           = useState(false);

  const fetchProjects = () => {
    setLoading(true);
    getProjects()
      .then((data) => {
        const visible = data.filter((p) => (p.status ?? "").toUpperCase() !== "ARCHIVED");
        setProjects(visible);
        setFiltered(visible);
      })
      .catch((err) => {
        setError(err.message);
        console.error("❌ Error cargando proyectos:", err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProjects(); }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      projects.filter(
        (p) =>
          (p.title ?? "").toLowerCase().includes(q) ||
          (p.description ?? "").toLowerCase().includes(q)
      )
    );
  }, [search, projects]);

  return (
    <div className="sp-page">

      {/* HEADER */}
      <header className="sp-header">
        <div className="sp-header-text">
          <h1 className="sp-title">Mis Proyectos</h1>
          <p className="sp-subtitle">Gestiona tus entregas y revisa el feedback de tus instructores.</p>
        </div>

        <div className="sp-header-actions">
          {/* Buscador */}
          <div className="sp-search-wrapper">
            <Search size={16} className="sp-search-icon" />
            <input
              type="text"
              placeholder="Buscar proyecto..."
              className="sp-search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Botón Nuevo Proyecto */}
          <button
            className="sp-btn-new"
            onClick={() => setShowCreate(true)}
          >
            <Plus size={16} />
            Nuevo Proyecto
          </button>
        </div>
      </header>

      {/* ESTADOS */}
      {loading && (
        <div className="sp-loading">
          <Loader2 size={24} className="sp-spinner" />
          <span>Cargando proyectos...</span>
        </div>
      )}
      {!loading && error && (
        <div className="sp-error">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}
      {!loading && !error && filtered.length === 0 && (
        <div className="sp-empty">
          <BookOpen size={32} />
          <p>No se encontraron proyectos.</p>
          <button className="sp-btn-new" onClick={() => setShowCreate(true)}>
            <Plus size={15} /> Crear tu primer proyecto
          </button>
        </div>
      )}

      {/* GRID */}
      {!loading && !error && filtered.length > 0 && (
        <div className="sp-grid">
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout
              className="sp-card"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              {(project.imageUrl ?? project.image_url) && (
                <div className="sp-card-image">
                  <img
                    src={toRawGithub(project.imageUrl ?? project.image_url)}
                    alt={project.caption ?? project.title ?? "Proyecto"}
                  />
                </div>
              )}

              <div className="sp-card-body">
                <div className="sp-card-top">
                  <span className="sp-tag">{project.caption ?? "Proyecto"}</span>
                  <span className={`sp-status ${statusClass(project.status)}`}>
                    {(project.status ?? "").toUpperCase() === "PUBLISHED"
                      ? <CheckCircle size={11} />
                      : <Clock size={11} />
                    }
                    {statusLabel(project.status)}
                  </span>
                </div>
                <h3 className="sp-card-title">{project.title}</h3>
                <p className="sp-card-desc">{project.description ?? "Sin descripción."}</p>
              </div>

              <div className="sp-card-meta">
                <div className="sp-meta-row">
                  <span>Publicado:</span>
                  <span className="sp-meta-value">
                    {project.publishDate ?? project.publish_date
                      ? new Date(project.publishDate ?? project.publish_date).toLocaleDateString("es-CO")
                      : "Sin fecha"}
                  </span>
                </div>
              </div>

              <div className="sp-card-actions">
                <button className="sp-btn-primary" onClick={() => setSelectedProject(project)}>
                  {(project.status ?? "").toUpperCase() === "DRAFT"
                    ? <><Upload size={15} /> Enviar Proyecto</>
                    : <><ExternalLink size={15} /> Ver Detalles</>
                  }
                </button>
                <button className="sp-btn-icon" onClick={() => toast.info("Abriendo mensajes...")}>
                  <MessageCircle size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* MODALES */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
        {showCreate && (
          <CreateProjectModal
            onClose={() => setShowCreate(false)}
            onCreated={fetchProjects}
          />
        )}
      </AnimatePresence>
    </div>
  );
}