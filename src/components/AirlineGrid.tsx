import React from 'react';
import { Airline } from '../models/Airline';

interface AirlineGridProps {
  airlines?: Airline[];
}

const AirlineGrid: React.FC<AirlineGridProps> = ({ airlines = [] }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Airline Results</h2>
      {airlines.length === 0 ? (
        <p className="text-gray-500">No airlines to display.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {airlines.map((airline) => (
            <div key={airline.id} className="bg-gray-50 p-4 rounded-lg shadow">
              <h3 className="font-semibold text-lg">{airline.name}</h3>
              <p><span className="font-medium">Flights:</span> {airline.flightsCount}</p>
              <p className="text-sm text-gray-600">Last updated: {airline.lastUpdated.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AirlineGrid;