import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('taskunpc-token'));

  function guardarToken(newToken) {
    localStorage.setItem('taskunpc-token', newToken);
    setToken(newToken);
  }

  function cerrarSesion() {
    localStorage.removeItem('taskunpc-token');
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, guardarToken, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
