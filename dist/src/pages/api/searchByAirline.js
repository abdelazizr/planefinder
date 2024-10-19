"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Flight[] | { error: string }>
// ) {
//   if (req.method === 'GET') {
//     const { airline } = req.query;
//     // TODO: Implement input validation
//     try {
//       const flights = await searchFlightsByAirline(airline as string);
//       res.status(200).json(flights);
//     } catch (error) {
//       res.status(500).json({ error: 'Error fetching flights' });
//     }
//   } else {
//     res.setHeader('Allow', ['GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
