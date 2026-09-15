import type { CurrentWeather } from '../types';

export interface BackendWeatherResponse {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  precipitation: number;
  weatherCode: number;
  pressure?: number;
  visibility?: number;
  uvIndex?: number;
  dewPoint?: number;
  sunrise?: string;
  sunset?: string;
  rainfall24h?: number;
  aqi?: number;
  pm25?: number;
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

const getAqiCategory = (
  aqi: number
): CurrentWeather['aqiCategory'] => {
  if (aqi >= 200) return 'Severe';
  if (aqi >= 150) return 'Unhealthy';
  if (aqi >= 100) return 'Unhealthy for Sensitive Groups';
  if (aqi >= 50) return 'Moderate';

  return 'Good';
};

export const normalizeWeather = (
  data: BackendWeatherResponse,
  location: {
    city: string;
    state?: string;
    country: string;
  }
): CurrentWeather => {
  const aqi = data.aqi ?? 0;

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

    pressure: data.pressure ?? 0,
    uvIndex: data.uvIndex ?? 0,
    visibility: data.visibility ?? 0,

    aqi,
    aqiCategory: getAqiCategory(aqi),

    dewPoint: data.dewPoint ?? 0,
    rainfall24h: data.rainfall24h ?? data.precipitation ?? 0,

    sunrise: data.sunrise ?? '',
    sunset: data.sunset ?? '',

    lastUpdated: new Date().toISOString(),
  };
};
