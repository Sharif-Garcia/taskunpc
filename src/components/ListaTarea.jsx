import TareaCard from "./tareaCard";
import { tareasIniciales } from "../data/tareas";

function ListaTareas() {
  return (
    <div>
      <h2>Lista de tareas</h2>

      {tareasIniciales.map((tarea) => (
        <TareaCard key={tarea.id} {...tarea} />
      ))}
    </div>
  );
}

export default ListaTareas;
