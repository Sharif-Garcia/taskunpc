import { useTareas } from "../context/TareasContext";
import { useNavigate } from "react-router-dom";

export default function TareaCard({ tarea }) {
  const { toggleTarea } = useTareas();
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        alignItems: "flex-start",
        padding: "1rem 1.25rem",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        background: "#fff",
        // Cambio visual: baja opacidad si está completada
        opacity: tarea.completada ? 0.5 : 1,
        transition: "opacity 0.2s",
      }}
    >
      {/* Checkbox que llama toggleTarea */}
      <input
        type="checkbox"
        checked={tarea.completada}
        onChange={() => toggleTarea(tarea.id)}
        style={{
          marginTop: "3px",
          cursor: "pointer",
          width: "16px",
          height: "16px",
        }}
      />

      <div style={{ flex: 1 }}>
        <p
          style={{
            fontWeight: 500,
            fontSize: "14px",
            marginBottom: "4px",
            // Cambio visual: tachado si está completada
            textDecoration: tarea.completada ? "line-through" : "none",
            color: tarea.completada ? "#9ca3af" : "#111827",
          }}
        >
          {tarea.titulo}
        </p>
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              padding: "2px 8px",
              borderRadius: "20px",
              background: "#dbeafe",
              color: "#1e40af",
              fontWeight: 500,
            }}
          >
            {tarea.materia}
          </span>
          <span style={{ fontSize: "11px", color: "#9ca3af" }}>
            {tarea.fecha}
          </span>
          <span
            style={{
              fontSize: "11px",
              padding: "2px 8px",
              borderRadius: "20px",
              background: tarea.completada ? "#dcfce7" : "#fef9c3",
              color: tarea.completada ? "#166534" : "#854d0e",
              fontWeight: 500,
            }}
          >
            {tarea.completada ? "Completada" : "Pendiente"}
          </span>
        </div>
      </div>

      <button
        onClick={() => navigate(`/tarea/${tarea.id}`)}
        style={{
          fontSize: "12px",
          padding: "4px 10px",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          background: "transparent",
          cursor: "pointer",
        }}
      >
        Ver
      </button>
    </div>
  );
}
