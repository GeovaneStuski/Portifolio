import { useEffect, useState } from 'react';

export function useProject({ project }) {
  const [timestamp, setTimestamp] = useState(0);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    setTimestamp(Date.now());
  }, [project.imagepath]);
  
  function imageLoaded() {
    setLoading(false);
  }
  return {
    timestamp,
    loading,
    imageLoaded
  };
}