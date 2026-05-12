import { useState } from 'react';
import { useTareas } from '../context/TareasContext';
import TareaCard from '../components/tareaCard';

export default function Inicio() {
  const { tareas, cargando, error } = useTareas();
  const [filtro, setFiltro] = useState('todas');

  const tareasFiltradas = tareas.filter((t) => {
    if (filtro === 'pendientes') return !t.completed;
    if (filtro === 'completadas') return t.completed;
    return true;
  });

  const filtros = [
    { key: 'todas', label: `Todas (${tareas.length})` },
    { key: 'pendientes', label: `Pendientes (${tareas.filter((t) => !t.completed).length})` },
    { key: 'completadas', label: `Completadas (${tareas.filter((t) => t.completed).length})` },
  ];

  if (cargando) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>
        Cargando tareas...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#dc2626', fontSize: '14px' }}>
        Error al cargar tareas: {error}
      </div>
    );
  }

  return (
    <div style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {filtros.map((f) => (
          <button
            key={f.key}
            onClick={() => setFiltro(f.key)}
            style={{
              padding: '6px 14px',
              fontSize: '13px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              cursor: 'pointer',
              background: filtro === f.key ? '#111827' : 'transparent',
              color: filtro === f.key ? '#fff' : '#374151',
              fontWeight: filtro === f.key ? 500 : 400,
              transition: 'all 0.15s',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {tareasFiltradas.length === 0 ? (
        <p style={{ color: '#9ca3af', textAlign: 'center', padding: '2rem 0', fontSize: '14px' }}>
          No hay tareas en esta categoría.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {tareasFiltradas.map((t) => (
            <TareaCard key={t.id} tarea={t} />
          ))}
        </div>
      )}
    </div>
  );
}
