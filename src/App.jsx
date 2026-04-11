import Header from "./components/Header";
import ListaTareas from "./components/ListaTarea";
import { tareasIniciales } from "./data/tareas";

function App() {
  const tareasPendientes = tareasIniciales.filter(
    (tarea) => !tarea.completada,
  ).length;
  return (
    <div style={{ padding: "20px" }}>
      <h1>TaskUPC — Mi Gestor Académico</h1>
      <Header pendientes={tareasPendientes} />
      <ListaTareas />
    </div>
  );
}
export default App;
