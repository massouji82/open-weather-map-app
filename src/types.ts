import { AxiosError } from "axios";

export interface WeatherData {
  currentWeather: string,
  temp: number,
  tempMax: number,
  tempMin: number,
  humidity: string,
  sunRise: string,
  sunSet: string,
  icon: string,
  name: string;
}

export type ErrorType = Error | AxiosError;