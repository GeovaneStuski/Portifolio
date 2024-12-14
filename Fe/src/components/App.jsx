import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { Router } from '../Router';
import 'react-toastify/dist/ReactToastify.css';
import { DatasProvider } from '../contexts/DatasContext';

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DatasProvider>
          <ToastContainer />
          <Router />
        </DatasProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}