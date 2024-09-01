import { useState, useEffect, useCallback } from 'react';
import { Flight } from '../types/Flight';
import { fetchData } from '../utils/api';

const API_URL = 'https://flight-status-mock.core.travelopia.cloud/flights';
const REFRESH_INTERVAL = 10000; // 10 seconds

export const useFlights = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFlights = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchData<Flight[]>(API_URL, "");
      setFlights(response);
      setError(null);
    } catch (err) {
      setError('Failed to fetch flights. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFlights();
    const interval = setInterval(fetchFlights, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchFlights]);

  return { flights, loading, error, refetch: fetchFlights };
};