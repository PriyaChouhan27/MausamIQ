export interface BackendWeather {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  precipitation: number;
  weatherCode: number;
}

export async function fetchCurrentWeather(
  lat: number,
  lon: number
): Promise<BackendWeather> {
  const response = await fetch(
    `http://localhost:5000/api/weather?lat=${lat}&lon=${lon}`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch weather from backend");
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || "Weather request failed");
  }

  return result.data;
}