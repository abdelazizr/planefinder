"use strict";
// src/lib/flightaware.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchFlightsByType = void 0;
const axios_1 = __importDefault(require("axios"));
const Flight_1 = require("../models/Flight");
const API_KEY = process.env.FLIGHTAWARE_API_KEY;
const BASE_URL = 'https://aeroapi.flightaware.com/aeroapi';
function searchFlightsByType(aircraftType) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `-type ${aircraftType}`;
            const response = yield axios_1.default.get(`${BASE_URL}/flights/search`, {
                params: {
                    query: query,
                },
                headers: {
                    'x-apikey': API_KEY,
                    'Accept': 'application/json; charset=UTF-8'
                },
            });
            return response.data.flights.map((flight) => {
                const departureTime = flight.scheduled_off || flight.scheduled_out || 'N/A';
                const arrivalTime = flight.scheduled_on || flight.scheduled_in || 'N/A';
                let flightTime = 'N/A';
                let remainingTime = 'N/A';
                if (departureTime !== 'N/A' && arrivalTime !== 'N/A') {
                    const departure = new Date(departureTime);
                    const arrival = new Date(arrivalTime);
                    const durationMs = arrival.getTime() - departure.getTime();
                    const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
                    const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
                    flightTime = `${durationHours}h ${durationMinutes}m`;
                    if (flight.progress_percent !== undefined) {
                        const remainingMs = durationMs * (1 - flight.progress_percent / 100);
                        const remainingHours = Math.floor(remainingMs / (1000 * 60 * 60));
                        const remainingMinutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
                        remainingTime = `${remainingHours}h ${remainingMinutes}m`;
                    }
                }
                return new Flight_1.Flight({
                    id: flight.fa_flight_id,
                    aircraftType: flight.aircraft_type,
                    flightDate: departureTime,
                    originAirport: `${flight.origin.code} (${flight.origin.name}, ${flight.origin.city})`,
                    destinationAirport: `${flight.destination.code} (${flight.destination.name}, ${flight.destination.city})`,
                    totalDistance: 0,
                    flightTime: flightTime,
                    remainingTime: remainingTime,
                    airline: flight.ident_icao.slice(0, 3), // Assuming the first 3 characters of ident_icao represent the airline
                });
            });
        }
        catch (error) {
            console.error('Error fetching flights from FlightAware:', error);
            throw new Error('Failed to fetch flights from FlightAware');
        }
    });
}
exports.searchFlightsByType = searchFlightsByType;
