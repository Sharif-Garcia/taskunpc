import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TareasProvider } from './context/TareasContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TareasProvider>
          <App />
        </TareasProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
