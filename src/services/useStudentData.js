import { useState, useEffect } from "react";
import {
  getUserById,
  getAllStudents,
  getNews,
  getProjects,
  getCohorts,
} from "./api";

export function useStudentData(idUser) {
  const [data, setData] = useState({
    user: null,       // UserDto  → first_name, last_name, email, username...
    student: null,    // StudentDto → id, id_user, status...
    projects: [],     // AcademyProjectDto[] (proyectos académicos publicados)
    cohort: null,     // CohortDto de la cohorte actual
    news: [],         // NewsDto[] publicadas
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idUser) return;

    setLoading(true);
    setError(null);

    Promise.all([
      getUserById(idUser),   // trae el user
      getAllStudents(),       // trae todos los students para filtrar
      getNews(),             // noticias PUBLISHED
      getProjects(),         // proyectos académicos
      getCohorts(),          // todas las cohortes
    ])
      .then(([user, students, news, projects, cohorts]) => {

        // Busca el student cuyo id_user coincide con nuestro idUser
        // Tu StudentDto probablemente tenga: idUser o id_user
        const student = students.find(
          (s) => s.idUser === idUser || s.id_user === idUser
        );

        // Filtra solo proyectos PUBLISHED
        const publishedProjects = projects.filter(
          (p) =>
            (p.status ?? p.estado ?? "").toUpperCase() === "PUBLISHED"
        );

        // Por ahora toma la primera cohorte activa (ajusta cuando
        // la BD tenga relación student ↔ cohort)
        const cohort = cohorts[0] ?? null;

        setData({
          user,
          student,
          projects: publishedProjects,
          cohort,
          news,
        });
      })
      .catch((err) => {
        setError(err.message);
        console.error("❌ Error cargando datos del dashboard:", err);
      })
      .finally(() => setLoading(false));

  }, [idUser]);

  return { data, loading, error };
}