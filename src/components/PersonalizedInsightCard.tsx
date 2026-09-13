import React from 'react';
import { Sparkles, Clock, Target, HelpCircle } from 'lucide-react';
import type { PersonaProfile, SuitabilityMetric, CurrentWeather } from '../types';

interface PersonalizedInsightCardProps {
  persona: PersonaProfile;
  suitability: SuitabilityMetric;
  weather: CurrentWeather;
  onOpenExplainability: () => void;
}

export const PersonalizedInsightCard: React.FC<PersonalizedInsightCardProps> = ({
  persona,
  suitability,
  weather,
  onOpenExplainability
}) => {
  const accentHex = persona.accentColor || '#3B82F6';
  const cardBg = 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), ' + accentHex + '18)';
  const borderColor = accentHex + '40';
  const iconBg = accentHex + '25';
  const borderLeftColor = '4px solid ' + accentHex;

  return (
    <div 
      className="glass-panel" 
      style={{
        padding: '1.25rem 1.5rem',
        marginBottom: '1.5rem',
        background: cardBg,
        borderColor: borderColor,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: iconBg,
            color: accentHex,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#FFF', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Your Personalized Weather Intelligence
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Contextual recommendation for <strong style={{ color: accentHex }}>{persona.name}</strong> in {weather.city}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '0.3rem 0.75rem',
            borderRadius: '20px',
            border: '1px solid ' + borderColor,
            fontSize: '0.82rem',
            fontWeight: 700,
            color: '#FFF'
          }}>
            <Target size={14} color={accentHex} />
            <span>Suitability: {suitability.score}/100 ({suitability.label})</span>
          </div>

          <button
            onClick={onOpenExplainability}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#93C5FD',
              padding: '0.35rem 0.75rem',
              borderRadius: '8px',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <HelpCircle size={14} />
            <span>Why this card?</span>
          </button>
        </div>
      </div>

      {/* Main Intelligence Headline */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.25)',
        borderRadius: '12px',
        padding: '1rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        borderLeft: borderLeftColor
      }}>
        <p style={{ fontSize: '1rem', color: '#FFF', fontWeight: 600, lineHeight: 1.4 }}>
          "{suitability.summary}"
        </p>

        {suitability.bestWindow && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#60A5FA', fontSize: '0.85rem', fontWeight: 600 }}>
            <Clock size={15} />
            <span>Recommended Activity Window: {suitability.bestWindow.start} - {suitability.bestWindow.end} ({suitability.bestWindow.note})</span>
          </div>
        )}
      </div>
    </div>
  );
};
