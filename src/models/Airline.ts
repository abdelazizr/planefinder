// src/models/Airline.ts
export interface AirlineData {
    id: string;
    name: string;
    flights_count: number;
    last_updated: string;
  }
  
  export class Airline {
    id: string;
    name: string;
    flightsCount: number;
    lastUpdated: Date;
  
    constructor(data: AirlineData) {
      this.id = data.id;
      this.name = data.name;
      this.flightsCount = data.flights_count;
      this.lastUpdated = new Date(data.last_updated);
    }
  
    // TODO: Implement any necessary methods
  }