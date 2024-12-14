import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import { ThemeContext } from '../../contexts/ThemeContext';

import delay from '../../utils/delay';

export function useLogin() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { onChangeTheme, theme } = useContext(ThemeContext);

  const {
    onLogin,
    loading: AuthLoading,
    loginIsLoading,
    authenticated
  } = useContext(AuthContext);

  const isFormValid = !!(username && password);

  useEffect(() => {
    if(!AuthLoading) {
      delay(500).then(() => setLoading(false));
    }
  }, [AuthLoading]);

  useEffect(() => {
    if(!AuthLoading && authenticated) {
      setLoading(true);
      
      delay(300).then(navigate('/'));
    }
  }, [AuthLoading, authenticated, navigate]);

  function handleChangeUsername(username) {
    setUsername(username);
  }

  function handleChangePassword(password) {
    setPassword(password);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    onLogin({username, password});
  }

  return {
    username,
    onChangeUsername: handleChangeUsername,
    password,
    onChangePassword: handleChangePassword,
    onSubmit: handleSubmit,
    loading,
    isFormValid,
    loginIsLoading,
    onChangeTheme,
    theme
  };
}