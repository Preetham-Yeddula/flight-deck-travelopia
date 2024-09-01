// src/hooks/useFlightDetail.ts
import { useState, useEffect } from 'react';
import { FlightDetail } from '../types/Flight';
import { fetchData } from '../utils/api';

const API_URL = 'https://flight-status-mock.core.travelopia.cloud/flights';

export const useFlightDetail = (id: string) => {
  const [flightDetail, setFlightDetail] = useState<FlightDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    const fetchFlightDetail = async () => {
      try {
        const response = await fetchData<FlightDetail>(API_URL, `/${id}`);
        if (isMounted) {
          setFlightDetail(response);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          setError('Failed to fetch flight details. Please try again later.');
          setFlightDetail(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchFlightDetail();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [id]);

  return { flightDetail, loading, error };
};