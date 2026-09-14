export async function getWeather(lat: number, lon: number) {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}` +
    `&longitude=${lon}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,wind_direction_10m,precipitation,weather_code`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Weather service is currently unavailable");
  }

  const data = await response.json();

  return {
    temperature: data.current.temperature_2m,
    apparentTemperature: data.current.apparent_temperature,
    humidity: data.current.relative_humidity_2m,
    windSpeed: data.current.wind_speed_10m,
    windDirection: data.current.wind_direction_10m,
    precipitation: data.current.precipitation,
    weatherCode: data.current.weather_code,
  };
}

export async function getForecast(lat: number, lon: number) {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}` +
    `&longitude=${lon}` +
    `&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code` +
    `&timezone=auto`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Forecast service is currently unavailable");
  }

  const data = await response.json();

  return {
    dates: data.daily.time,
    maxTemperature: data.daily.temperature_2m_max,
    minTemperature: data.daily.temperature_2m_min,
    precipitationProbability: data.daily.precipitation_probability_max,
    weatherCode: data.daily.weather_code,
  };
}