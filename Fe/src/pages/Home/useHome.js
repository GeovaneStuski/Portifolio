import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import delay from '../../utils/delay';

export function useHome() {
  const [loading, setLoading] = useState(true);

  const { loading: AuthLoading } = useContext(AuthContext);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if(!AuthLoading) {
      delay(500).then(() => setLoading(false));
    }
  }, [AuthLoading]);
  return {
    loading,
    theme
  };
}