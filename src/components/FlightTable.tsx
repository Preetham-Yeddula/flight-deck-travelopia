import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flight } from '../types/Flight';
import { useFlights } from '../hooks/useFlights';

export const FlightTable: React.FC = () => {
  const { flights, loading, error } = useFlights();
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterOrigin, setFilterOrigin] = useState('');
  const [filterDestination, setFilterDestination] = useState('');
  const [filterAirline, setFilterAirline] = useState('');
  const [searchFlightNumber, setSearchFlightNumber] = useState('');
  const [showUTC, setShowUTC] = useState(false);

  const sortedAndFilteredFlights = useMemo(() => {
    return flights
      .filter(flight => 
        flight.origin.toLowerCase().includes(filterOrigin.toLowerCase()) &&
        flight.destination.toLowerCase().includes(filterDestination.toLowerCase()) &&
        flight.airline.toLowerCase().includes(filterAirline.toLowerCase()) &&
        flight.flightNumber.toLowerCase().includes(searchFlightNumber.toLowerCase())
      )
      .sort((a, b) => {
        const dateA = new Date(a.departureTime).getTime();
        const dateB = new Date(b.departureTime).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
  }, [flights, sortOrder, filterOrigin, filterDestination, filterAirline, searchFlightNumber]);

  if (loading) return <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>;

  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Time': return 'bg-green-200 text-green-800';
      case 'Delayed': return 'bg-red-200 text-red-800';
      case 'Boarding': return 'bg-yellow-200 text-yellow-800';
      case 'Departed': return 'bg-blue-200 text-blue-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const handleRowClick = (flightId: string) => {
    navigate(`/flight/${flightId}`);
  };

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    if (showUTC) {
        return date.toLocaleString('en-US', { 
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit', 
            minute: '2-digit', 
            timeZone: 'UTC',
            hour12: false 
          }) + ' UTC';
    } else {
      return date.toLocaleString('en-IN', { 
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit', 
        minute: '2-digit', 
        timeZone: 'Asia/Kolkata',
        hour12: false 
      }) + ' IST';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">Real-Time Flight Status Board</h1>

      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search by Flight Number"
          value={searchFlightNumber}
          onChange={(e) => setSearchFlightNumber(e.target.value)}
          className="p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <input
          type="text"
          placeholder="Filter by Origin"
          value={filterOrigin}
          onChange={(e) => setFilterOrigin(e.target.value)}
          className="p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <input
          type="text"
          placeholder="Filter by Destination"
          value={filterDestination}
          onChange={(e) => setFilterDestination(e.target.value)}
          className="p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <input
          type="text"
          placeholder="Filter by Airline"
          value={filterAirline}
          onChange={(e) => setFilterAirline(e.target.value)}
          className="p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
      <div className="flex justify-end mb-4">
      <button 
          onClick={() => setShowUTC(!showUTC)} 
          className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {showUTC ? 'Show IST' : 'Show UTC'}
        </button>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-center">Flight Number</th>
              <th className="py-3 px-6 text-center">Airline</th>
              <th className="py-3 px-6 text-center">Origin</th>
              <th className="py-3 px-6 text-center">Destination</th>
              <th className="py-3 px-6 text-center cursor-pointer" onClick={toggleSortOrder}>Departure Time {sortOrder === 'asc' ? '↑' : '↓'}</th>
              <th className="py-3 px-6 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 dark:text-gray-400 text-sm">
            {sortedAndFilteredFlights.map((flight: Flight, index: number) => (
              <tr 
                key={flight.id} 
                onClick={() => handleRowClick(flight.id)}
                className={`
                  ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-gray-800'}
                  hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-150 ease-in-out cursor-pointer
                `}
              >
                <td className="py-3 px-6 text-center whitespace-nowrap font-medium">{flight.flightNumber}</td>
                <td className="py-3 px-6 text-center">{flight.airline}</td>
                <td className="py-3 px-6 text-center">{flight.origin}</td>
                <td className="py-3 px-6 text-center">{flight.destination}</td>
                <td className="py-3 px-6 text-center">{formatTime(flight.departureTime)}</td>
                <td className="py-3 px-6 text-center">
                  <span className={`${getStatusColor(flight.status)} py-1 px-3 rounded-full text-xs font-semibold`}>
                    {flight.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};