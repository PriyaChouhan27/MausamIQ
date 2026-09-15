import type { CurrentWeather } from '../types';

export interface BackendWeatherResponse {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  precipitation: number;
  weatherCode: number;
}

const getConditionFromWeatherCode = (
  code: number
): CurrentWeather['condition'] => {
  if (code === 0) return 'Sunny';
  if (code <= 3) return 'Partly Cloudy';
  if (code >= 95) return 'Thunderstorm';
  if (code >= 51 && code <= 67) return 'Heavy Rain';
  if (code >= 80 && code <= 82) return 'Heavy Rain';
  if (code >= 45 && code <= 48) return 'Dense Fog';

  return 'Partly Cloudy';
};

const getWindDirection = (degrees: number): string => {
  const directions = [
    'N',
    'NE',
    'E',
    'SE',
    'S',
    'SW',
    'W',
    'NW',
  ];

  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

export const normalizeWeather = (
  data: BackendWeatherResponse,
  location: {
    city: string;
    state?: string;
    country: string;
  }
): CurrentWeather => {
  return {
    city: location.city,
    state: location.state ?? '',

    country: location.country,

    temp: data.temperature,
    feelsLike: data.apparentTemperature,

    condition: getConditionFromWeatherCode(data.weatherCode),
    conditionCode: String(data.weatherCode),

    humidity: data.humidity,

    windSpeed: data.windSpeed,
    windDirection: getWindDirection(data.windDirection),

    pressure: 0,
    uvIndex: 0,
    visibility: 0,

    aqi: 0,
    aqiCategory: 'Good',

    dewPoint: 0,
    rainfall24h: 0,

    sunrise: '',
    sunset: '',

    lastUpdated: new Date().toISOString(),
  };
};