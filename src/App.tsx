import React, { useState, useMemo } from 'react';
import type { PersonaId } from './types';
import { PERSONAS, MOCK_WEATHER_DATA, WEATHER_SCENARIOS, MOCK_SEVERE_ALERT } from './data/mockData';
import { getSuitabilityForPersona } from './smart/suitabilityCalculators';
import { calculateWidgetPriorities } from './engine/personalizationEngine';
import { Navbar } from './components/Navbar';
import { PersonaSelector } from './components/PersonaSelector';
import { PrioritizedGrid } from './components/PrioritizedGrid';
import { ExplainabilityModal } from './components/ExplainabilityModal';
import { PersonalizedInsightCard } from './components/PersonalizedInsightCard';

export const App: React.FC = () => {
  const [activePersonaId, setActivePersonaId] = useState<PersonaId>('fitness');
  const [currentCityId, setCurrentCityId] = useState<string>('delhi');
  const [activeScenario, setActiveScenario] = useState<string>('normal');
  const [isSafetyOverrideActive, setIsSafetyOverrideActive] = useState<boolean>(false);
  const [isExplainabilityOpen, setIsExplainabilityOpen] = useState<boolean>(false);

  // Derive Current Weather from selected city + active scenario simulation
  const currentWeather = useMemo(() => {
    const base = MOCK_WEATHER_DATA[currentCityId] || MOCK_WEATHER_DATA['delhi'];
    const scenario = WEATHER_SCENARIOS[activeScenario] || {};
    return {
      ...base,
      ...scenario
    };
  }, [currentCityId, activeScenario]);

  // Derive Persona Suitability metrics
  const suitability = useMemo(() => {
    return getSuitabilityForPersona(activePersonaId, currentWeather);
  }, [activePersonaId, currentWeather]);

  // Active persona profile
  const activePersona = useMemo(() => {
    return PERSONAS.find(p => p.id === activePersonaId) || PERSONAS[0];
  }, [activePersonaId]);

  // Compute prioritized homepage widget list from ranking engine
  const prioritizedWidgets = useMemo(() => {
    return calculateWidgetPriorities({
      personaId: activePersonaId,
      weather: currentWeather,
      alert: MOCK_SEVERE_ALERT,
      isSafetyOverrideActive
    });
  }, [activePersonaId, currentWeather, isSafetyOverrideActive]);

  return (
    <div className="app-container">
      {/* Header & Controls */}
      <Navbar
        currentCityId={currentCityId}
        onCityChange={setCurrentCityId}
        activeScenario={activeScenario}
        onScenarioChange={setActiveScenario}
        isSafetyOverrideActive={isSafetyOverrideActive}
        onToggleSafetyOverride={() => setIsSafetyOverrideActive(!isSafetyOverrideActive)}
        onOpenExplainability={() => setIsExplainabilityOpen(true)}
      />

      {/* Persona Selection Chips */}
      <PersonaSelector
        activePersonaId={activePersonaId}
        onSelectPersona={setActivePersonaId}
      />

      {/* Personalized Weather Intelligence Spotlight */}
      <PersonalizedInsightCard
        persona={activePersona}
        suitability={suitability}
        weather={currentWeather}
        onOpenExplainability={() => setIsExplainabilityOpen(true)}
      />

      {/* Dynamically Reordered Homepage Grid */}
      <PrioritizedGrid
        prioritizedWidgets={prioritizedWidgets}
        currentWeather={currentWeather}
        suitability={suitability}
        activePersona={activePersona}
        alert={MOCK_SEVERE_ALERT}
        isSafetyOverrideActive={isSafetyOverrideActive}
        onToggleSimulation={() => setIsSafetyOverrideActive(!isSafetyOverrideActive)}
      />

      {/* Prioritization Logic & Score Breakdown Modal */}
      <ExplainabilityModal
        isOpen={isExplainabilityOpen}
        onClose={() => setIsExplainabilityOpen(false)}
        prioritizedWidgets={prioritizedWidgets}
        activePersonaId={activePersonaId}
        isSafetyOverrideActive={isSafetyOverrideActive}
      />
    </div>
  );
};

export default App;
