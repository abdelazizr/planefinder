import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import FlightGrid from '../components/FlightGrid';
import { NextPage } from 'next';
import { Flight } from '../models/Flight';

const Home: NextPage = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (airline: string, searchTerm: string, type: 'aircraft' | 'airline') => {
    setLoading(true);
    setError(null);

    try {
      let url = '/api/searchByAirline?';
      if (type === 'aircraft') {
        if (airline) {
          url += `airline=${encodeURIComponent(airline)}&`;
        }
        url += `type=${encodeURIComponent(searchTerm)}`;
      } else {
        url += `airline=${encodeURIComponent(searchTerm)}`;
      }

      console.log(`Sending API request to: ${url}`); // Logging the API call

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch flights');
      }
      const data = await response.json();
      console.log('Received data:', data); // Logging the received data

      setFlights(data.map((flight: any) => new Flight(flight)));
    } catch (err) {
      console.error('Error during search:', err); // Logging any errors
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setFlights([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold mb-4">Welcome to PlaneFinder</h1>
          <p className="text-xl mb-8">Your real-time flight tracking companion for aviation enthusiasts</p>
          <a href="#search" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300">Start Exploring</a>
        </div>
      </div>

      {/* Search Section */}
      <div id="search" className="container mx-auto px-4 py-16">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-semibold mb-6 text-center text-blue-800">Start Your Search</h2>
          <SearchForm onSearch={handleSearch} />
          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && !error && <FlightGrid flights={flights} />}
        </div>
      </div>
    </div>
  );
}

export default Home;