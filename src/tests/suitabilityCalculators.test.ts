import { describe, it, expect } from 'vitest';
import { 
  calculateFitnessSuitability, 
  calculateAgricultureSuitability, 
  calculateCommuterSuitability 
} from '../smart/suitabilityCalculators';
import { MOCK_WEATHER_DATA } from '../data/mockData';

describe('MausamIQ Smart Suitability Calculators', () => {
  const baseWeather = MOCK_WEATHER_DATA['delhi'];

  it('should penalize Fitness suitability when temperature is extreme (> 35°C)', () => {
    const hotWeather = { ...baseWeather, temp: 38 };
    const suitability = calculateFitnessSuitability(hotWeather);

    expect(suitability.score).toBeLessThan(70);
    expect(suitability.status).toBe('warning');
    const tempFactor = suitability.keyFactors.find(f => f.name === 'High Ambient Temp');
    expect(tempFactor).toBeDefined();
    expect(tempFactor?.impact).toBe('negative');
  });

  it('should penalize Agriculture spraying suitability when wind speed > 20 km/h', () => {
    const windyWeather = { ...baseWeather, windSpeed: 25 };
    const suitability = calculateAgricultureSuitability(windyWeather);

    const windFactor = suitability.keyFactors.find(f => f.name === 'High Wind Velocity');
    expect(windFactor).toBeDefined();
    expect(windFactor?.impact).toBe('negative');
    expect(suitability.actionTips[0]).toContain('Hold pesticide/foliar spray operations');
  });

  it('should calculate Commuter hazard level when fog visibility drops', () => {
    const foggyWeather = { ...baseWeather, visibility: 0.8, condition: 'Dense Fog' as const };
    const suitability = calculateCommuterSuitability(foggyWeather);

    expect(suitability.score).toBeLessThan(50);
    expect(suitability.status).toBe('danger');
    expect(suitability.label).toBe('Severe Road Hazard');
  });
});
