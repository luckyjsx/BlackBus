import api from "@/lib/api";

// types/bus.ts

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Stop {
  _id: string;
  stop_name: string;
  arrival_time: string;   // ISO string
  departure_time: string; // ISO string
  coordinates: Coordinates;
  __v: number;
}

export interface Route {
  _id: string;
  routeNumber: string;
  routeName: string;
  startLocation: string;
  endLocation: string;
  distance: number;
  estimatedTime: number;
  stops: Stop[];
  status: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  __v: number;
}

export interface Bus {
  _id: string;
  name: string;
  busNumber: string;
  routeId: Route;
  from: string;
  to: string;
  departureTime: string; // e.g. "08:30"
  arrivalTime: string;   // e.g. "13:00"
  date: string;          // ISO string (day of journey)
  price: number;
  seatsAvailable: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SearchBusResponse {
  data: Bus[];
}


export const searchBus = async (fromCityId: string, toCityId: string, date: string) => {
  const response = await api.get<SearchBusResponse>(`/bus/search?from=${fromCityId}&to=${toCityId}&date=${date}`);
  return response.data;
}