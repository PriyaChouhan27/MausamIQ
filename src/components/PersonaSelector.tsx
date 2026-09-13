import React from 'react';
import { 
  Activity, 
  Compass, 
  Car, 
  Sprout, 
  Calendar, 
  HeartPulse, 
  Waves, 
  Users, 
  Zap, 
  ChevronRight
} from 'lucide-react';
import { PERSONAS } from '../data/mockData';
import type { PersonaId } from '../types';

interface PersonaSelectorProps {
  activePersonaId: PersonaId;
  onSelectPersona: (id: PersonaId) => void;
}

const ICON_MAP: Record<string, React.FC<{ size?: number; color?: string }>> = {
  Activity,
  Compass,
  Car,
  Sprout,
  Calendar,
  HeartPulse,
  Waves,
  Users
};

export const PersonaSelector: React.FC<PersonaSelectorProps> = ({
  activePersonaId,
  onSelectPersona
}) => {
  const activePersona = PERSONAS.find(p => p.id === activePersonaId) || PERSONAS[0];

  return (
    <section className="persona-section">
      <div className="section-header">
        <h2 className="section-title">
          <Zap size={18} color="#F59E0B" />
          <span>Select Your Context & Persona</span>
        </h2>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Homepage card order adapts dynamically
        </span>
      </div>

      {/* Horizontal Persona Chips */}
      <div className="persona-chips">
        {PERSONAS.map((persona) => {
          const IconComponent = ICON_MAP[persona.iconName] || Activity;
          const isActive = persona.id === activePersonaId;

          return (
            <div
              key={persona.id}
              className={`persona-chip ${isActive ? 'active' : ''}`}
              style={{ '--accent-color': persona.accentColor } as React.CSSProperties}
              onClick={() => onSelectPersona(persona.id)}
            >
              <div className="persona-icon-wrapper">
                <IconComponent size={18} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{persona.name}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Persona Banner Card */}
      <div className="active-persona-banner" style={{ borderLeft: '4px solid ' + (activePersona.accentColor || '#3B82F6') }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: (activePersona.accentColor || '#3B82F6') + '25',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: activePersona.accentColor
          }}>
            {React.createElement(ICON_MAP[activePersona.iconName] || Activity, { size: 20 })}
          </div>
          <div className="persona-banner-info">
            <h4>Active Persona: {activePersona.name}</h4>
            <p>{activePersona.tagline}</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ 
            fontSize: '0.75rem', 
            background: 'rgba(255, 255, 255, 0.08)',
            padding: '0.3rem 0.6rem',
            borderRadius: '6px',
            color: '#93C5FD',
            display: 'none'
          }}>
            Prioritizes: {activePersona.primaryMetrics.slice(0, 2).join(', ')}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: activePersona.accentColor, fontSize: '0.8rem', fontWeight: 600 }}>
            <span>Adapted View</span>
            <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </section>
  );
};
