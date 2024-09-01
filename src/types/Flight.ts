export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  status: 'On Time' | 'Delayed' | 'Boarding' | 'Departed';
}

export interface FlightDetail extends Flight {
  gate?: string;
  terminal?: string;
  estimatedArrivalTime?: string;
}