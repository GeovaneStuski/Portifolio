import { createContext, useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { ApiRequester } from '../utils/ApiRequester';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginIsLoading, setLoginIsLoading] = useState(false);
  const [authenticationIsLoading, setAuthenticationIsLoading] = useState(true);
  const [datasIsLoading, setDatasIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async function getData() {
      const token = localStorage.getItem('token');

      if (!token) {
        setAuthenticated(false);

        setAuthenticationIsLoading(false);
      } else {
        try {
          const { data } = await ApiRequester.get('/me');

          setUser(data.username);

          setAuthenticated(true);

          setAuthenticationIsLoading(false);
        } catch {
          setAuthenticated(false);
          setAuthenticationIsLoading(false);
        }
      }
    }());
  }, []);

  useEffect(() => {
    if(!authenticationIsLoading && !datasIsLoading) {
      setLoading(false);
    }
  }, [authenticationIsLoading, datasIsLoading]);

  async function handleLogin(body) {
    try {
      setLoginIsLoading(true);

      const { data } = await ApiRequester.post('/login', body);

      setAuthenticationIsLoading(true);

      localStorage.setItem('token', data.token);

      setUser(body.username);

      setAuthenticated(true);
      
      setAuthenticationIsLoading(false);
      setLoginIsLoading(false);
      toast.success('Authenticado com sucesso!');
    } catch {
      setLoginIsLoading(false);
      toast.error('Credencias erradas');
    }
  }

  function onLoadDatas() {
    setDatasIsLoading(false);
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
      onLoadDatas
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
