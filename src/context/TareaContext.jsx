// src/context/TareasContext.jsx
import { createContext, useContext, useState } from "react";
import { tareasIniciales } from "../data/tareas";

const TareasContext = createContext();

export function TareaProvider({ children }) {
  const [tareas, setTareas] = useState(tareasIniciales);

  function toggleTarea(id) {
    setTareas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completada: !t.completada } : t)),
    );
  }

  return (
    <TareasContext.Provider value={{ tareas, toggleTarea }}>
      {children}
    </TareasContext.Provider>
  );
}

// Hook personalizado para consumir el contexto
export function useTareas() {
  return useContext(TareasContext);
}

// En cualquier componente hijo:
// const { tareas, toggleTarea } = useTareas();
