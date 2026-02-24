// src/pages/student/StudentDashboard.jsx
import React, { useState } from "react";
import "./StudentDashboard.css";
import { useStudentData } from "../../services/useStudentData";
import {
  BookOpen, Trophy, Clock, ArrowRight, Star,
  CheckCircle2, ChevronLeft, ChevronRight, X,
  Loader2, AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

const DAYS_OF_WEEK = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MONTHS = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

function CalendarModal({ onClose }) {
  const today = new Date();
  const [current, setCurrent] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [selected, setSelected] = useState(null);
  const { year, month } = current;
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrent(({ year, month }) =>
    month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 }
  );
  const nextMonth = () => setCurrent(({ year, month }) =>
    month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 }
  );
  const isToday = (day) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div className="modal" onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <div className="modal-header">
          <h2 className="modal-title">Calendario Académico</h2>
          <button className="modal-close" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="cal-nav">
          <button className="cal-nav-btn" onClick={prevMonth}><ChevronLeft size={18} /></button>
          <span className="cal-month-label">{MONTHS[month]} {year}</span>
          <button className="cal-nav-btn" onClick={nextMonth}><ChevronRight size={18} /></button>
        </div>
        <div className="cal-weekdays">
          {DAYS_OF_WEEK.map((d) => <div key={d} className="cal-weekday">{d}</div>)}
        </div>
        <div className="cal-grid">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`e-${i}`} className="cal-cell cal-cell--empty" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            return (
              <div key={day}
                className={["cal-cell", isToday(day) ? "cal-cell--today" : "", selected === day ? "cal-cell--selected" : ""].join(" ")}
                onClick={() => setSelected(selected === day ? null : day)}
              >
                <span className="cal-day-number">{day}</span>
              </div>
            );
          })}
        </div>
        <AnimatePresence>
          {selected && (
            <motion.div className="cal-detail"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <p className="cal-detail-date">{selected} de {MONTHS[month]}, {year}</p>
              <p className="cal-detail-empty">Sin eventos este día.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function LoadingCard() {
  return (
    <div className="loading-card">
      <Loader2 size={24} className="loading-spinner" />
      <span>Cargando...</span>
    </div>
  );
}

function ErrorCard({ message }) {
  return (
    <div className="error-card">
      <AlertCircle size={20} />
      <span>{message || "Error al cargar los datos."}</span>
    </div>
  );
}

const USER_ID = 1;

// ↓ Recibe onNavigate para poder cambiar de vista desde el dashboard
export default function StudentDashboard({ onNavigate }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const { data, loading, error } = useStudentData(USER_ID);

  const { user, student, projects, cohort, news } = data;

  const firstName    = user?.firstName ?? user?.first_name ?? "Estudiante";
  const lastName     = user?.lastName  ?? user?.last_name  ?? "";
  const cohortName   = cohort
    ? `Cohorte ${cohort.year} - ${cohort.semester === "FIRST" ? "Primer" : "Segundo"} Semestre`
    : "Sin cohorte asignada";
  const studentStatus = student?.status ?? "ACTIVE";

  const tipoClase = (status) => {
    if (!status) return "info";
    const s = status.toUpperCase();
    if (s === "DRAFT")    return "urgent";
    if (s === "ARCHIVED") return "event";
    return "info";
  };

  return (
    <>
      <div className="dashboard">

        {/* HERO */}
        <section className="dashboard-hero">
          <div className="hero-content">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hero-title"
            >
              ¡Hola de nuevo, {firstName}! 👋
            </motion.h1>
            <p className="hero-subtitle">
              Tienes un gran progreso esta semana. Tu próxima clase comienza en 45 minutos.
            </p>
            <div className="hero-buttons">
              {/* ← Navega a "projects" */}
              <button
                onClick={() => onNavigate?.("projects")}
                className="btn-primary"
              >
                Continuar Aprendiendo
              </button>
              <button onClick={() => setShowCalendar(true)} className="btn-secondary">
                Ver Calendario
              </button>
            </div>
          </div>
        </section>

        {/* STATS */}
        {loading ? <LoadingCard /> : error ? <ErrorCard message={error} /> : (
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon stat-icon--orange"><BookOpen size={22} /></div>
              <div className="stat-info">
                <h3 className="stat-label">Cohorte Actual</h3>
                <p className="stat-sublabel">{cohortName}</p>
                <div className="progress-row">
                  <span className="progress-text">Estado estudiante</span>
                  <span className="progress-value">{studentStatus}</span>
                </div>
                <div className="progress-bar">
                  <motion.div
                    className="progress-fill progress-fill--orange"
                    initial={{ width: 0 }}
                    animate={{ width: studentStatus === "ACTIVE" ? "100%" : "50%" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon stat-icon--green"><Trophy size={22} /></div>
              <div className="stat-info">
                <h3 className="stat-label">{firstName} {lastName}</h3>
                <p className="stat-sublabel">@{user?.username ?? ""}</p>
                <p className="stat-sublabel">{user?.email ?? ""}</p>
                <div className="badges-row">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="badge-icon">
                      <Star size={14} className="star-icon" />
                    </div>
                  ))}
                  <div className="badge-more">+0</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GRID PRINCIPAL */}
        <div className="main-grid">

          {/* PROYECTOS */}
          <div className="main-left">
            <section className="dashboard-section">
              <div className="section-header">
                <h2 className="section-title">Proyectos Académicos</h2>
                {/* ← Navega a "projects" */}
                <button className="section-link" onClick={() => onNavigate?.("projects")}>
                  Ver todos
                </button>
              </div>

              {loading ? <LoadingCard /> : error ? <ErrorCard message={error} /> :
                projects.length === 0 ? (
                  <div className="empty-card">No hay proyectos publicados aún.</div>
                ) : (
                  <div className="projects-list">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className="project-card"
                        onClick={() => onNavigate?.("projects")}
                      >
                        <div className="project-thumbnail">
                          <img
                            src={project.imageUrl ?? project.image_url ?? "https://images.unsplash.com/photo-1758270705172-07b53627dfcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"}
                            alt={project.caption ?? "Proyecto"}
                          />
                        </div>
                        <div className="project-info">
                          <div className="project-header">
                            <h4 className="project-title">{project.title}</h4>
                            <span className="project-tag">{project.status ?? "PUBLISHED"}</span>
                          </div>
                          <p className="project-description">
                            {project.description ?? "Sin descripción."}
                          </p>
                          <div className="project-meta">
                            <span className="project-deadline">
                              <Clock size={13} />
                              {project.publishDate
                                ? new Date(project.publishDate).toLocaleDateString("es-CO")
                                : "Sin fecha"}
                            </span>
                            <span className="project-delivered">
                              <CheckCircle2 size={13} /> Publicado
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              }
            </section>
          </div>

          {/* NOTICIAS + COMUNIDAD */}
          <div className="main-right">
            <section className="dashboard-section">
              <div className="section-header">
                <h2 className="section-title">Últimas Noticias</h2>
                {/* ← Navega a "news" */}
                <button className="section-link" onClick={() => onNavigate?.("news")}>
                  Ver todas
                </button>
              </div>

              {loading ? <LoadingCard /> : error ? <ErrorCard message={error} /> :
                news.length === 0 ? (
                  <div className="empty-card">No hay noticias publicadas.</div>
                ) : (
                  <div className="announcements">
                    {news.slice(0, 3).map((item) => (
                      <div
                        key={item.idNews ?? item.id}
                        className={`announcement-card ${tipoClase(item.status)}`}
                        // ← Navega a "news" al hacer clic en una noticia
                        onClick={() => onNavigate?.("news")}
                      >
                        <div className="announcement-icon">
                          <BookOpen size={18} />
                        </div>
                        <div className="announcement-content">
                          <h3>{item.title}</h3>
                          <span>
                            {item.publishDate
                              ? new Date(item.publishDate).toLocaleDateString("es-CO")
                              : ""}
                          </span>
                        </div>
                        <ArrowRight size={18} className="arrow-icon" />
                      </div>
                    ))}
                  </div>
                )
              }

              {/* ← Botón "Ver Todas" navega a news */}
              <button className="btn-ghost" onClick={() => onNavigate?.("news")}>
                Ver Todas las Noticias
              </button>
            </section>

            <section className="community-card">
              <h3 className="community-title">Comunidad</h3>
              <p className="community-subtitle">
                Únete a nuestro canal de Discord y conecta con otros estudiantes.
              </p>
              <button className="btn-community" onClick={() => window.open("https://discord.com", "_blank")}>
                Unirse Ahora
              </button>
            </section>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showCalendar && <CalendarModal onClose={() => setShowCalendar(false)} />}
      </AnimatePresence>
    </>
  );
}