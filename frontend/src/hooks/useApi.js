import { useState, useCallback } from 'react';

/**
 * Custom hook to handle API loading and error states automatically.
 * @param {Function} apiFunc The API service function to execute
 * @returns {Object} { data, loading, error, execute }
 */
export const useApi = (apiFunc) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiFunc(...args);
        // Sometimes the backend nests data in response.data, 
        // but apiClient might have unwrapped it depending on interceptors
        setData(response);
        return response;
      } catch (err) {
        // err might be an AxiosError or custom error from interceptor
        const errorMsg = err.message || err.error || 'An unexpected error occurred';
        setError(errorMsg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunc]
  );

  return { data, loading, error, execute };
};
