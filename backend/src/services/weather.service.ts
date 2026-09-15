const WEATHER_API_URL =
  "https://api.open-meteo.com/v1/forecast";

const AIR_QUALITY_API_URL =
  "https://air-quality-api.open-meteo.com/v1/air-quality";

// Get current weather
export async function getWeather(lat: number, lon: number) {
  const weatherUrl =
    `${WEATHER_API_URL}` +
    `?latitude=${lat}` +
    `&longitude=${lon}` +
    `&current=` +
    `temperature_2m,relative_humidity_2m,apparent_temperature,` +
    `wind_speed_10m,wind_direction_10m,precipitation,weather_code,` +
    `surface_pressure,visibility,uv_index,dew_point_2m` +
    `&daily=sunrise,sunset,precipitation_sum` +
    `&timezone=auto`;

  const airQualityUrl =
    `${AIR_QUALITY_API_URL}` +
    `?latitude=${lat}` +
    `&longitude=${lon}` +
    `&current=european_aqi,pm2_5` +
    `&timezone=auto`;

  const [weatherResponse, airQualityResponse] =
    await Promise.all([
      fetch(weatherUrl),
      fetch(airQualityUrl),
    ]);

  if (!weatherResponse.ok) {
    throw new Error("Weather service is currently unavailable");
  }

  if (!airQualityResponse.ok) {
    throw new Error("Air quality service is currently unavailable");
  }

  const data = await weatherResponse.json();
  const airQualityData = await airQualityResponse.json();

  if (!data.current) {
    throw new Error("Current weather data is not available");
  }

  if (!data.daily) {
    throw new Error("Daily weather data is not available");
  }

  if (!airQualityData.current) {
    throw new Error("Air quality data is not available");
  }

  return {
    temperature: data.current.temperature_2m,
    apparentTemperature: data.current.apparent_temperature,
    humidity: data.current.relative_humidity_2m,

    windSpeed: data.current.wind_speed_10m,
    windDirection: data.current.wind_direction_10m,

    precipitation: data.current.precipitation,
    weatherCode: data.current.weather_code,

    pressure: data.current.surface_pressure,
    visibility: data.current.visibility,
    uvIndex: data.current.uv_index,
    dewPoint: data.current.dew_point_2m,

    sunrise: data.daily.sunrise?.[0],
    sunset: data.daily.sunset?.[0],

    rainfall24h: data.daily.precipitation_sum?.[0] ?? 0,

    aqi: airQualityData.current.european_aqi,
    pm25: airQualityData.current.pm2_5,
  };
}

// Get weather forecast
export async function getForecast(lat: number, lon: number) {
  const url =
    `${WEATHER_API_URL}` +
    `?latitude=${lat}` +
    `&longitude=${lon}` +
    `&daily=temperature_2m_max,temperature_2m_min,` +
    `precipitation_probability_max,weather_code` +
    `&timezone=auto`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Forecast service is currently unavailable");
  }

  const data = await response.json();

  if (!data.daily) {
    throw new Error("Forecast data is not available");
  }

  return {
    dates: data.daily.time,
    maxTemperature: data.daily.temperature_2m_max,
    minTemperature: data.daily.temperature_2m_min,
    precipitationProbability:
      data.daily.precipitation_probability_max,
    weatherCode: data.daily.weather_code,
  };
}