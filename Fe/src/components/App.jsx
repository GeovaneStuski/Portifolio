import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { Router } from '../Router';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastContainer />
        <Router />
      </AuthProvider>
    </ThemeProvider>
  );
}