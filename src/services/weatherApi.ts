
export interface BackendWeather {
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

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export async function fetchCurrentWeather(
  lat: number,
  lon: number
): Promise<BackendWeather> {
  const response = await fetch(
    `${API_BASE_URL}/api/weather?lat=${lat}&lon=${lon}`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch weather from backend");
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(
      result.error || "Weather request failed"
    );
  }

  return result.data;
}
