import React from 'react';
import { 
  CloudSun, 
  MapPin, 
  AlertTriangle, 
  HelpCircle, 
  Sparkles, 
  SlidersHorizontal 
} from 'lucide-react';
import { LOCATIONS } from '../data/mockData';

interface NavbarProps {
  currentCityId: string;
  onCityChange: (cityId: string) => void;
  activeScenario: string;
  onScenarioChange: (scenario: string) => void;
  isSafetyOverrideActive: boolean;
  onToggleSafetyOverride: () => void;
  onOpenExplainability: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCityId,
  onCityChange,
  activeScenario,
  onScenarioChange,
  isSafetyOverrideActive,
  onToggleSafetyOverride,
  onOpenExplainability
}) => {
  return (
    <header className="glass-panel navbar">
      <div className="brand-section">
        <div className="brand-logo">
          <CloudSun size={24} color="#FFFFFF" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <h1 className="brand-title">MausamIQ</h1>
            <span style={{
              fontSize: '0.65rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #10B981, #059669)',
              color: '#FFF',
              padding: '0.15rem 0.45rem',
              borderRadius: '6px',
              letterSpacing: '0.05em'
            }}>SIH26076</span>
          </div>
          <p className="brand-subtitle">
            <Sparkles size={12} color="#60A5FA" />
            Intelligent Persona Weather Layer for IMD Mausam
          </p>
        </div>
      </div>

      <div className="nav-controls">
        {/* City Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <MapPin size={16} color="#60A5FA" />
          <select 
            className="select-input" 
            value={currentCityId} 
            onChange={(e) => onCityChange(e.target.value)}
          >
            {LOCATIONS.map(loc => (
              <option key={loc.id} value={loc.id} style={{ background: '#161E31' }}>
                {loc.name}, {loc.state} {loc.isDestination ? '✈️' : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Weather Condition Simulator for Testing */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <SlidersHorizontal size={15} color="#9CA3AF" />
          <select
            className="select-input"
            value={activeScenario}
            onChange={(e) => onScenarioChange(e.target.value)}
            title="Simulate weather condition scenario for testing"
          >
            <option value="normal" style={{ background: '#161E31' }}>☀️ Normal Weather</option>
            <option value="heavy_rain" style={{ background: '#161E31' }}>🌧️ Heavy Rain / Downpour</option>
            <option value="severe_heatwave" style={{ background: '#161E31' }}>🔥 Extreme Heatwave</option>
            <option value="dense_fog" style={{ background: '#161E31' }}>🌫️ Dense Fog Hazard</option>
          </select>
        </div>

        {/* Safety Override Simulation Button */}
        <button 
          className={`btn-action ${isSafetyOverrideActive ? 'btn-emergency active' : 'btn-emergency'}`}
          onClick={onToggleSafetyOverride}
          title="Toggle severe alert safety override to test priority elevation"
        >
          <AlertTriangle size={16} />
          {isSafetyOverrideActive ? 'Severe Alert Override: ON' : 'Simulate Severe Alert'}
        </button>

        {/* Ranking Explanation Drawer Trigger */}
        <button 
          className="btn-action"
          onClick={onOpenExplainability}
          title="View how MausamIQ prioritizes widgets based on persona and safety"
        >
          <HelpCircle size={16} color="#60A5FA" />
          <span>Ranking Engine</span>
        </button>
      </div>
    </header>
  );
};
