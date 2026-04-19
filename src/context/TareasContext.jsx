import { createContext, useContext, useState, useEffect } from "react";
import { tareasIniciales } from "../data/tareas";

const TareasContext = createContext();

export function TareasProvider({ children }) {
  // PASO 4: inicializar desde localStorage si existe
  const [tareas, setTareas] = useState(() => {
    const guardadas = localStorage.getItem("taskunpc-tareas");
    return guardadas ? JSON.parse(guardadas) : tareasIniciales;
  });

  // PASO 4: guardar en localStorage cada vez que cambien las tareas
  useEffect(() => {
    localStorage.setItem("taskunpc-tareas", JSON.stringify(tareas));
  }, [tareas]);

  // PASO 2: toggle completada
  function toggleTarea(id) {
    setTareas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completada: !t.completada } : t)),
    );
  }

  // PASO 3: agregar tarea desde el formulario
  function agregarTarea(nuevaTarea) {
    setTareas((prev) => [
      ...prev,
      { ...nuevaTarea, id: Date.now(), completada: false },
    ]);
  }

  // PASO 6: eliminar tarea desde el detalle
  function eliminarTarea(id) {
    setTareas((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <TareasContext.Provider
      value={{ tareas, toggleTarea, agregarTarea, eliminarTarea }}
    >
      {children}
    </TareasContext.Provider>
  );
}

// Hook personalizado para consumir el contexto
// eslint-disable-next-line react-refresh/only-export-components
export function useTareas() {
  return useContext(TareasContext);
}
