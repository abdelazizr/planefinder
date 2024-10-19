// src/pages/api/searchByAirline.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { searchFlights } from '../../lib/flightaware';
import { Flight } from '../../models/Flight';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Flight[] | { error: string }>
) {
  if (req.method === 'GET') {
    const { airline, type } = req.query;
    console.log('Received query parameters:', { airline, type }); // Logging received parameters

    // TODO: Implement input validation
    try {
      console.log('Calling searchFlights with parameters:', { airline, type });
      const flights = await searchFlights(airline as string, type as string);
      console.log(`Retrieved ${flights.length} flights`); // Logging the number of flights retrieved
      res.status(200).json(flights);
    } catch (error) {
      console.error('Error in searchByAirline:', error); // Logging any errors
      res.status(500).json({ error: 'Error fetching flights' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}