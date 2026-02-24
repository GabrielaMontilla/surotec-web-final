// src/pages/student/StudentNews.jsx
import React, { useState, useEffect } from "react";
import "./StudentNews.css";
import {
  Newspaper, Search, Calendar, ArrowRight,
  Loader2, AlertCircle, X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getNews } from "../../services/api";

/* ─── Helpers ───────────────────────────────────────────────────── */
const toRawGithub = (url) => {
  if (!url) return null;
  return url
    .replace("https://github.com/", "https://raw.githubusercontent.com/")
    .replace("/blob/", "/");
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("es-CO", {
    year: "numeric", month: "short", day: "numeric",
  });
};

// Ordena noticias de más reciente a más antigua
const sortByDate = (items) =>
  [...items].sort((a, b) => {
    const dateA = new Date(a.publishDate ?? a.publish_date ?? 0);
    const dateB = new Date(b.publishDate ?? b.publish_date ?? 0);
    return dateB - dateA; // descendente
  });

// Extrae la URL de imagen sin importar cómo la llame Spring Boot
const getImageUrl = (item) =>
  item.urlImage ?? null;

/* ─── Modal ─────────────────────────────────────────────────────── */
function NewsModal({ item, onClose }) {
  const imageUrl = toRawGithub(getImageUrl(item));

  return (
    <div className="sn-modal-overlay" onClick={onClose}>
      <motion.div
        className="sn-modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {imageUrl && (
          <div className="sn-modal-image">
            <img src={imageUrl} alt={item.title} />
          </div>
        )}
        <div className="sn-modal-header">
          <span className="sn-modal-date">
            <Calendar size={13} />
            {formatDate(item.publishDate)}
          </span>
          <button className="sn-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="sn-modal-body">
          <h2 className="sn-modal-title">{item.title}</h2>
          <p className="sn-modal-content">{item.content}</p>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── StudentNews ───────────────────────────────────────────────── */
export default function StudentNews() {
  const [news, setNews]         = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [search, setSearch]     = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setLoading(true);
    getNews()
      .then((data) => {
        const sorted = sortByDate(data); // ← más reciente primero
        setNews(sorted);
        setFiltered(sorted);
      })
      .catch((err) => {
        setError(err.message);
        console.error("❌ Error cargando noticias:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    const results = news.filter(
      (n) =>
        (n.title ?? "").toLowerCase().includes(q) ||
        (n.content ?? "").toLowerCase().includes(q)
    );
    setFiltered(sortByDate(results)); // mantiene el orden al buscar
  }, [search, news]);

  // La más reciente siempre es la destacada
  const featured = filtered[0] ?? null;
  const rest     = filtered.slice(1);

  return (
    <div className="sn-page">

      {/* HEADER */}
      <header className="sn-header">
        <div className="sn-header-text">
          <h1 className="sn-title">Noticias y Novedades</h1>
          <p className="sn-subtitle">
            Mantente al tanto de todo lo que sucede en la comunidad educativa.
          </p>
        </div>
        <div className="sn-header-actions">
          <div className="sn-search-wrapper">
            <Search size={16} className="sn-search-icon" />
            <input
              type="text"
              placeholder="Buscar noticia..."
              className="sn-search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </header>

      {loading && (
        <div className="sn-loading">
          <Loader2 size={24} className="sn-spinner" />
          <span>Cargando noticias...</span>
        </div>
      )}

      {!loading && error && (
        <div className="sn-error">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="sn-empty">
          <Newspaper size={32} />
          <p>No se encontraron noticias publicadas.</p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="sn-grid">

          {/* DESTACADA — la más reciente */}
          {featured && (
            <div className="sn-featured" onClick={() => setSelected(featured)}>
              <div className="sn-featured-image">
                <img
                  src={
                    toRawGithub(getImageUrl(featured)) ??
                    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
                  }
                  alt={featured.title}
                />
              </div>
              <div className="sn-featured-overlay" />
              <div className="sn-featured-content">
                <span className="sn-featured-badge">Más Reciente</span>
                <h2 className="sn-featured-title">{featured.title}</h2>
                <p className="sn-featured-excerpt">
                  {(featured.content ?? "").slice(0, 140)}
                  {(featured.content ?? "").length > 140 ? "..." : ""}
                </p>
                <div className="sn-featured-footer">
                  <span className="sn-featured-date">
                    <Calendar size={13} />
                    {formatDate(featured.publishDate)}
                  </span>
                  <button className="sn-featured-link">
                    LEER MÁS <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* RESTO */}
          {rest.map((item) => (
            <motion.div
              key={item.idNews}
              className="sn-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => setSelected(item)}
            >
              {getImageUrl(item) && (
                <div className="sn-card-image">
                  <img
                    src={toRawGithub(getImageUrl(item))}
                    alt={item.title}
                  />
                </div>
              )}
              <div className="sn-card-body">
                <div className="sn-card-top">
                  <span className="sn-tag">Noticia</span>
                  <span className="sn-date">
                    <Calendar size={11} />
                    {formatDate(item.publishDate)}
                  </span>
                </div>
                <h3 className="sn-card-title">{item.title}</h3>
                <p className="sn-card-excerpt">
                  {(item.content ?? "").slice(0, 100)}
                  {(item.content ?? "").length > 100 ? "..." : ""}
                </p>
                <button className="sn-card-link">
                  LEER ARTÍCULO <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selected && (
          <NewsModal item={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}