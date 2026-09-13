import React from 'react';
import { Calendar, Sparkles, Info } from 'lucide-react';
import type { CurrentWeather, PrioritizedWidget } from '../../types';

interface EventPlannerCardProps {
  currentWeather: CurrentWeather;
  widgetMeta: PrioritizedWidget;
  rankNumber: number;
}

export const EventPlannerCard: React.FC<EventPlannerCardProps> = ({
  currentWeather,
  widgetMeta,
  rankNumber
}) => {
  const isRainRisk = currentWeather.condition === 'Heavy Rain' || currentWeather.condition === 'Thunderstorm';

  return (
    <div className="glass-panel widget-card">
      <div className="widget-header">
        <div className="widget-title-area">
          <div className="widget-title-icon" style={{ color: '#8B5CF6' }}>
            <Calendar size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#FFF' }}>Outdoor Event Feasibility Radar</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Gathering feasibility score, hourly rain risk & venue anchor safety
            </p>
          </div>
        </div>

        <span className={`rank-badge ${rankNumber === 1 ? 'top-rank' : ''}`}>
          Rank #{rankNumber}
        </span>
      </div>

      <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '1rem', borderRadius: '12px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Outdoor Event Viability Index</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: isRainRisk ? '#EF4444' : '#10B981' }}>
            {isRainRisk ? '25 / 100 (Unfavorable)' : '85 / 100 (High Viability)'}
          </div>
        </div>
      </div>

      <div style={{ background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.3)', padding: '0.85rem 1rem', borderRadius: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#C4B5FD', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
          <Sparkles size={16} />
          <span>Venue Setup & Risk Analysis:</span>
        </div>
        <p style={{ fontSize: '0.8rem', color: '#FFF' }}>
          {isRainRisk 
            ? 'Active thunderstorm clouds detected. Waterproof marquee structures and indoor contingency halls are strongly required.'
            : 'Favorable conditions for outdoor gatherings. Wind gusts under 18 km/h ensure stable tenting and sound stage setups.'}
        </p>
      </div>

      <div className="why-badge">
        <Info size={14} />
        <span>{widgetMeta.reason}</span>
      </div>
    </div>
  );
};
