import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

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

export default function Login() {
  const { guardarToken } = useAuth();
  const navigate = useNavigate();
  const [modo, setModo] = useState('login'); // 'login' | 'register'
  const [form, setForm] = useState({ email: '', password: '' });
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const [cargando, setCargando] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMensaje({ texto: '', tipo: '' });
    setCargando(true);
    try {
      if (modo === 'login') {
        const res = await api.login(form.email, form.password);
        guardarToken(res.token);
        navigate('/');
      } else {
        await api.register(form.email, form.password);
        setModo('login');
        setMensaje({ texto: 'Registro exitoso. Revisa tu email y luego inicia sesión.', tipo: 'ok' });
      }
    } catch (err) {
      setMensaje({ texto: err.message, tipo: 'error' });
    } finally {
      setCargando(false);
    }
  }

  function cambiarModo(nuevoModo) {
    setModo(nuevoModo);
    setMensaje({ texto: '', tipo: '' });
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f9fafb',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '380px',
          padding: '2rem',
          background: '#fff',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
        }}
      >
        <h1 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 4px' }}>TaskUPC</h1>
        <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 1.5rem' }}>
          {modo === 'login' ? 'Inicia sesión para continuar' : 'Crea tu cuenta'}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="tu@email.com"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              placeholder="Mínimo 6 caracteres"
              style={inputStyle}
            />
          </div>

          {mensaje.texto && (
            <p
              style={{
                fontSize: '12px',
                color: mensaje.tipo === 'ok' ? '#16a34a' : '#dc2626',
                margin: 0,
              }}
            >
              {mensaje.texto}
            </p>
          )}

          <button
            type="submit"
            disabled={cargando}
            style={{
              padding: '9px',
              fontSize: '14px',
              background: '#111827',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: cargando ? 'not-allowed' : 'pointer',
              fontWeight: 500,
              opacity: cargando ? 0.7 : 1,
            }}
          >
            {cargando ? 'Cargando...' : modo === 'login' ? 'Iniciar sesión' : 'Registrarse'}
          </button>
        </form>

        <p style={{ marginTop: '1rem', fontSize: '13px', textAlign: 'center', color: '#6b7280' }}>
          {modo === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
          <button
            onClick={() => cambiarModo(modo === 'login' ? 'register' : 'login')}
            style={{
              background: 'none',
              border: 'none',
              color: '#111827',
              fontWeight: 500,
              cursor: 'pointer',
              fontSize: '13px',
              padding: 0,
            }}
          >
            {modo === 'login' ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </p>
      </div>
    </div>
  );
}
