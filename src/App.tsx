import React, { useState, useMemo, useEffect } from 'react';
import type { PersonaId } from './types';

import {
  PERSONAS,
  MOCK_WEATHER_DATA,
  WEATHER_SCENARIOS
} from './data/mockData';

import { getSuitabilityForPersona } from './smart/suitabilityCalculators';
import { calculateWidgetPriorities } from './engine/personalizationEngine';
import { generateWeatherAlert } from './intelligence/weatherAlerts';

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

const CITY_COORDINATES: Record<
  string,
  { lat: number; lon: number }
> = {
  delhi: {
    lat: 28.6139,
    lon: 77.2090
  },
  mumbai: {
    lat: 19.0760,
    lon: 72.8777
  },
  bengaluru: {
    lat: 12.9716,
    lon: 77.5946
  },
  shimla: {
    lat: 31.1048,
    lon: 77.1734
  },
  goa: {
    lat: 15.4909,
    lon: 73.8278
  },
  chennai: {
    lat: 13.0827,
    lon: 80.2707
  }
};

export const App: React.FC = () => {
  const [activePersonaId, setActivePersonaId] =
    useState<PersonaId>('fitness');

  const [currentCityId, setCurrentCityId] =
    useState<string>('delhi');

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

  // Fetch live weather for selected city
  useEffect(() => {
    let cancelled = false;

    const coordinates =
      CITY_COORDINATES[currentCityId] ||
      CITY_COORDINATES.delhi;

    setWeatherLoading(true);
    setWeatherError(null);

    fetchCurrentWeather(
      coordinates.lat,
      coordinates.lon
    )
      .then((weather) => {
        if (!cancelled) {
          setBackendWeather(weather);
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setBackendWeather(null);

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
  }, [currentCityId]);

  // Use live backend weather when available
  const currentWeather = useMemo(() => {
    const base =
      MOCK_WEATHER_DATA[currentCityId] ||
      MOCK_WEATHER_DATA['delhi'];

    // Fallback to mock weather
    // when backend is unavailable
    if (!backendWeather) {
      const scenario =
        WEATHER_SCENARIOS[activeScenario] || {};

      return {
        ...base,
        ...scenario
      };
    }

    // Convert backend weather into
    // frontend CurrentWeather format
    return normalizeWeather(
      backendWeather,
      {
        city: base.city,
        state: base.state,
        country: base.country
      }
    );
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

  // Generate live weather alert
  const liveAlert = useMemo(() => {
    return generateWeatherAlert(currentWeather);
  }, [currentWeather]);

  // Calculate prioritized widgets
  const prioritizedWidgets = useMemo(() => {
    return calculateWidgetPriorities({
      personaId: activePersonaId,
      weather: currentWeather,
      alert: liveAlert,
      isSafetyOverrideActive
    });
  }, [
    activePersonaId,
    currentWeather,
    liveAlert,
    isSafetyOverrideActive
  ]);

  return (
    <div className="app-container">

      {/* Header & Controls */}
      <Navbar
        currentCityId={currentCityId}
        onCityChange={(cityId) => {
          setCurrentCityId(cityId);
          setBackendWeather(null);
        }}
        activeScenario={activeScenario}
        onScenarioChange={setActiveScenario}
        isSafetyOverrideActive={
          isSafetyOverrideActive
        }
        onToggleSafetyOverride={() =>
          setIsSafetyOverrideActive(
            !isSafetyOverrideActive
          )
        }
        onOpenExplainability={() =>
          setIsExplainabilityOpen(true)
        }
      />

      {/* Weather Loading */}
      {weatherLoading && (
        <div className="weather-status">
          Loading live weather...
        </div>
      )}

      {/* Weather Error */}
      {weatherError && (
        <div className="weather-status">
          Live weather unavailable. Showing demo
          weather.
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
        alert={liveAlert}
        isSafetyOverrideActive={
          isSafetyOverrideActive
        }
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
