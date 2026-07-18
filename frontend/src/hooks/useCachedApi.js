import { useState, useEffect, useRef } from 'react';
import api from '../services/api';

const cache = {};

export function useCachedApi(endpoint, dependencies = []) {
  const [data, setData] = useState(cache[endpoint] || null);
  const [loading, setLoading] = useState(!cache[endpoint]);
  const [error, setError] = useState(null);
  
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    
    const fetchData = async () => {
      if (!cache[endpoint]) {
        setLoading(true);
      }
      
      try {
        const response = await api.get(endpoint);
        
        if (isMounted.current) {
          const responseData = response || null;
          cache[endpoint] = responseData;
          setData(responseData);
          setError(null);
        }
      } catch (err) {
        if (isMounted.current) {
          setError(err.response?.data?.message || 'Error fetching data');
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    if (endpoint) {
      fetchData();
    }

    return () => {
      isMounted.current = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, ...dependencies]);

  return { data, loading, error };
}
