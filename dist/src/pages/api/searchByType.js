"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const flightaware_1 = require("../../lib/flightaware");
const db_1 = require("../../lib/db");
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.method !== 'GET') {
            res.setHeader('Allow', ['GET']);
            return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
        }
        const { type } = req.query;
        if (!type || typeof type !== 'string') {
            return res.status(400).json({ error: 'Invalid aircraft type provided' });
        }
        try {
            // Initialize the database
            yield (0, db_1.initializeDatabase)();
            // Fetch flights from FlightAware API
            const flights = yield (0, flightaware_1.searchFlightsByType)(type);
            // Process and store flights in the database
            const db = (0, db_1.getDatabase)();
            const processedFlights = [];
            for (const flight of flights) {
                // Insert or update flight in the database
                yield new Promise((resolve, reject) => {
                    db.run(`INSERT OR REPLACE INTO flights (
            id, aircraft_type, flight_date, origin_airport, destination_airport,
            total_distance, flight_time, remaining_time, airline, last_updated
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
                        flight.id,
                        flight.aircraftType,
                        flight.flightDate,
                        flight.originAirport,
                        flight.destinationAirport,
                        flight.totalDistance,
                        flight.flightTime,
                        flight.remainingTime,
                        flight.airline,
                        new Date().toISOString(),
                    ], function (err) {
                        if (err)
                            reject(err);
                        else
                            resolve();
                    });
                });
                processedFlights.push(flight);
            }
            res.status(200).json(processedFlights);
        }
        catch (error) {
            console.error('Error in searchByType:', error);
            res.status(500).json({ error: 'Error fetching and processing flights' });
        }
    });
}
exports.default = handler;
