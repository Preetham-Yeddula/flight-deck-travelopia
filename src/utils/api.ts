import axios, { AxiosResponse } from 'axios';

export async function fetchData<T>(apiURL: string, endpoint: string): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axios.get(`${apiURL}${endpoint}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(`Server error: ${error.response.status}`);
      } else if (error.request) {
        throw new Error('No response received from server');
      } else {
        throw new Error('Error setting up the request');
      }
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}