import { Routes, Route, useNavigate } from "react-router-dom";
import { useTareas } from "./context/TareasContext";
import Inicio from "./page/Inicio";
import NuevaTarea from "./page/NuevaTarea";
import DetalleTarea from "./page/DetalleTarea";

function Header() {
  const { tareas } = useTareas();
  const navigate = useNavigate();
  const pendientes = tareas.filter((t) => !t.completada).length;

  return (
    <header
      style={{
        background: "#111827",
        color: "#fff",
        padding: "15px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <h1 style={{ margin: 0, fontSize: "20px" }}>TaskUPC</h1>
        <p style={{ margin: 0, fontSize: "13px", opacity: 0.7 }}>
          Tareas pendientes: {pendientes}
        </p>
      </div>
      <button
        onClick={() => navigate("/nueva")}
        style={{
          padding: "8px 16px",
          background: "#fff",
          color: "#111827",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: 500,
        }}
      >
        + Nueva tarea
      </button>
    </header>
  );
}

export default function App() {
  return (
    <div>
      <Header />
      <main style={{ maxWidth: "700px", margin: "0 auto", padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/nueva" element={<NuevaTarea />} />
          <Route path="/tarea/:id" element={<DetalleTarea />} />
        </Routes>
      </main>
    </div>
  );
}
