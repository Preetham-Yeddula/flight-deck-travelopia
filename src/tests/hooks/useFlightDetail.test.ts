import { renderHook, waitFor } from '@testing-library/react';
import { useFlightDetail } from '../../hooks/useFlightDetail';
import { fetchData } from '../../utils/api';

jest.mock('../../utils/api');

describe('useFlightDetail', () => {
  const mockFlightDetail = {
    id: '1',
    flightNumber: 'AA123',
    airline: 'American Airlines',
    origin: 'New York',
    destination: 'Los Angeles',
    departureTime: '2023-09-01T10:00:00Z',
    status: 'On Time'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch flight detail and update state', async () => {
    (fetchData as jest.Mock).mockResolvedValueOnce(mockFlightDetail);

    const { result } = renderHook(() => useFlightDetail('1'));

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.flightDetail).toEqual(mockFlightDetail);
    expect(result.current.error).toBe(null);
  });

  it('should handle error when fetching flight detail fails', async () => {
    (fetchData as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));

    const { result } = renderHook(() => useFlightDetail('1'));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.flightDetail).toBe(null);
    expect(result.current.error).toBe('Failed to fetch flight details. Please try again later.');
  });
});
