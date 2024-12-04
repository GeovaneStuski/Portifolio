import { createContext, useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { ApiRequester } from '../utils/ApiRequester';
import delay from '../utils/delay';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginIsLoading, setLoginIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async function getData() {
      const token = localStorage.getItem('token');

      if (!token) {
        setAuthenticated(false);

        await delay(300);

        setLoading(false);
      } else {
        try {
          const { data } = await ApiRequester.get('/me');

          setUser(data.username);

          setAuthenticated(true);

          await delay(300);

          setLoading(false);
        } catch {
          setAuthenticated(false);
          setLoading(false);
        }
      }
    }());
  }, []);

  async function handleLogin(body) {
    try {
      setLoginIsLoading(true);

      const { data } = await ApiRequester.post('/login', body);

      await delay(300);

      setLoading(true);

      localStorage.setItem('token', data.token);

      setUser(body.username);

      setAuthenticated(true);
      
      setLoading(false);
      setLoginIsLoading(false);
      toast.success('Authenticado com sucesso!');
    } catch {
      await delay(300);
      setLoginIsLoading(false);
      toast.error('Credencias erradas');
    }
  }

  async function handleLogout() {
    localStorage.removeItem('token');

    setAuthenticated(false);

    setUser(null);
  }

  return (
    <AuthContext.Provider value={{
      authenticated,
      loading,
      user,
      onLogout: handleLogout,
      onLogin: handleLogin,
      loginIsLoading,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
