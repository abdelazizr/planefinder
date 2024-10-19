// src/lib/flightaware.ts

import axios from 'axios';
import { Flight } from '../models/Flight';

const API_KEY = process.env.FLIGHTAWARE_API_KEY as string;
const BASE_URL = 'https://aeroapi.flightaware.com/aeroapi';

interface FlightAwareResponse {
  flights: {
    ident: string;
    ident_icao: string;
    ident_iata: string;
    fa_flight_id: string;
    aircraft_type: string;
    origin: {
      code: string;
      name: string;
      city: string;
    };
    destination: {
      code: string;
      name: string;
      city: string;
    };
    scheduled_out: string;
    scheduled_off: string;
    scheduled_on: string;
    scheduled_in: string;
    progress_percent: number;
    actual_off: string;
    last_position: {
      fa_flight_id: string;
      altitude: number;
      groundspeed: number;
      heading: number;
      latitude: number;
      longitude: number;
      timestamp: string;
      update_type: string;
    };
  }[];
}

export async function searchFlights(airline?: string, aircraftType?: string): Promise<Flight[]> {
  try {
    let query = '';
    if (airline) {
      query += `-airline "${airline}" `;
    }
    if (aircraftType) {
      query += `-type "${aircraftType}" `;
    }
    query = query.trim();

    const response = await axios.get<FlightAwareResponse>(`${BASE_URL}/flights/search`, {
      params: {
        query: query,
      },
      headers: {
        'x-apikey': API_KEY,
        'Accept': 'application/json; charset=UTF-8'
      },
    });

    return response.data.flights.map((flight) => {
      const takeoffTime = flight.actual_off || flight.scheduled_off || '';
      const currentTime = new Date(flight.last_position?.timestamp || Date.now());
      const takeoffDate = new Date(takeoffTime);
      
      let speedMph = 0;
      let timeInFlight = 'N/A';

      if (takeoffTime && flight.last_position) {
        const flightDurationMs = currentTime.getTime() - takeoffDate.getTime();
        const flightDurationHours = flightDurationMs / (1000 * 60 * 60);
        timeInFlight = `${Math.floor(flightDurationHours)}h ${Math.floor((flightDurationHours % 1) * 60)}m`;

        speedMph = Math.round(flight.last_position.groundspeed * 1.15078); // Convert knots to mph
      }

      return new Flight({
        id: flight.fa_flight_id,
        aircraftType: flight.aircraft_type,
        takeoffTime: takeoffTime,
        originAirport: `${flight.origin.code} (${flight.origin.name}, ${flight.origin.city})`,
        destinationAirport: `${flight.destination.code} (${flight.destination.name}, ${flight.destination.city})`,
        totalDistance: 0, // Not provided in the sample response
        airline: flight.ident_icao.slice(0, 3), // Assuming the first 3 characters of ident_icao represent the airline
        flightNumber: flight.ident_iata,
        speedMph: speedMph,
        timeInFlight: timeInFlight,
      });
    });
  } catch (error) {
    console.error('Error fetching flights from FlightAware:', error);
    throw new Error('Failed to fetch flights from FlightAware');
  }
}