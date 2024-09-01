import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center items-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-500 dark:text-blue-400">404</h1>
        <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mt-4">Oops! Flight Not Found</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-4">
          Looks like this flight has been delayed indefinitely.
        </p>
        <p className="text-md text-gray-500 dark:text-gray-500 mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      
      <div className="mt-8">
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Return to Flight Board
        </button>
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          If you believe this is an error, please contact our support team.
        </p>
        <p className="text-blue-500 dark:text-blue-400 hover:underline cursor-pointer mt-2">
          support@flightboard.com
        </p>
      </div>
    </div>
  );
};

export default NotFound;