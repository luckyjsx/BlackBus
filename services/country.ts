import api from '../lib/api';

export interface Country {
  _id: string;
  name: string;
  image: string;
  availableLanguages: string[];
  createdAt: string;
  updatedAt: string;
}

interface CountryResponse {
  success: boolean;
  message: string;
  data: Country[] | Country;
}

export async function getCountries(): Promise<Country[]> {
  const response = await api.get<CountryResponse>('/countries');
  const data = response.data.data;
  return Array.isArray(data) ? data : [data];
}
