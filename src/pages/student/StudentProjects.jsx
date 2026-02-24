// src/pages/student/StudentProjects.jsx
import React, { useState, useEffect } from "react";
import "./StudentProjects.css";
import {
  BookOpen,
  Search,
  Clock,
  CheckCircle,
  ExternalLink,
  MessageCircle,
  Upload,
  Loader2,
  AlertCircle,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { getProjects } from "../../services/api";

/* ─── Helpers ───────────────────────────────────────────────────── */
const toRawGithub = (url) => {
  if (!url) return null;
  return url
    .replace("https://github.com/", "https://raw.githubusercontent.com/")
    .replace("/blob/", "/");
};

const statusLabel = (status) => {
  if (!status) return "Pendiente";
  const s = status.toUpperCase();
  if (s === "PUBLISHED") return "Aprobado";
  if (s === "DRAFT")     return "Pendiente";
  if (s === "ARCHIVED")  return "Archivado";
  return status;
};

const statusClass = (status) => {
  if (!status) return "status--pending";
  const s = status.toUpperCase();
  if (s === "PUBLISHED") return "status--approved";
  if (s === "DRAFT")     return "status--pending";
  if (s === "ARCHIVED")  return "status--review";
  return "status--pending";
};

/* ─── Modal ─────────────────────────────────────────────────────── */
function ProjectModal({ project, onClose }) {
  const isPending = (project?.status ?? "").toUpperCase() === "DRAFT";

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Proyecto enviado a revisión correctamente");
    onClose();
  };

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
        {/* Header */}
        <div className="sp-modal-header">
          <h2 className="sp-modal-title">
            {isPending ? "Enviar Proyecto" : "Detalles del Proyecto"}
          </h2>
          <button className="sp-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Contenido */}
        <div className="sp-modal-body">
          <div className="sp-modal-project-info">
            <h4 className="sp-modal-project-title">{project?.title ?? project?.titulo}</h4>
            <p className="sp-modal-project-desc">{project?.description ?? project?.descripcion}</p>
          </div>

          {isPending ? (
            <form onSubmit={handleSubmit} className="sp-form">
              <div className="sp-form-group">
                <label className="sp-label">URL del Repositorio (GitHub)</label>
                <input
                  type="url"
                  required
                  placeholder="https://github.com/usuario/proyecto"
                  className="sp-input"
                />
              </div>
              <div className="sp-form-group">
                <label className="sp-label">URL de Demo (Opcional)</label>
                <input
                  type="url"
                  placeholder="https://proyecto-demo.vercel.app"
                  className="sp-input"
                />
              </div>
              <div className="sp-form-group">
                <label className="sp-label">Comentarios para el instructor</label>
                <textarea
                  rows={3}
                  className="sp-textarea"
                  placeholder="Explica brevemente los desafíos o características especiales..."
                />
              </div>
              <button type="submit" className="sp-btn-submit">
                Confirmar Entrega
              </button>
            </form>
          ) : (
            <div className="sp-modal-status-box">
              <p className="sp-modal-status-label">Estado de la Revisión</p>
              <div className="sp-modal-status-row">
                <CheckCircle
                  size={20}
                  className={
                    (project?.status ?? "").toUpperCase() === "PUBLISHED"
                      ? "sp-icon--green"
                      : "sp-icon--gray"
                  }
                />
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

/* ─── StudentProjects ───────────────────────────────────────────── */
export default function StudentProjects() {
  const [projects, setProjects]       = useState([]);
  const [filtered, setFiltered]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [search, setSearch]           = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  /* Fetch proyectos PUBLISHED del backend */
  useEffect(() => {
    setLoading(true);
    getProjects()
      .then((data) => {
        // Solo mostramos los publicados
        const published = data.filter(
          (p) => (p.status ?? "").toUpperCase() !== "ARCHIVED"
        );
        setProjects(published);
        setFiltered(published);
      })
      .catch((err) => {
        setError(err.message);
        console.error("❌ Error cargando proyectos:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  /* Filtro por búsqueda */
  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      projects.filter(
        (p) =>
          (p.title ?? p.titulo ?? "").toLowerCase().includes(q) ||
          (p.description ?? p.descripcion ?? "").toLowerCase().includes(q)
      )
    );
  }, [search, projects]);

  return (
    <div className="sp-page">

      {/* HEADER */}
      <header className="sp-header">
        <div className="sp-header-text">
          <h1 className="sp-title">Mis Proyectos</h1>
          <p className="sp-subtitle">
            Gestiona tus entregas y revisa el feedback de tus instructores.
          </p>
        </div>
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
        </div>
      )}

      {/* GRID DE PROYECTOS */}
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
              {/* Imagen */}
              {(project.imageUrl ?? project.image_url) && (
                <div className="sp-card-image">
                  <img
                    src={toRawGithub(project.imageUrl ?? project.image_url)}
                    alt={project.caption ?? project.title ?? "Proyecto"}
                  />
                </div>
              )}

              {/* Info */}
              <div className="sp-card-body">
                <div className="sp-card-top">
                  <span className="sp-tag">
                    {project.caption ?? "Proyecto"}
                  </span>
                  <span className={`sp-status ${statusClass(project.status)}`}>
                    {(project.status ?? "").toUpperCase() === "PUBLISHED"
                      ? <CheckCircle size={11} />
                      : <Clock size={11} />
                    }
                    {statusLabel(project.status)}
                  </span>
                </div>

                <h3 className="sp-card-title">
                  {project.title ?? project.titulo}
                </h3>
                <p className="sp-card-desc">
                  {project.description ?? project.descripcion ?? "Sin descripción."}
                </p>
              </div>

              {/* Meta */}
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

              {/* Acciones */}
              <div className="sp-card-actions">
                <button
                  className="sp-btn-primary"
                  onClick={() => setSelectedProject(project)}
                >
                  {(project.status ?? "").toUpperCase() === "DRAFT"
                    ? <><Upload size={15} /> Enviar Proyecto</>
                    : <><ExternalLink size={15} /> Ver Detalles</>
                  }
                </button>
                <button
                  className="sp-btn-icon"
                  onClick={() => toast.info("Abriendo mensajes del proyecto...")}
                >
                  <MessageCircle size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}