import { describe, it, expect } from 'vitest';
import { calculateWidgetPriorities } from '../engine/personalizationEngine';
import { MOCK_WEATHER_DATA, MOCK_SEVERE_ALERT } from '../data/mockData';

describe('MausamIQ Personalization & Ranking Engine', () => {
  const normalWeather = MOCK_WEATHER_DATA['delhi'];

  it('should force Safety Alert to Rank #1 when safety override is active', () => {
    const result = calculateWidgetPriorities({
      personaId: 'fitness',
      weather: normalWeather,
      alert: MOCK_SEVERE_ALERT,
      isSafetyOverrideActive: true
    });

    expect(result[0].id).toBe('safety_alert');
    expect(result[0].priorityScore).toBe(1000);
    expect(result[0].isSafetyOverride).toBe(true);
  });

  it('should rank persona_suitability highest for Fitness persona under normal conditions', () => {
    const result = calculateWidgetPriorities({
      personaId: 'fitness',
      weather: normalWeather,
      alert: null,
      isSafetyOverrideActive: false
    });

    expect(result[0].id).toBe('persona_suitability');
    expect(result[0].priorityScore).toBeGreaterThanOrEqual(95);
  });

  it('should rank traveler_comparison highest for Traveler persona', () => {
    const result = calculateWidgetPriorities({
      personaId: 'traveler',
      weather: normalWeather,
      alert: null,
      isSafetyOverrideActive: false
    });

    expect(result[0].id).toBe('traveler_comparison');
    expect(result[0].priorityScore).toBeGreaterThanOrEqual(95);
  });

  it('should apply dynamic boost (+25) to commuter_advisory when road visibility is poor', () => {
    const foggyWeather = {
      ...normalWeather,
      visibility: 1.2,
      condition: 'Dense Fog' as const
    };

    const result = calculateWidgetPriorities({
      personaId: 'commuter',
      weather: foggyWeather,
      alert: null,
      isSafetyOverrideActive: false
    });

    const commuterWidget = result.find(w => w.id === 'commuter_advisory');
    expect(commuterWidget).toBeDefined();
    expect(commuterWidget?.priorityScore).toBeGreaterThan(96);
    expect(commuterWidget?.reason).toContain('Low road visibility');
  });

  it('should apply dynamic boost (+20) to health_environment when AQI > 150', () => {
    const highAqiWeather = {
      ...normalWeather,
      aqi: 220
    };

    const result = calculateWidgetPriorities({
      personaId: 'health',
      weather: highAqiWeather,
      alert: null,
      isSafetyOverrideActive: false
    });

    const healthWidget = result.find(w => w.id === 'health_environment');
    expect(healthWidget).toBeDefined();
    expect(healthWidget?.reason).toContain('Elevated AQI');
  });
});
