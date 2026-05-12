import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTareas } from '../context/TareasContext';

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  fontSize: '14px',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  outline: 'none',
  boxSizing: 'border-box',
};

const labelStyle = {
  display: 'block',
  fontSize: '12px',
  color: '#6b7280',
  marginBottom: '4px',
};

export default function NuevaTarea() {
  const { agregarTarea } = useTareas();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', priority: 'medium' });
  const [error, setError] = useState('');
  const [guardando, setGuardando] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('El título es requerido.');
      return;
    }
    setError('');
    setGuardando(true);
    try {
      await agregarTarea({
        title: form.title.trim(),
        description: form.description.trim() || undefined,
        priority: form.priority,
      });
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '6px 14px',
            fontSize: '13px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            background: 'transparent',
            cursor: 'pointer',
          }}
        >
          ← Volver
        </button>
        <h2 style={{ fontSize: '16px', fontWeight: 500, margin: 0 }}>Nueva tarea</h2>
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
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={labelStyle}>Título *</label>
            <input
              style={inputStyle}
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Ej: Entregar TP de Redes"
            />
          </div>

          <div>
            <label style={labelStyle}>Materia (opcional)</label>
            <input
              style={inputStyle}
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Ej: Redes de Computadoras"
            />
          </div>

          <div>
            <label style={labelStyle}>Prioridad</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              style={{ ...inputStyle, cursor: 'pointer' }}
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>

          {error && <p style={{ fontSize: '12px', color: '#dc2626', margin: 0 }}>{error}</p>}

          <button
            type="submit"
            disabled={guardando}
            style={{
              alignSelf: 'flex-start',
              padding: '8px 18px',
              fontSize: '14px',
              background: '#111827',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: guardando ? 'not-allowed' : 'pointer',
              fontWeight: 500,
              opacity: guardando ? 0.7 : 1,
            }}
          >
            {guardando ? 'Guardando...' : 'Agregar tarea'}
          </button>
        </form>
      </div>
    </div>
  );
}
