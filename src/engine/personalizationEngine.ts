import type { PersonaId, CurrentWeather, WeatherAlert, PrioritizedWidget, WidgetId } from '../types';

interface PriorityCalculationOptions {
  personaId: PersonaId;
  weather: CurrentWeather;
  alert: WeatherAlert | null;
  isSafetyOverrideActive: boolean;
}

/**
 * Base priority weights per widget type for each persona (0 to 100).
 * High base score = appears higher on homepage.
 */
const PERSONA_WIDGET_BASE_WEIGHTS: Record<PersonaId, Record<WidgetId, number>> = {
  fitness: {
    safety_alert: 0,
    persona_suitability: 95, // Outdoor running suitability
    best_time_window: 90,   // Best workout time
    hourly_forecast: 80,    // Hourly rain/temp
    current_weather: 75,    // Current weather
    health_environment: 60,  // UV & AQI impact
    daily_forecast: 50,
    commuter_advisory: 20,
    traveler_comparison: 10,
    agriculture_insights: 5,
    beach_coastal: 30,
    event_planner: 25,
    family_outdoor: 30
  },
  traveler: {
    safety_alert: 0,
    traveler_comparison: 95, // Destination forecast comparison
    hourly_forecast: 88,    // Precipitation window
    current_weather: 80,
    daily_forecast: 75,
    commuter_advisory: 65,  // Transit hazards
    persona_suitability: 60,
    best_time_window: 40,
    health_environment: 35,
    agriculture_insights: 5,
    beach_coastal: 50,
    event_planner: 30,
    family_outdoor: 30
  },
  commuter: {
    safety_alert: 0,
    commuter_advisory: 96,  // Visibility, fog, road hazard
    hourly_forecast: 90,    // Hourly rain probability curve
    current_weather: 82,
    persona_suitability: 70,
    best_time_window: 65,   // Best departure window
    daily_forecast: 50,
    health_environment: 45,
    traveler_comparison: 30,
    agriculture_insights: 5,
    beach_coastal: 10,
    event_planner: 20,
    family_outdoor: 25
  },
  agriculture: {
    safety_alert: 0,
    agriculture_insights: 98, // Evapotranspiration, soil moisture, spraying
    daily_forecast: 85,      // 7-day rainfall forecast
    hourly_forecast: 80,      // Rain probability
    current_weather: 75,
    persona_suitability: 70,
    health_environment: 40,
    best_time_window: 50,
    commuter_advisory: 20,
    traveler_comparison: 10,
    beach_coastal: 10,
    event_planner: 15,
    family_outdoor: 15
  },
  event: {
    safety_alert: 0,
    event_planner: 96,       // Outdoor venue feasibility & rain risk
    hourly_forecast: 90,     // Hourly rain probability & wind gusts
    best_time_window: 82,    // Best outdoor event window
    current_weather: 78,
    persona_suitability: 70,
    daily_forecast: 60,
    commuter_advisory: 35,
    health_environment: 40,
    traveler_comparison: 25,
    agriculture_insights: 10,
    beach_coastal: 30,
    family_outdoor: 45
  },
  health: {
    safety_alert: 0,
    health_environment: 97,  // AQI, UV index burn time, dew point
    persona_suitability: 90,  // Respiratory & outdoor exertion index
    best_time_window: 85,    // Safe outdoor hours before high UV
    current_weather: 75,
    hourly_forecast: 70,
    daily_forecast: 50,
    family_outdoor: 55,
    commuter_advisory: 30,
    traveler_comparison: 20,
    agriculture_insights: 15,
    beach_coastal: 35,
    event_planner: 25
  },
  beach: {
    safety_alert: 0,
    beach_coastal: 98,       // Swell height, ocean tide, wave flag
    persona_suitability: 88,  // Swimming & beach safety rating
    best_time_window: 84,    // Best beach tide window
    health_environment: 75,  // UV index burn risk
    current_weather: 72,
    hourly_forecast: 70,
    daily_forecast: 50,
    traveler_comparison: 40,
    commuter_advisory: 15,
    agriculture_insights: 5,
    event_planner: 30,
    family_outdoor: 40
  },
  family: {
    safety_alert: 0,
    family_outdoor: 96,      // Kids play score & stroller comfort
    best_time_window: 88,    // Best outdoor park window
    persona_suitability: 82,  // Family suitability
    health_environment: 78,  // Sun protection & AQI
    current_weather: 75,
    hourly_forecast: 70,
    daily_forecast: 55,
    event_planner: 40,
    commuter_advisory: 25,
    traveler_comparison: 30,
    agriculture_insights: 10,
    beach_coastal: 35
  }
};

/**
 * All available widgets in the application
 */
const ALL_WIDGET_CONFIGS: { id: WidgetId; title: string; category: PrioritizedWidget['category'] }[] = [
  { id: 'safety_alert', title: 'Severe Weather Emergency Alert', category: 'safety' },
  { id: 'persona_suitability', title: 'Persona Suitability Index', category: 'smart_persona' },
  { id: 'best_time_window', title: 'Best Time Recommendation Schedule', category: 'smart_persona' },
  { id: 'current_weather', title: 'Current Weather Overview', category: 'core' },
  { id: 'hourly_forecast', title: '24-Hour Interactive Timeline', category: 'forecast' },
  { id: 'daily_forecast', title: '7-Day IMD Forecast', category: 'forecast' },
  { id: 'commuter_advisory', title: 'Commuter & Transit Road Hazard', category: 'smart_persona' },
  { id: 'traveler_comparison', title: 'Destination Weather Comparison', category: 'smart_persona' },
  { id: 'agriculture_insights', title: 'Agriculture & Irrigation Insights', category: 'smart_persona' },
  { id: 'health_environment', title: 'Health, AQI & UV Advisory', category: 'smart_persona' },
  { id: 'beach_coastal', title: 'Beach, Wave & Coastal Marine Index', category: 'smart_persona' },
  { id: 'event_planner', title: 'Outdoor Event Feasibility Radar', category: 'smart_persona' },
  { id: 'family_outdoor', title: 'Family & Playground Comfort Index', category: 'smart_persona' }
];

/**
 * Calculates priority rankings for homepage widgets based on persona, context, and safety rules.
 */
export function calculateWidgetPriorities(options: PriorityCalculationOptions): PrioritizedWidget[] {
  const { personaId, weather, alert, isSafetyOverrideActive } = options;

  const baseWeights = PERSONA_WIDGET_BASE_WEIGHTS[personaId] || PERSONA_WIDGET_BASE_WEIGHTS.fitness;

  const widgets: PrioritizedWidget[] = ALL_WIDGET_CONFIGS.map(config => {
    let baseScore = baseWeights[config.id] || 30;
    let score = baseScore;
    let reason = '';
    let isSafetyOverride = false;

    // 1. SAFETY OVERRIDE LOGIC
    if (config.id === 'safety_alert') {
      if (isSafetyOverrideActive) {
        score = 1000; // Unconditional top rank
        isSafetyOverride = true;
        reason = `🚨 SAFETY OVERRIDE ACTIVE: ${alert?.title || 'Severe Thunderstorm & Flash Flood Warning'}. Safety precautions override persona preferences.`;
      } else {
        score = -100; // Hidden when no severe alert
        reason = 'No active severe weather emergency.';
      }
    } else {
      // Dynamic situational modifiers based on weather metrics
      if (config.id === 'commuter_advisory' && (weather.visibility < 3.0 || weather.condition === 'Dense Fog')) {
        score += 25;
        reason = `Promoted (+25): Low road visibility (${weather.visibility} km) detected.`;
      } else if (config.id === 'health_environment' && (weather.aqi > 150 || weather.uvIndex > 8)) {
        score += 20;
        reason = `Promoted (+20): Elevated AQI (${weather.aqi}) or intense UV Index (${weather.uvIndex}).`;
      } else if (config.id === 'agriculture_insights' && weather.rainfall24h > 15) {
        score += 20;
        reason = `Promoted (+20): Rain accumulation (${weather.rainfall24h} mm) impacts soil moisture.`;
      }

      if (!reason) {
        if (baseScore >= 90) {
          reason = `⭐ Top Priority for ${personaId.toUpperCase()} persona profile.`;
        } else if (baseScore >= 70) {
          reason = `Relevant card for ${personaId} context.`;
        } else {
          reason = `Secondary weather detail.`;
        }
      }
    }

    return {
      id: config.id,
      title: config.title,
      category: config.category,
      priorityScore: score,
      reason,
      isSafetyOverride
    };
  });

  // Filter out negative score widgets (like inactive safety alert) and sort descending by priority score
  return widgets
    .filter(w => w.priorityScore > 0)
    .sort((a, b) => b.priorityScore - a.priorityScore);
}
