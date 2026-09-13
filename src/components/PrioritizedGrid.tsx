import React from 'react';
import type { PrioritizedWidget, CurrentWeather, SuitabilityMetric, PersonaProfile, WeatherAlert } from '../types';
import { SafetyAlertBanner } from './SafetyAlertBanner';
import { CurrentWeatherCard } from './widgets/CurrentWeatherCard';
import { SuitabilityCard } from './widgets/SuitabilityCard';
import { BestTimeCard } from './widgets/BestTimeCard';
import { HourlyForecastCard } from './widgets/HourlyForecastCard';
import { DailyForecastCard } from './widgets/DailyForecastCard';
import { TravelerCard } from './widgets/TravelerCard';
import { AgricultureCard } from './widgets/AgricultureCard';
import { CommuterCard } from './widgets/CommuterCard';
import { HealthCard } from './widgets/HealthCard';
import { BeachSurfCard } from './widgets/BeachSurfCard';
import { EventPlannerCard } from './widgets/EventPlannerCard';
import { FamilyParentCard } from './widgets/FamilyParentCard';

interface PrioritizedGridProps {
  prioritizedWidgets: PrioritizedWidget[];
  currentWeather: CurrentWeather;
  suitability: SuitabilityMetric;
  activePersona: PersonaProfile;
  alert: WeatherAlert;
  isSafetyOverrideActive: boolean;
  onToggleSimulation: () => void;
}

export const PrioritizedGrid: React.FC<PrioritizedGridProps> = ({
  prioritizedWidgets,
  currentWeather,
  suitability,
  activePersona,
  alert,
  isSafetyOverrideActive,
  onToggleSimulation
}) => {
  const renderWidget = (widget: PrioritizedWidget, rankNumber: number) => {
    switch (widget.id) {
      case 'safety_alert':
        return (
          <SafetyAlertBanner
            key={widget.id}
            alert={alert}
            isSimulated={isSafetyOverrideActive}
            onToggleSimulation={onToggleSimulation}
          />
        );
      case 'persona_suitability':
        return (
          <SuitabilityCard
            key={widget.id}
            suitability={suitability}
            persona={activePersona}
            widgetMeta={widget}
            rankNumber={rankNumber}
          />
        );
      case 'best_time_window':
        return (
          <BestTimeCard
            key={widget.id}
            activePersonaId={activePersona.id}
            widgetMeta={widget}
            rankNumber={rankNumber}
          />
        );
      case 'current_weather':
        return (
          <CurrentWeatherCard
            key={widget.id}
            weather={currentWeather}
            widgetMeta={widget}
            rankNumber={rankNumber}
          />
        );
      case 'hourly_forecast':
        return (
          <HourlyForecastCard
            key={widget.id}
            widgetMeta={widget}
            rankNumber={rankNumber}
          />
        );
      case 'daily_forecast':
        return (
          <DailyForecastCard
            key={widget.id}
            widgetMeta={widget}
            rankNumber={rankNumber}
          />
        );
      case 'traveler_comparison':
        return (
          <TravelerCard
            key={widget.id}
            currentWeather={currentWeather}
            widgetMeta={widget}
            rankNumber={rankNumber}
          />
        );
      case 'agriculture_insights':
        return (
          <AgricultureCard
            key={widget.id}
            currentWeather={currentWeather}
            widgetMeta={widget}
            rankNumber={rankNumber}
          />
        );
      case 'commuter_advisory':
        return (
          <CommuterCard
            key={widget.id}
            currentWeather={currentWeather}
            widgetMeta={widget}
            rankNumber={rankNumber}
          />
        );
      case 'health_environment':
        return (
          <HealthCard
            key={widget.id}
            currentWeather={currentWeather}
            widgetMeta={widget}
            rankNumber={rankNumber}
          />
        );
      case 'beach_coastal':
        return (
          <BeachSurfCard
            key={widget.id}
            currentWeather={currentWeather}
            widgetMeta={widget}
            rankNumber={rankNumber}
          />
        );
      case 'event_planner':
        return (
          <EventPlannerCard
            key={widget.id}
            currentWeather={currentWeather}
            widgetMeta={widget}
            rankNumber={rankNumber}
          />
        );
      case 'family_outdoor':
        return (
          <FamilyParentCard
            key={widget.id}
            currentWeather={currentWeather}
            widgetMeta={widget}
            rankNumber={rankNumber}
          />
        );
      default:
        return null;
    }
  };

  return (
    <main className="homepage-grid">
      {prioritizedWidgets.map((widget, index) => renderWidget(widget, index + 1))}
    </main>
  );
};
