import { useParams, useNavigate } from 'react-router-dom';
import { useTareas } from '../context/TareasContext';

const btnStyle = {
  padding: '6px 14px',
  fontSize: '13px',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  background: 'transparent',
  cursor: 'pointer',
};

const PRIORIDAD = { low: 'Baja', medium: 'Media', high: 'Alta' };

export default function DetalleTarea() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tareas, eliminarTarea, toggleTarea } = useTareas();

  const tarea = tareas.find((t) => t.id === id);

  if (!tarea) {
    return (
      <div style={{ padding: '1.5rem' }}>
        <button onClick={() => navigate('/')} style={btnStyle}>
          ← Volver
        </button>
        <p style={{ marginTop: '1rem', color: '#9ca3af' }}>Tarea no encontrada.</p>
      </div>
    );
  }

  async function handleEliminar() {
    await eliminarTarea(tarea.id);
    navigate('/');
  }

  const campos = [
    { label: 'Materia', valor: tarea.description || '—' },
    { label: 'Prioridad', valor: PRIORIDAD[tarea.priority] ?? tarea.priority },
    { label: 'Estado', valor: tarea.completed ? 'Completada' : 'Pendiente' },
    { label: 'Creada', valor: new Date(tarea.created_at).toLocaleDateString('es-ES') },
  ];

  return (
    <div style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
        <button onClick={() => navigate('/')} style={btnStyle}>
          ← Volver
        </button>
        <h2 style={{ fontSize: '16px', fontWeight: 500, margin: 0 }}>Detalle de tarea</h2>
      </div>

      <div
        style={{
          maxWidth: '480px',
          padding: '1.25rem',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          background: '#fff',
        }}
      >
        <p
          style={{
            fontWeight: 500,
            fontSize: '15px',
            marginBottom: '12px',
            textDecoration: tarea.completed ? 'line-through' : 'none',
            color: tarea.completed ? '#9ca3af' : '#111827',
          }}
        >
          {tarea.title}
        </p>

        <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
          <tbody>
            {campos.map((c) => (
              <tr key={c.label}>
                <td style={{ color: '#6b7280', padding: '6px 0', width: '45%' }}>{c.label}</td>
                <td style={{ padding: '6px 0' }}>{c.valor}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          style={{
            borderTop: '1px solid #f3f4f6',
            marginTop: '14px',
            paddingTop: '14px',
            display: 'flex',
            gap: '8px',
          }}
        >
          <button
            onClick={() => toggleTarea(tarea.id)}
            style={{ ...btnStyle, background: '#111827', color: '#fff', border: 'none' }}
          >
            {tarea.completed ? 'Marcar pendiente' : 'Marcar completada'}
          </button>
          <button
            onClick={handleEliminar}
            style={{ ...btnStyle, color: '#dc2626', borderColor: '#fca5a5' }}
          >
            Eliminar tarea
          </button>
        </div>
      </div>
    </div>
  );
}
