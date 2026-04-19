import { useState } from "react";
import { useTareas } from "../context/TareasContext";
import TareaCard from "../components/tareaCard";

export default function Inicio() {
  const { tareas } = useTareas();

  // Estado local para el filtro activo
  const [filtro, setFiltro] = useState("todas"); // 'todas' | 'pendientes' | 'completadas'

  // Filtrar tareas según el estado activo
  const tareasFiltradas = tareas.filter((t) => {
    if (filtro === "pendientes") return !t.completada;
    if (filtro === "completadas") return t.completada;
    return true; // 'todas'
  });

  const filtros = [
    { key: "todas", label: `Todas (${tareas.length})` },
    {
      key: "pendientes",
      label: `Pendientes (${tareas.filter((t) => !t.completada).length})`,
    },
    {
      key: "completadas",
      label: `Completadas (${tareas.filter((t) => t.completada).length})`,
    },
  ];

  return (
    <div style={{ padding: "1.5rem" }}>
      {/* Botones de filtro */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "1.25rem",
          flexWrap: "wrap",
        }}
      >
        {filtros.map((f) => (
          <button
            key={f.key}
            onClick={() => setFiltro(f.key)}
            style={{
              padding: "6px 14px",
              fontSize: "13px",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              cursor: "pointer",
              background: filtro === f.key ? "#111827" : "transparent",
              color: filtro === f.key ? "#fff" : "#374151",
              fontWeight: filtro === f.key ? 500 : 400,
              transition: "all 0.15s",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Lista de tareas filtradas */}
      {tareasFiltradas.length === 0 ? (
        <p
          style={{
            color: "#9ca3af",
            textAlign: "center",
            padding: "2rem 0",
            fontSize: "14px",
          }}
        >
          No hay tareas en esta categoría.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {tareasFiltradas.map((t) => (
            <TareaCard key={t.id} tarea={t} />
          ))}
        </div>
      )}
    </div>
  );
}
