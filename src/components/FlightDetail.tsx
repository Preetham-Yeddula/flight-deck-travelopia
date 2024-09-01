import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFlightDetail } from '../hooks/useFlightDetail';
import { FlightDetail } from '../types/Flight';
import NotFound from './NotFound';

export const FlightDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { flightDetail, loading, error } = useFlightDetail(id || '');


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getStatusInfo = (status: FlightDetail['status']) => {
    switch (status) {
      case 'On Time':
        return { color: 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200', symbol: '✅' };
      case 'Delayed':
        return { color: 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200', symbol: '⏰' };
      case 'Boarding':
        return { color: 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200', symbol: '🚶' };
      case 'Departed':
        return { color: 'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200', symbol: '🛫' };
      default:
        return { color: 'bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200', symbol: '❓' };
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div data-testid="loading-spinner" className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <p className="text-red-500 dark:text-red-400 text-center">{error}</p>
        <button 
          onClick={() => navigate('/')} 
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
        >
          Back to Flight Board
        </button>
      </div>
    </div>
  );

  if (!flightDetail) return <NotFound />;

  const statusInfo = getStatusInfo(flightDetail.status);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">Flight Details</h1>
        
        <div className={`${statusInfo.color} p-4 rounded-lg mb-6 text-center`}>
          <span className="text-4xl mr-2">{statusInfo.symbol}</span>
          <span className="text-2xl font-bold">{flightDetail.status}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 dark:text-gray-400">
          <div>
            <p className="font-semibold">Flight Number:</p>
            <p className="text-xl">{flightDetail.flightNumber}</p>
          </div>
          <div>
            <p className="font-semibold">Airline:</p>
            <p className="text-xl">{flightDetail.airline}</p>
          </div>
          <div>
            <p className="font-semibold">Origin:</p>
            <p className="text-xl">{flightDetail.origin}</p>
          </div>
          <div>
            <p className="font-semibold">Destination:</p>
            <p className="text-xl">{flightDetail.destination}</p>
          </div>
          <div>
            <p className="font-semibold">Departure Time:</p>
            <p className="text-xl">{formatDate(flightDetail.departureTime)}</p>
          </div>
          {flightDetail.estimatedArrivalTime && (
            <div>
              <p className="font-semibold">Estimated Arrival:</p>
              <p className="text-xl">{formatDate(flightDetail.estimatedArrivalTime)}</p>
            </div>
          )}
          {flightDetail.gate && (
            <div>
              <p className="font-semibold">Gate:</p>
              <p className="text-xl">{flightDetail.gate}</p>
            </div>
          )}
          {flightDetail.terminal && (
            <div>
              <p className="font-semibold">Terminal:</p>
              <p className="text-xl">{flightDetail.terminal}</p>
            </div>
          )}
        </div>
        
        <button 
          onClick={() => navigate('/')} 
          className="mt-6 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
        >
          Back to Flight Board
        </button>
      </div>
    </div>
  );
};

export default FlightDetails;