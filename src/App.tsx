import React, { useState, useMemo, useEffect } from 'react';
import type { PersonaId } from './types';

import {
  PERSONAS,
  MOCK_WEATHER_DATA,
  WEATHER_SCENARIOS,
  MOCK_SEVERE_ALERT
} from './data/mockData';

import { getSuitabilityForPersona } from './smart/suitabilityCalculators';
import { calculateWidgetPriorities } from './engine/personalizationEngine';

import { Navbar } from './components/Navbar';
import { PersonaSelector } from './components/PersonaSelector';
import { PrioritizedGrid } from './components/PrioritizedGrid';
import { ExplainabilityModal } from './components/ExplainabilityModal';
import { PersonalizedInsightCard } from './components/PersonalizedInsightCard';

import {
  fetchCurrentWeather,
  type BackendWeather
} from './services/weatherApi';

import { normalizeWeather } from './data/weatherAdapter';

export const App: React.FC = () => {
  const [activePersonaId, setActivePersonaId] =
    useState<PersonaId>('fitness');

  const [currentCityId, setCurrentCityId] =
    useState<string>('hyderabad');

  const [activeScenario, setActiveScenario] =
    useState<string>('normal');

  const [isSafetyOverrideActive, setIsSafetyOverrideActive] =
    useState<boolean>(false);

  const [isExplainabilityOpen, setIsExplainabilityOpen] =
    useState<boolean>(false);

  const [backendWeather, setBackendWeather] =
    useState<BackendWeather | null>(null);

  const [weatherLoading, setWeatherLoading] =
    useState<boolean>(true);

  const [weatherError, setWeatherError] =
    useState<string | null>(null);

  // Fetch live weather from backend
  useEffect(() => {
    let cancelled = false;

    setWeatherLoading(true);

    fetchCurrentWeather(17.3850, 78.4867)
      .then((weather) => {
        if (!cancelled) {
          setBackendWeather(weather);
          setWeatherError(null);
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setWeatherError(
            error instanceof Error
              ? error.message
              : 'Unable to load live weather'
          );
        }
      })
      .finally(() => {
        if (!cancelled) {
          setWeatherLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Use live backend weather when available
  const currentWeather = useMemo(() => {
    const base =
      MOCK_WEATHER_DATA[currentCityId] ||
      MOCK_WEATHER_DATA['delhi'];

    // Fallback to mock weather if backend is unavailable
    if (!backendWeather) {
      const scenario =
        WEATHER_SCENARIOS[activeScenario] || {};

      return {
        ...base,
        ...scenario
      };
    }

    // Convert backend weather into frontend format
    return normalizeWeather(backendWeather, {
      city: 'Hyderabad',
      state: 'Telangana',
      country: 'India'
    });
  }, [
    currentCityId,
    activeScenario,
    backendWeather
  ]);

  // Calculate persona suitability
  const suitability = useMemo(() => {
    return getSuitabilityForPersona(
      activePersonaId,
      currentWeather
    );
  }, [
    activePersonaId,
    currentWeather
  ]);

  // Get active persona
  const activePersona = useMemo(() => {
    return (
      PERSONAS.find(
        p => p.id === activePersonaId
      ) || PERSONAS[0]
    );
  }, [activePersonaId]);

  // Calculate prioritized widgets
  const prioritizedWidgets = useMemo(() => {
    return calculateWidgetPriorities({
      personaId: activePersonaId,
      weather: currentWeather,
      alert: MOCK_SEVERE_ALERT,
      isSafetyOverrideActive
    });
  }, [
    activePersonaId,
    currentWeather,
    isSafetyOverrideActive
  ]);

  return (
    <div className="app-container">

      {/* Header & Controls */}
      <Navbar
        currentCityId={currentCityId}
        onCityChange={setCurrentCityId}
        activeScenario={activeScenario}
        onScenarioChange={setActiveScenario}
        isSafetyOverrideActive={isSafetyOverrideActive}
        onToggleSafetyOverride={() =>
          setIsSafetyOverrideActive(
            !isSafetyOverrideActive
          )
        }
        onOpenExplainability={() =>
          setIsExplainabilityOpen(true)
        }
      />

      {/* Weather Status */}
      {weatherLoading && (
        <div className="weather-status">
          Loading live weather...
        </div>
      )}

      {weatherError && (
        <div className="weather-status">
          Live weather unavailable. Showing demo weather.
        </div>
      )}

      {/* Persona Selection */}
      <PersonaSelector
        activePersonaId={activePersonaId}
        onSelectPersona={setActivePersonaId}
      />

      {/* Personalized Weather Intelligence */}
      <PersonalizedInsightCard
        persona={activePersona}
        suitability={suitability}
        weather={currentWeather}
        onOpenExplainability={() =>
          setIsExplainabilityOpen(true)
        }
      />

      {/* Dynamic Homepage Grid */}
      <PrioritizedGrid
        prioritizedWidgets={prioritizedWidgets}
        currentWeather={currentWeather}
        suitability={suitability}
        activePersona={activePersona}
        alert={MOCK_SEVERE_ALERT}
        isSafetyOverrideActive={isSafetyOverrideActive}
        onToggleSimulation={() =>
          setIsSafetyOverrideActive(
            !isSafetyOverrideActive
          )
        }
      />

      {/* Explainability Modal */}
      <ExplainabilityModal
        isOpen={isExplainabilityOpen}
        onClose={() =>
          setIsExplainabilityOpen(false)
        }
        prioritizedWidgets={prioritizedWidgets}
        activePersonaId={activePersonaId}
        isSafetyOverrideActive={
          isSafetyOverrideActive
        }
      />

    </div>
  );
};

export default App;
