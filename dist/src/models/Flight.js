"use strict";
// src/models/Flight.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flight = void 0;
class Flight {
    constructor(data) {
        this.id = data.id;
        this.aircraftType = data.aircraftType;
        this.flightDate = data.flightDate;
        this.originAirport = data.originAirport;
        this.destinationAirport = data.destinationAirport;
        this.totalDistance = data.totalDistance;
        this.flightTime = data.flightTime;
        this.remainingTime = data.remainingTime;
        this.airline = data.airline;
    }
}
exports.Flight = Flight;
