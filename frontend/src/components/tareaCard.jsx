import { useTareas } from '../context/TareasContext';
import { useNavigate } from 'react-router-dom';

const PRIORIDAD = {
  low:    { bg: '#dcfce7', color: '#166534', label: 'Baja' },
  medium: { bg: '#fef9c3', color: '#854d0e', label: 'Media' },
  high:   { bg: '#fee2e2', color: '#991b1b', label: 'Alta' },
};

export default function TareaCard({ tarea }) {
  const { toggleTarea } = useTareas();
  const navigate = useNavigate();
  const prio = PRIORIDAD[tarea.priority] ?? PRIORIDAD.medium;

  return (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
        padding: '1rem 1.25rem',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        background: '#fff',
        opacity: tarea.completed ? 0.5 : 1,
        transition: 'opacity 0.2s',
      }}
    >
      <input
        type="checkbox"
        checked={tarea.completed}
        onChange={() => toggleTarea(tarea.id)}
        style={{ marginTop: '3px', cursor: 'pointer', width: '16px', height: '16px' }}
      />

      <div style={{ flex: 1 }}>
        <p
          style={{
            fontWeight: 500,
            fontSize: '14px',
            marginBottom: '4px',
            textDecoration: tarea.completed ? 'line-through' : 'none',
            color: tarea.completed ? '#9ca3af' : '#111827',
          }}
        >
          {tarea.title}
        </p>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          {tarea.description && (
            <span
              style={{
                fontSize: '11px',
                padding: '2px 8px',
                borderRadius: '20px',
                background: '#dbeafe',
                color: '#1e40af',
                fontWeight: 500,
              }}
            >
              {tarea.description}
            </span>
          )}
          <span
            style={{
              fontSize: '11px',
              padding: '2px 8px',
              borderRadius: '20px',
              background: prio.bg,
              color: prio.color,
              fontWeight: 500,
            }}
          >
            {prio.label}
          </span>
          <span
            style={{
              fontSize: '11px',
              padding: '2px 8px',
              borderRadius: '20px',
              background: tarea.completed ? '#dcfce7' : '#fef9c3',
              color: tarea.completed ? '#166534' : '#854d0e',
              fontWeight: 500,
            }}
          >
            {tarea.completed ? 'Completada' : 'Pendiente'}
          </span>
        </div>
      </div>

      <button
        onClick={() => navigate(`/tarea/${tarea.id}`)}
        style={{
          fontSize: '12px',
          padding: '4px 10px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          background: 'transparent',
          cursor: 'pointer',
        }}
      >
        Ver
      </button>
    </div>
  );
}
