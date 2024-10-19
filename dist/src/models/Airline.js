"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Airline = void 0;
class Airline {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.flightsCount = data.flights_count;
        this.lastUpdated = new Date(data.last_updated);
    }
}
exports.Airline = Airline;
