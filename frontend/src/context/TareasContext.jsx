import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const TareasContext = createContext();

export function TareasProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setTareas([]);
      return;
    }
    setCargando(true);
    setError(null);
    api
      .getTareas()
      .then((res) => setTareas(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, [isAuthenticated]);

  async function agregarTarea(datos) {
    const res = await api.crearTarea(datos);
    setTareas((prev) => [res.data, ...prev]);
  }

  async function toggleTarea(id) {
    const tarea = tareas.find((t) => t.id === id);
    const res = await api.actualizarTarea(id, { completed: !tarea.completed });
    setTareas((prev) => prev.map((t) => (t.id === id ? res.data : t)));
  }

  async function eliminarTarea(id) {
    await api.eliminarTarea(id);
    setTareas((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <TareasContext.Provider value={{ tareas, cargando, error, agregarTarea, toggleTarea, eliminarTarea }}>
      {children}
    </TareasContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTareas() {
  return useContext(TareasContext);
}
