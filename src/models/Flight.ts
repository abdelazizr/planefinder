// src/models/Flight.ts

export class Flight {
  id: string;
  aircraftType: string;
  takeoffTime: string;
  originAirport: string;
  destinationAirport: string;
  totalDistance: number;
  airline: string;
  flightNumber: string;
  speedMph: number;
  timeInFlight: string;

  constructor(data: {
    id: string;
    aircraftType: string;
    takeoffTime: string;
    originAirport: string;
    destinationAirport: string;
    totalDistance: number;
    airline: string;
    flightNumber: string;
    speedMph: number;
    timeInFlight: string;
  }) {
    this.id = data.id;
    this.aircraftType = data.aircraftType;
    this.takeoffTime = this.formatDate(data.takeoffTime);
    this.originAirport = data.originAirport;
    this.destinationAirport = data.destinationAirport;
    this.totalDistance = data.totalDistance;
    this.airline = data.airline;
    this.flightNumber = data.flightNumber;
    this.speedMph = data.speedMph;
    this.timeInFlight = data.timeInFlight;
  }

  private formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });
  }
}