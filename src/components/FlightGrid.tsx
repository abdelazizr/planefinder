import React from 'react';
import { Flight } from '../models/Flight';

interface FlightGridProps {
  flights?: Flight[];
}

const FlightGrid: React.FC<FlightGridProps> = ({ flights = [] }) => {
  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Flight Results</h2>
      {flights.length === 0 ? (
        <p className="text-gray-500">No flights to display.</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Aircraft Type</th>
              <th className="px-4 py-2 text-left">Airline</th>
              <th className="px-4 py-2 text-left">Flight Number</th>
              <th className="px-4 py-2 text-left">From</th>
              <th className="px-4 py-2 text-left">To</th>
              <th className="px-4 py-2 text-left">Takeoff Time</th>
              <th className="px-4 py-2 text-left">Time in Flight</th>
              <th className="px-4 py-2 text-left">Speed (mph)</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{flight.aircraftType}</td>
                <td className="px-4 py-2">{flight.airline}</td>
                <td className="px-4 py-2">{flight.flightNumber}</td>
                <td className="px-4 py-2">{flight.originAirport}</td>
                <td className="px-4 py-2">{flight.destinationAirport}</td>
                <td className="px-4 py-2">{flight.takeoffTime}</td>
                <td className="px-4 py-2">{flight.timeInFlight}</td>
                <td className="px-4 py-2">{flight.speedMph}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FlightGrid;