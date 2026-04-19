import { useParams, useNavigate } from "react-router-dom";
import { useTareas } from "../context/TareasContext";

export default function DetalleTarea() {
  // useParams obtiene el :id de la URL (ej: /tarea/3 → id = "3")
  const { id } = useParams();
  const navigate = useNavigate();
  const { tareas, eliminarTarea, toggleTarea } = useTareas();

  // Buscar la tarea por id (useParams devuelve string, por eso comparamos con ==)
  const tarea = tareas.find((t) => t.id == id);

  // Si no se encuentra la tarea
  if (!tarea) {
    return (
      <div style={{ padding: "1.5rem" }}>
        <button onClick={() => navigate("/")} style={btnStyle}>
          ← Volver
        </button>
        <p style={{ marginTop: "1rem", color: "#9ca3af" }}>
          Tarea no encontrada.
        </p>
      </div>
    );
  }

  function handleEliminar() {
    eliminarTarea(tarea.id);
    navigate("/"); // Redirigir después de eliminar
  }

  const campos = [
    { label: "Materia", valor: tarea.materia },
    { label: "Fecha de entrega", valor: tarea.fecha },
    { label: "Estado", valor: tarea.completada ? "Completada" : "Pendiente" },
    { label: "ID", valor: String(tarea.id) },
  ];

  return (
    <div style={{ padding: "1.5rem" }}>
      {/* Encabezado */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "1.25rem",
        }}
      >
        <button onClick={() => navigate("/")} style={btnStyle}>
          ← Volver
        </button>
        <h2 style={{ fontSize: "16px", fontWeight: 500 }}>Detalle de tarea</h2>
      </div>

      {/* Tarjeta de detalle */}
      <div
        style={{
          maxWidth: "480px",
          padding: "1.25rem",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          background: "#fff",
        }}
      >
        <p
          style={{
            fontWeight: 500,
            fontSize: "15px",
            marginBottom: "12px",
            textDecoration: tarea.completada ? "line-through" : "none",
            color: tarea.completada ? "#9ca3af" : "#111827",
          }}
        >
          {tarea.titulo}
        </p>

        {/* Tabla de datos */}
        <table
          style={{
            width: "100%",
            fontSize: "13px",
            borderCollapse: "collapse",
          }}
        >
          <tbody>
            {campos.map((c) => (
              <tr key={c.label}>
                <td
                  style={{ color: "#6b7280", padding: "6px 0", width: "45%" }}
                >
                  {c.label}
                </td>
                <td style={{ padding: "6px 0" }}>{c.valor}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Acciones */}
        <div
          style={{
            borderTop: "1px solid #f3f4f6",
            marginTop: "14px",
            paddingTop: "14px",
            display: "flex",
            gap: "8px",
          }}
        >
          <button
            onClick={() => toggleTarea(tarea.id)}
            style={{
              ...btnStyle,
              background: "#111827",
              color: "#fff",
              border: "none",
            }}
          >
            {tarea.completada ? "Marcar pendiente" : "Marcar completada"}
          </button>
          <button
            onClick={handleEliminar}
            style={{ ...btnStyle, color: "#dc2626", borderColor: "#fca5a5" }}
          >
            Eliminar tarea
          </button>
        </div>
      </div>
    </div>
  );
}

const btnStyle = {
  padding: "6px 14px",
  fontSize: "13px",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  background: "transparent",
  cursor: "pointer",
};
