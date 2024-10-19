// src/pages/api/searchByType.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { searchFlights } from '../../lib/flightaware';
import { Flight } from '../../models/Flight';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Flight[] | { error: string }>
) {
  if (req.method === 'GET') {
    const { type } = req.query;
    // TODO: Implement input validation
    try {
      const flights = await searchFlights(undefined, type as string);
      console.log(`Received request to search for aircraft type: ${type}`);
      res.status(200).json(flights);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching flights' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
