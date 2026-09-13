import type { CurrentWeather, SuitabilityMetric, PersonaId } from '../types';

/**
 * Deterministic suitability calculator for Fitness persona
 */
export function calculateFitnessSuitability(weather: CurrentWeather): SuitabilityMetric {
  let score = 100;
  const factors: SuitabilityMetric['keyFactors'] = [];
  const tips: string[] = [];

  // Temperature penalty: Ideal is 16-24°C
  if (weather.temp > 35) {
    score -= 40;
    factors.push({ name: 'High Ambient Temp', impact: 'negative', detail: `${weather.temp}°C presents severe heat stress risk during exercise.` });
    tips.push('Avoid outdoor workouts during peak afternoon heat.');
  } else if (weather.temp > 28) {
    score -= 20;
    factors.push({ name: 'Warm Temperature', impact: 'negative', detail: `${weather.temp}°C causes faster fatigue and sweat rate.` });
    tips.push('Increase fluid intake by at least 500ml per 30 mins of exercise.');
  } else if (weather.temp < 10) {
    score -= 15;
    factors.push({ name: 'Cool Temperature', impact: 'negative', detail: `${weather.temp}°C requires muscle warm-up routines.` });
    tips.push('Wear layered thermal compression gear.');
  } else {
    factors.push({ name: 'Ideal Temperature', impact: 'positive', detail: `${weather.temp}°C is optimal for cardiorespiratory performance.` });
  }

  // Humidity penalty
  if (weather.humidity > 80) {
    score -= 20;
    factors.push({ name: 'High Humidity', impact: 'negative', detail: `${weather.humidity}% humidity impairs sweat evaporation.` });
    tips.push('Pace yourself; reduce target running speed by 10-15%.');
  } else {
    factors.push({ name: 'Comfortable Humidity', impact: 'positive', detail: `${weather.humidity}% humidity allows normal thermoregulation.` });
  }

  // AQI penalty
  if (weather.aqi > 200) {
    score -= 50;
    factors.push({ name: 'Poor Air Quality', impact: 'negative', detail: `AQI ${weather.aqi} is dangerous for deep breathing workouts.` });
    tips.push('Switch to indoor gym workouts today.');
  } else if (weather.aqi > 100) {
    score -= 15;
    factors.push({ name: 'Moderate AQI', impact: 'negative', detail: `AQI ${weather.aqi} may irritate sensitive airways.` });
  }

  // Rain/Condition
  if (weather.condition === 'Heavy Rain' || weather.condition === 'Thunderstorm') {
    score -= 45;
    factors.push({ name: 'Severe Weather', impact: 'negative', detail: `${weather.condition} poses slip & lightning hazards.` });
    tips.push('Postpone outdoor runs until storm cells pass.');
  }

  score = Math.max(0, Math.min(100, Math.round(score)));

  let label = 'Excellent';
  let status: SuitabilityMetric['status'] = 'optimal';
  if (score < 40) {
    label = 'Unfavorable / Hazardous';
    status = 'danger';
  } else if (score < 70) {
    label = 'Moderate / Caution';
    status = 'warning';
  } else if (score < 85) {
    label = 'Good';
    status = 'moderate';
  }

  return {
    score,
    label,
    status,
    summary: `Outdoor workout suitability is ${label} (${score}/100).`,
    keyFactors: factors,
    bestWindow: {
      start: '06:00 AM',
      end: '08:00 AM',
      note: 'Lowest temp & mild UV index make morning ideal.'
    },
    actionTips: tips.length > 0 ? tips : ['Maintain hydration and wear breathable athletic fabric.']
  };
}

/**
 * Deterministic suitability calculator for Agriculture persona
 */
export function calculateAgricultureSuitability(weather: CurrentWeather): SuitabilityMetric {
  let score = 85;
  const factors: SuitabilityMetric['keyFactors'] = [];
  const tips: string[] = [];

  // Spraying suitability depends on wind speed (< 15 km/h) & rain
  if (weather.windSpeed > 20) {
    score -= 30;
    factors.push({ name: 'High Wind Velocity', impact: 'negative', detail: `${weather.windSpeed} km/h causes severe spray drift loss.` });
    tips.push('Hold pesticide/foliar spray operations due to drift hazard.');
  } else {
    factors.push({ name: 'Favorable Spray Wind', impact: 'positive', detail: `${weather.windSpeed} km/h is within safe spraying thresholds.` });
  }

  // Fungal risk index: high temp + high humidity (>75%)
  if (weather.humidity > 75 && weather.temp > 25) {
    factors.push({ name: 'High Fungal Disease Risk', impact: 'negative', detail: `${weather.humidity}% humidity at ${weather.temp}°C favors blight & mildew.` });
    tips.push('Monitor leaves for early signs of fungal infection; consider preventive bio-fungicide.');
  }

  if (weather.rainfall24h > 20) {
    score -= 25;
    factors.push({ name: 'Heavy Soil Saturation', impact: 'negative', detail: `${weather.rainfall24h} mm rainfall registered in 24h.` });
    tips.push('Ensure field drainage channels are cleared to prevent waterlogging root damage.');
  } else {
    factors.push({ name: 'Moderate Moisture', impact: 'positive', detail: `Soil moisture retention is healthy.` });
  }

  score = Math.max(0, Math.min(100, Math.round(score)));

  let label = score > 75 ? 'Optimal for Farming' : score > 50 ? 'Moderate Spray/Irri Risk' : 'Unfavorable Conditions';
  let status: SuitabilityMetric['status'] = score > 75 ? 'optimal' : score > 50 ? 'warning' : 'danger';

  return {
    score,
    label,
    status,
    summary: `Agronomic work conditions are rated as ${label} (${score}/100).`,
    keyFactors: factors,
    bestWindow: {
      start: '07:00 AM',
      end: '10:30 AM',
      note: 'Optimal evapotranspiration rate before mid-day heat.'
    },
    actionTips: tips.length > 0 ? tips : ['Field operations can proceed normally.']
  };
}

/**
 * Deterministic suitability calculator for Traveler persona
 */
export function calculateTravelerSuitability(weather: CurrentWeather, destName: string = 'Destination'): SuitabilityMetric {
  let score = 90;
  const factors: SuitabilityMetric['keyFactors'] = [];
  const tips: string[] = [];

  if (weather.visibility < 3.0) {
    score -= 35;
    factors.push({ name: 'Poor Road/Air Visibility', impact: 'negative', detail: `${weather.visibility} km visibility may cause flight & highway delays.` });
    tips.push('Allow extra travel time for transit; check airline/train live status.');
  } else {
    factors.push({ name: 'Clear Transit Conditions', impact: 'positive', detail: `${weather.visibility} km highway visibility.` });
  }

  if (weather.condition === 'Thunderstorm' || weather.condition === 'Heavy Rain') {
    score -= 40;
    factors.push({ name: 'Adverse Weather Warning', impact: 'negative', detail: `${weather.condition} expected in transit corridor.` });
    tips.push('Pack waterproof gear and rain covers for travel luggage.');
  }

  score = Math.max(0, Math.min(100, Math.round(score)));
  let status: SuitabilityMetric['status'] = score > 75 ? 'optimal' : score > 50 ? 'warning' : 'danger';

  return {
    score,
    label: score > 75 ? 'Great Travel Weather' : 'Travel Delays Possible',
    status,
    summary: `Travel index for ${weather.city} to ${destName} is ${score}/100.`,
    keyFactors: factors,
    actionTips: tips.length > 0 ? tips : ['Conditions are favorable for smooth travel.']
  };
}

/**
 * Deterministic suitability calculator for Commuter persona
 */
export function calculateCommuterSuitability(weather: CurrentWeather): SuitabilityMetric {
  let score = 95;
  const factors: SuitabilityMetric['keyFactors'] = [];
  const tips: string[] = [];

  if (weather.visibility < 1.5 || weather.condition === 'Dense Fog') {
    score -= 50;
    factors.push({ name: 'Severe Fog Hazard', impact: 'negative', detail: `Low visibility (${weather.visibility} km) creates heavy traffic congestion.` });
    tips.push('Use fog lights and keep double vehicle distance on expressways.');
  } else if (weather.visibility < 4.0) {
    score -= 20;
    factors.push({ name: 'Moderate Fog/Haze', impact: 'negative', detail: `Visibility is reduced to ${weather.visibility} km.` });
  }

  if (weather.condition === 'Heavy Rain' || weather.rainfall24h > 15) {
    score -= 30;
    factors.push({ name: 'Waterlogged Roads', impact: 'negative', detail: `Standing water risk at low-lying underpasses.` });
    tips.push('Avoid waterlogged underpasses; use alternate elevated corridors.');
  }

  score = Math.max(0, Math.min(100, Math.round(score)));
  let status: SuitabilityMetric['status'] = score > 75 ? 'optimal' : score > 50 ? 'warning' : 'danger';

  return {
    score,
    label: score > 80 ? 'Smooth Commute' : score > 50 ? 'Moderate Delays' : 'Severe Road Hazard',
    status,
    summary: `Commute Safety & Hazard Index is ${score}/100.`,
    keyFactors: factors,
    bestWindow: {
      start: '07:30 AM',
      end: '08:45 AM',
      note: 'Lowest hazard window before localized shower onset.'
    },
    actionTips: tips.length > 0 ? tips : ['Traffic flow is normal. Commute as scheduled.']
  };
}

/**
 * Generic dispatcher for persona suitability calculation
 */
export function getSuitabilityForPersona(personaId: PersonaId, weather: CurrentWeather): SuitabilityMetric {
  switch (personaId) {
    case 'fitness':
      return calculateFitnessSuitability(weather);
    case 'agriculture':
      return calculateAgricultureSuitability(weather);
    case 'traveler':
      return calculateTravelerSuitability(weather, 'Shimla');
    case 'commuter':
      return calculateCommuterSuitability(weather);
    case 'health':
      return {
        score: Math.max(10, 100 - Math.round(weather.aqi / 3) - (weather.uvIndex > 8 ? 20 : 0)),
        label: weather.aqi < 100 ? 'Good Respiratory Index' : 'Caution Required',
        status: weather.aqi > 150 ? 'danger' : weather.aqi > 100 ? 'warning' : 'optimal',
        summary: `Air quality (AQI ${weather.aqi}) and UV index (${weather.uvIndex}) dictate health precautions.`,
        keyFactors: [
          { name: 'AQI Level', impact: weather.aqi > 100 ? 'negative' : 'positive', detail: `Air Quality Index is ${weather.aqi} (${weather.aqiCategory}).` },
          { name: 'UV Intensity', impact: weather.uvIndex > 8 ? 'negative' : 'neutral', detail: `Peak UV Index of ${weather.uvIndex} requires SPF 50+ protection.` }
        ],
        actionTips: weather.aqi > 150 ? ['Wear N95 respiratory mask outdoors.', 'Use indoor HEPA air purification.'] : ['Healthy outdoors for sensitive groups before noon.']
      };
    case 'beach':
      return {
        score: weather.windSpeed > 30 ? 30 : 85,
        label: weather.windSpeed > 30 ? 'High Surf Warning' : 'Safe Beach Conditions',
        status: weather.windSpeed > 30 ? 'danger' : 'optimal',
        summary: `Sea swell moderate (1.1m); water temp 28°C. Wind speed ${weather.windSpeed} km/h.`,
        keyFactors: [
          { name: 'Sea State', impact: 'positive', detail: 'Moderate swell height with steady coastal breeze.' },
          { name: 'UV Intensity', impact: 'negative', detail: `UV ${weather.uvIndex} implies high skin burn risk within 25 mins.` }
        ],
        bestWindow: { start: '07:00 AM', end: '11:00 AM', note: 'Optimal tide state & milder UV rays.' },
        actionTips: ['Check lifeguard flags at beach entrance.', 'Re-apply water resistant sunscreen every 2 hours.']
      };
    case 'event':
      return {
        score: weather.condition === 'Thunderstorm' ? 20 : weather.humidity > 80 ? 60 : 88,
        label: weather.condition === 'Thunderstorm' ? 'High Rain Risk' : 'Favorable Event Weather',
        status: weather.condition === 'Thunderstorm' ? 'danger' : 'optimal',
        summary: `Outdoor event feasibility score is ${weather.condition === 'Thunderstorm' ? '20' : '88'}/100.`,
        keyFactors: [
          { name: 'Precipitation Risk', impact: 'positive', detail: 'Low chance of rainfall during planned venue hours.' },
          { name: 'Thermal Comfort', impact: 'neutral', detail: `${weather.temp}°C ambient temp with humidity of ${weather.humidity}%.` }
        ],
        actionTips: ['Ensure canopy anchoring against sudden gusty winds.', 'Arrange adequate misting fans/cooling stations.']
      };
    case 'family':
      return {
        score: weather.temp > 38 ? 35 : 82,
        label: weather.temp > 38 ? 'Too Hot For Toddlers' : 'Great Park Weather',
        status: weather.temp > 38 ? 'danger' : 'optimal',
        summary: `Kids outdoor play rating is ${weather.temp > 38 ? '35' : '82'}/100.`,
        keyFactors: [
          { name: 'Shade & Stroller Comfort', impact: 'positive', detail: 'Pleasant morning temperatures for stroller walks.' },
          { name: 'Hydration Need', impact: 'neutral', detail: 'Keep children hydrated with fruit juices/water.' }
        ],
        bestWindow: { start: '08:00 AM', end: '10:30 AM', note: 'Shaded playground comfort is peak.' },
        actionTips: ['Bring water bottles and wide-brim hats for toddlers.']
      };
  }
}
