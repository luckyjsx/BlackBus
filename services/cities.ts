import api from "@/lib/api";

export interface ApiResponse<T> {
  success: boolean;
  data: T[];
}

export interface City {
  _id: string;
  name: string;
  state: string;
  country: string;
}

export type CitiesResponse = ApiResponse<City>;


export async function searchCities(query: string): Promise<City[]> {
  const response = await api.get<CitiesResponse>(`/city/search?query=${query}`);
  return response.data.data;
}