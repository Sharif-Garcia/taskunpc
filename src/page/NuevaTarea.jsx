import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTareas } from "../context/TareasContext";

export default function NuevaTarea() {
  const { agregarTarea } = useTareas();
  const navigate = useNavigate();

  // Estado del formulario controlado
  const [form, setForm] = useState({ titulo: "", materia: "", fecha: "" });
  const [error, setError] = useState("");

  // Actualiza el campo correspondiente usando el atributo name del input
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault(); // Prevenir recarga de página

    // Validación básica
    if (!form.titulo.trim() || !form.materia.trim() || !form.fecha) {
      setError("Por favor completá todos los campos.");
      return;
    }

    agregarTarea(form); // Agregar al contexto
    navigate("/"); // Redirigir a inicio
  }

  const inputStyle = {
    width: "100%",
    padding: "8px 12px",
    fontSize: "14px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    fontSize: "12px",
    color: "#6b7280",
    marginBottom: "4px",
  };

  return (
    <div style={{ padding: "1.5rem" }}>
      {/* Encabezado con botón volver */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "1.25rem",
        }}
      >
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "6px 14px",
            fontSize: "13px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          ← Volver
        </button>
        <h2 style={{ fontSize: "16px", fontWeight: 500 }}>Nueva tarea</h2>
      </div>

      {/* Formulario */}
      <div
        style={{
          maxWidth: "480px",
          padding: "1.25rem",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          background: "#fff",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "14px" }}
        >
          <div>
            <label style={labelStyle}>Título</label>
            <input
              style={inputStyle}
              type="text"
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              placeholder="Ej: Entregar TP de Redes"
            />
          </div>

          <div>
            <label style={labelStyle}>Materia</label>
            <input
              style={inputStyle}
              type="text"
              name="materia"
              value={form.materia}
              onChange={handleChange}
              placeholder="Ej: Redes de Computadoras"
            />
          </div>

          <div>
            <label style={labelStyle}>Fecha de entrega</label>
            <input
              style={inputStyle}
              type="date"
              name="fecha"
              value={form.fecha}
              onChange={handleChange}
            />
          </div>

          {/* Mensaje de error */}
          {error && (
            <p style={{ fontSize: "12px", color: "#dc2626" }}>{error}</p>
          )}

          <button
            type="submit"
            style={{
              alignSelf: "flex-start",
              padding: "8px 18px",
              fontSize: "14px",
              background: "#111827",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Agregar tarea
          </button>
        </form>
      </div>
    </div>
  );
}
