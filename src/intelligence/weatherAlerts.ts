import type { CurrentWeather, WeatherAlert } from '../types';

export function generateWeatherAlert(
  weather: CurrentWeather
): WeatherAlert | null {
  const now = new Date().toISOString();
  const until = new Date(
    Date.now() + 6 * 60 * 60 * 1000
  ).toISOString();

  if (weather.condition === 'Thunderstorm') {
    return {
      id: 'live-thunderstorm',
      title: 'Thunderstorm Alert',
      severity: 'severe',
      category: 'thunderstorm',
      headline: `Thunderstorm conditions detected in ${weather.city}`,
      description:
        'Current weather conditions indicate a thunderstorm.',
      instruction:
        'Avoid exposed outdoor areas and seek safe shelter.',
      issuedAt: now,
      effectiveUntil: until,
    };
  }

  if (weather.visibility > 0 && weather.visibility < 1) {
    return {
      id: 'live-fog',
      title: 'Dense Fog Alert',
      severity: 'moderate',
      category: 'fog',
      headline: `Very low visibility in ${weather.city}`,
      description:
        `Visibility is currently ${weather.visibility.toFixed(1)} km.`,
      instruction:
        'Travel carefully and reduce speed when visibility is poor.',
      issuedAt: now,
      effectiveUntil: until,
    };
  }

  if (weather.aqi >= 200) {
    return {
      id: 'live-air-quality',
      title: 'Severe Air Quality Alert',
      severity: 'severe',
      category: 'air_quality',
      headline: `Severe air quality detected in ${weather.city}`,
      description:
        `Current AQI is ${weather.aqi}.`,
      instruction:
        'Avoid prolonged outdoor activity and consider reducing exposure.',
      issuedAt: now,
      effectiveUntil: until,
    };
  }

  if (weather.uvIndex >= 11) {
    return {
      id: 'live-uv',
      title: 'Extreme UV Alert',
      severity: 'severe',
      category: 'heatwave',
      headline: `Extreme UV conditions in ${weather.city}`,
      description:
        `Current UV Index is ${weather.uvIndex}.`,
      instruction:
        'Avoid prolonged direct sunlight and use strong sun protection.',
      issuedAt: now,
      effectiveUntil: until,
    };
  }

  return null;
}
