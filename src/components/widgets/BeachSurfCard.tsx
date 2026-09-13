import React from 'react';
import { Waves, Wind, AlertOctagon, Info } from 'lucide-react';
import type { CurrentWeather, PrioritizedWidget } from '../../types';

interface BeachSurfCardProps {
  currentWeather: CurrentWeather;
  widgetMeta: PrioritizedWidget;
  rankNumber: number;
}

export const BeachSurfCard: React.FC<BeachSurfCardProps> = ({
  currentWeather,
  widgetMeta,
  rankNumber
}) => {
  return (
    <div className="glass-panel widget-card">
      <div className="widget-header">
        <div className="widget-title-area">
          <div className="widget-title-icon" style={{ color: '#06B6D4' }}>
            <Waves size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#FFF' }}>Beach, Wave & Coastal Marine Index</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Coastal swell height, wind surf rating & water safety flag
            </p>
          </div>
        </div>

        <span className={`rank-badge ${rankNumber === 1 ? 'top-rank' : ''}`}>
          Rank #{rankNumber}
        </span>
      </div>

      <div className="metrics-grid" style={{ marginBottom: '1rem' }}>
        <div className="metric-pill">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Waves size={14} color="#06B6D4" />
            <span className="metric-label">Estimated Swell</span>
          </div>
          <span className="metric-value">1.2 Meters</span>
        </div>

        <div className="metric-pill">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Wind size={14} color="#38BDF8" />
            <span className="metric-label">Coastal Wind</span>
          </div>
          <span className="metric-value">{currentWeather.windSpeed} km/h</span>
        </div>

        <div className="metric-pill">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <AlertOctagon size={14} color="#FBBF24" />
            <span className="metric-label">Lifeguard Flag</span>
          </div>
          <span className="metric-value" style={{ color: '#FBBF24' }}>🟡 Yellow Flag</span>
        </div>
      </div>

      <div style={{ background: 'rgba(6, 182, 212, 0.15)', border: '1px solid rgba(6, 182, 212, 0.3)', padding: '0.85rem 1rem', borderRadius: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#67E8F9', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
          <Waves size={16} />
          <span>Coastal Activity Advisory:</span>
        </div>
        <p style={{ fontSize: '0.8rem', color: '#FFF' }}>
          Moderate swell height allows recreational swimming within marked lifeguard zones. Avoid rip current channels. Water temperature is 28°C.
        </p>
      </div>

      <div className="why-badge">
        <Info size={14} />
        <span>{widgetMeta.reason}</span>
      </div>
    </div>
  );
};
