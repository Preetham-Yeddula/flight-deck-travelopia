import { renderHook, waitFor, act } from '@testing-library/react';
import { useFlights } from '../../hooks/useFlights';
import { fetchData } from '../../utils/api';

jest.mock('../../utils/api');

describe('useFlights', () => {
  const mockFlights = [
    { id: '1', flightNumber: 'AA123', airline: 'American Airlines', origin: 'New York', destination: 'Los Angeles', departureTime: '2023-09-01T10:00:00Z', status: 'On Time' },
    { id: '2', flightNumber: 'UA456', airline: 'United Airlines', origin: 'Chicago', destination: 'San Francisco', departureTime: '2023-09-01T11:00:00Z', status: 'Delayed' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should fetch flights and update state', async () => {
    (fetchData as jest.Mock).mockResolvedValueOnce(mockFlights);

    const { result } = renderHook(() => useFlights());

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.flights).toEqual(mockFlights);
    expect(result.current.error).toBe(null);
  });

  it('should handle error when fetching flights fails', async () => {
    (fetchData as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch flights. Please try again later."));

    const { result } = renderHook(() => useFlights());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.flights).toEqual([]);
    expect(result.current.error).toBe("Failed to fetch flights. Please try again later.");
  });

  it('should refetch flights periodically', async () => {
    (fetchData as jest.Mock).mockResolvedValueOnce(mockFlights);

    const { result } = renderHook(() => useFlights());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.flights).toEqual(mockFlights);

    (fetchData as jest.Mock).mockResolvedValueOnce([...mockFlights, { id: '3', flightNumber: 'BA789', airline: 'British Airways', origin: 'London', destination: 'New York', departureTime: '2023-09-01T12:00:00Z', status: 'On Time' }]);

    act(() => {
      jest.advanceTimersByTime(10000); // Advance time by 10 seconds
    });

    await waitFor(() => {
      expect(result.current.flights).toHaveLength(3);
    });
  });
});
