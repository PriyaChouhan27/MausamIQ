import type { PersonaProfile, CurrentWeather, HourlyForecast, DailyForecast, WeatherAlert, LocationData } from '../types';

export const PERSONAS: PersonaProfile[] = [
  {
    id: 'fitness',
    name: 'Fitness & Outdoor',
    shortDesc: 'Running, cycling, workouts & optimal exercise times',
    iconName: 'Activity',
    tagline: 'Tailored for runners, athletes, and outdoor enthusiasts',
    accentColor: '#10B981', // Emerald green
    primaryMetrics: ['Temperature', 'Humidity', 'Wind Speed', 'Best Exercise Window'],
    sampleRecommendation: 'Ideal running conditions between 06:00 AM - 08:00 AM. Thermal comfort is optimal.'
  },
  {
    id: 'traveler',
    name: 'Traveler & Explorer',
    shortDesc: 'Destination forecasts, travel suitability & trip advisories',
    iconName: 'Compass',
    tagline: 'Contextual updates for tourists, trips & long journeys',
    accentColor: '#3B82F6', // Blue
    primaryMetrics: ['Destination Forecast', 'Rain Probability', 'Visibility', 'Travel Risk'],
    sampleRecommendation: 'Manali destination clear; road visibility optimal. Pack lightweight thermal jackets.'
  },
  {
    id: 'commuter',
    name: 'Daily Commuter',
    shortDesc: 'Traffic hazard index, visibility, fog & sudden downpour alerts',
    iconName: 'Car',
    tagline: 'Focused on road safety, visibility, and timely transit',
    accentColor: '#F59E0B', // Amber
    primaryMetrics: ['Road Hazard Index', 'Visibility', 'Precipitation Window', 'Commute Score'],
    sampleRecommendation: 'Morning commute hazard is Low. Evening rain window starts at 05:30 PM.'
  },
  {
    id: 'agriculture',
    name: 'Agriculture & Garden',
    shortDesc: 'Soil moisture, evapotranspiration, rain curve & pest risks',
    iconName: 'Sprout',
    tagline: 'Actionable farming insights for crop care, irrigation & spraying',
    accentColor: '#84CC16', // Lime green
    primaryMetrics: ['Rainfall (mm)', 'Evapotranspiration', 'Humidity', 'Spraying Suitability'],
    sampleRecommendation: 'Favorable window for fertilizer application. Soil moisture index is 68%.'
  },
  {
    id: 'event',
    name: 'Event Planner',
    shortDesc: 'Outdoor gathering viability, rain probability & wind gust alerts',
    iconName: 'Calendar',
    tagline: 'Precision forecasting for outdoor weddings, sports & concerts',
    accentColor: '#8B5CF6', // Purple
    primaryMetrics: ['Outdoor Viability', 'Rain Probability curve', 'Wind Gusts', 'Comfort Index'],
    sampleRecommendation: 'Outdoor venue feasibility is 85%. Low risk of rain before 07:00 PM.'
  },
  {
    id: 'health',
    name: 'Health & Respiratory',
    shortDesc: 'Air Quality (AQI), UV index burn warnings & allergens',
    iconName: 'HeartPulse',
    tagline: 'Personal protection for asthma, sensitive health & UV burn risk',
    accentColor: '#EC4899', // Pink
    primaryMetrics: ['AQI Index', 'UV Index', 'Humidity / Dew Point', 'Hydration Need'],
    sampleRecommendation: 'AQI is Moderate (112). Outdoor physical exertion should be limited after 11 AM due to UV 8.'
  },
  {
    id: 'beach',
    name: 'Beach & Coastal',
    shortDesc: 'Wave height, tide timing, wind surf conditions & ocean safety',
    iconName: 'Waves',
    tagline: 'Coastal recommendations for swimming, surfing, and beachgoers',
    accentColor: '#06B6D4', // Cyan
    primaryMetrics: ['Wave Height', 'Wind Direction', 'UV Index', 'Swimming Flag'],
    sampleRecommendation: 'Yellow Flag at Calangute Beach: Moderate swell (1.2m). Best beach hours before 11:30 AM.'
  },
  {
    id: 'family',
    name: 'Family & Parent',
    shortDesc: 'Kids outdoor play score, stroller comfort & sun protection',
    iconName: 'Users',
    tagline: 'Family outdoor planning, park comfort, and child sun safety',
    accentColor: '#F97316', // Orange
    primaryMetrics: ['Kids Play Score', 'Stroller Comfort', 'UV Protection', 'Park Weather'],
    sampleRecommendation: 'Park outing score is High (88/100). Apply sunscreen (SPF 30+) for kids outdoor play.'
  }
];

export const LOCATIONS: LocationData[] = [
  { id: 'delhi', name: 'New Delhi', state: 'Delhi NCR' },
  { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra' },
  { id: 'bengaluru', name: 'Bengaluru', state: 'Karnataka' },
  { id: 'shimla', name: 'Shimla', state: 'Himachal Pradesh', isDestination: true },
  { id: 'goa', name: 'Panaji', state: 'Goa', isDestination: true },
  { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu' }
];

export const MOCK_WEATHER_DATA: Record<string, CurrentWeather> = {
  delhi: {
    city: 'New Delhi',
    state: 'Delhi NCR',
    country: 'India',
    temp: 28,
    feelsLike: 30,
    condition: 'Partly Cloudy',
    conditionCode: 'partly_cloudy',
    humidity: 62,
    windSpeed: 14,
    windDirection: 'NW',
    pressure: 1012,
    uvIndex: 7,
    visibility: 5.5,
    aqi: 138,
    aqiCategory: 'Moderate',
    dewPoint: 19,
    rainfall24h: 2.4,
    sunrise: '06:08 AM',
    sunset: '06:34 PM',
    lastUpdated: 'Just now'
  },
  mumbai: {
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    temp: 31,
    feelsLike: 36,
    condition: 'Sunny',
    conditionCode: 'sunny',
    humidity: 78,
    windSpeed: 22,
    windDirection: 'SW',
    pressure: 1008,
    uvIndex: 9,
    visibility: 8.0,
    aqi: 82,
    aqiCategory: 'Moderate',
    dewPoint: 24,
    rainfall24h: 0,
    sunrise: '06:24 AM',
    sunset: '06:48 PM',
    lastUpdated: 'Just now'
  },
  bengaluru: {
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    temp: 24,
    feelsLike: 24,
    condition: 'Partly Cloudy',
    conditionCode: 'partly_cloudy',
    humidity: 55,
    windSpeed: 18,
    windDirection: 'E',
    pressure: 1016,
    uvIndex: 6,
    visibility: 10.0,
    aqi: 45,
    aqiCategory: 'Good',
    dewPoint: 14,
    rainfall24h: 0,
    sunrise: '06:12 AM',
    sunset: '06:28 PM',
    lastUpdated: 'Just now'
  },
  shimla: {
    city: 'Shimla',
    state: 'Himachal Pradesh',
    country: 'India',
    temp: 16,
    feelsLike: 15,
    condition: 'Partly Cloudy',
    conditionCode: 'partly_cloudy',
    humidity: 48,
    windSpeed: 10,
    windDirection: 'N',
    pressure: 1022,
    uvIndex: 5,
    visibility: 9.0,
    aqi: 28,
    aqiCategory: 'Good',
    dewPoint: 5,
    rainfall24h: 0,
    sunrise: '06:05 AM',
    sunset: '06:36 PM',
    lastUpdated: 'Just now'
  },
  goa: {
    city: 'Panaji',
    state: 'Goa',
    country: 'India',
    temp: 30,
    feelsLike: 35,
    condition: 'Sunny',
    conditionCode: 'sunny',
    humidity: 74,
    windSpeed: 16,
    windDirection: 'W',
    pressure: 1010,
    uvIndex: 9,
    visibility: 9.5,
    aqi: 52,
    aqiCategory: 'Moderate',
    dewPoint: 22,
    rainfall24h: 0,
    sunrise: '06:22 AM',
    sunset: '06:45 PM',
    lastUpdated: 'Just now'
  },
  chennai: {
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    temp: 33,
    feelsLike: 39,
    condition: 'Extreme Heat',
    conditionCode: 'extreme_heat',
    humidity: 82,
    windSpeed: 12,
    windDirection: 'SE',
    pressure: 1006,
    uvIndex: 11,
    visibility: 7.0,
    aqi: 95,
    aqiCategory: 'Moderate',
    dewPoint: 26,
    rainfall24h: 0,
    sunrise: '06:02 AM',
    sunset: '06:21 PM',
    lastUpdated: 'Just now'
  }
};

// Simulated severe weather scenarios for live testing
export const WEATHER_SCENARIOS: Record<string, Partial<CurrentWeather>> = {
  normal: {},
  heavy_rain: {
    condition: 'Heavy Rain',
    temp: 22,
    feelsLike: 22,
    humidity: 95,
    windSpeed: 38,
    rainfall24h: 64.5,
    visibility: 2.1
  },
  severe_heatwave: {
    condition: 'Extreme Heat',
    temp: 43,
    feelsLike: 47,
    humidity: 35,
    uvIndex: 11,
    aqi: 220,
    aqiCategory: 'Unhealthy'
  },
  dense_fog: {
    condition: 'Dense Fog',
    temp: 12,
    humidity: 98,
    visibility: 0.3,
    aqi: 280,
    aqiCategory: 'Severe'
  }
};

export const MOCK_SEVERE_ALERT: WeatherAlert = {
  id: 'alert_imd_2026_0913',
  title: 'ORANGE WARNING: Severe Thunderstorm & Flash Flood Risk',
  severity: 'severe',
  category: 'thunderstorm',
  headline: 'IMD Alert: Squally winds (55-65 km/h) & intense rainfall expected',
  description: 'Severe convective cloud development detected over the sector. Heavy to very heavy rainfall accompanied by lightning activity and localized urban flooding in low-lying transit routes.',
  instruction: 'Avoid outdoor exercise, sea activities, and open field farming. Secure loose outdoor items. Stay indoors away from electrical structures.',
  issuedAt: 'Today, 10:15 AM (IMD Regional Centre)',
  effectiveUntil: 'Today, 06:00 PM'
};

export const MOCK_HOURLY_FORECAST: HourlyForecast[] = [
  { time: '06:00 AM', temp: 22, condition: 'Clear', rainProbability: 5, humidity: 70, windSpeed: 10, uvIndex: 1 },
  { time: '08:00 AM', temp: 25, condition: 'Sunny', rainProbability: 10, humidity: 65, windSpeed: 12, uvIndex: 4 },
  { time: '10:00 AM', temp: 28, condition: 'Sunny', rainProbability: 15, humidity: 60, windSpeed: 15, uvIndex: 7 },
  { time: '12:00 PM', temp: 31, condition: 'Partly Cloudy', rainProbability: 25, humidity: 58, windSpeed: 18, uvIndex: 9 },
  { time: '02:00 PM', temp: 32, condition: 'Partly Cloudy', rainProbability: 35, humidity: 62, windSpeed: 20, uvIndex: 8 },
  { time: '04:00 PM', temp: 30, condition: 'Chance Rain', rainProbability: 60, humidity: 72, windSpeed: 24, uvIndex: 4 },
  { time: '06:00 PM', temp: 27, condition: 'Light Rain', rainProbability: 75, humidity: 82, windSpeed: 22, uvIndex: 1 },
  { time: '08:00 PM', temp: 25, condition: 'Overcast', rainProbability: 40, humidity: 85, windSpeed: 14, uvIndex: 0 },
  { time: '10:00 PM', temp: 24, condition: 'Clear', rainProbability: 15, humidity: 80, windSpeed: 10, uvIndex: 0 }
];

export const MOCK_DAILY_FORECAST: DailyForecast[] = [
  { day: 'Today', date: '13 Sep', tempMax: 32, tempMin: 22, condition: 'Partly Cloudy / Afternoon Rain', rainProbability: 65, summary: 'Warm morning with thunder showers in afternoon' },
  { day: 'Mon', date: '14 Sep', tempMax: 30, tempMin: 21, condition: 'Moderate Rain', rainProbability: 80, summary: 'Intermittent heavy spells expected across city' },
  { day: 'Tue', date: '15 Sep', tempMax: 29, tempMin: 20, condition: 'Thunderstorm', rainProbability: 70, summary: 'Gusty winds with electrical activity in morning' },
  { day: 'Wed', date: '16 Sep', tempMax: 31, tempMin: 22, condition: 'Partly Cloudy', rainProbability: 30, summary: 'Improving weather; pleasant outdoor afternoon' },
  { day: 'Thu', date: '17 Sep', tempMax: 33, tempMin: 23, condition: 'Sunny', rainProbability: 10, summary: 'Clear blue skies with high sunshine' },
  { day: 'Fri', date: '18 Sep', tempMax: 34, tempMin: 24, condition: 'Sunny', rainProbability: 15, summary: 'Warm weather continues, light evening breeze' },
  { day: 'Sat', date: '19 Sep', tempMax: 32, tempMin: 23, condition: 'Partly Cloudy', rainProbability: 25, summary: 'Good weekend outdoor conditions' }
];
