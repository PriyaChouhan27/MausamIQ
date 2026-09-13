import React from 'react';
import { HeartPulse, ShieldAlert, Info } from 'lucide-react';
import type { CurrentWeather, PrioritizedWidget } from '../../types';

interface HealthCardProps {
  currentWeather: CurrentWeather;
  widgetMeta: PrioritizedWidget;
  rankNumber: number;
}

export const HealthCard: React.FC<HealthCardProps> = ({
  currentWeather,
  widgetMeta,
  rankNumber
}) => {
  return (
    <div className="glass-panel widget-card">
      <div className="widget-header">
        <div className="widget-title-area">
          <div className="widget-title-icon" style={{ color: '#EC4899' }}>
            <HeartPulse size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#FFF' }}>Health, AQI & UV Advisory</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Air quality impact, sunburn threshold & respiratory guidelines
            </p>
          </div>
        </div>

        <span className={`rank-badge ${rankNumber === 1 ? 'top-rank' : ''}`}>
          Rank #{rankNumber}
        </span>
      </div>

      {/* AQI & UV Gauges */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem', marginBottom: '1rem' }}>
        <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '0.85rem', borderRadius: '10px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Air Quality Index (AQI)</span>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: currentWeather.aqi > 150 ? '#EF4444' : '#F59E0B' }}>
            {currentWeather.aqi} <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>({currentWeather.aqiCategory})</span>
          </div>
        </div>

        <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '0.85rem', borderRadius: '10px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>UV Index Burn Time</span>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: currentWeather.uvIndex > 8 ? '#EF4444' : '#60A5FA' }}>
            {currentWeather.uvIndex} <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>({currentWeather.uvIndex > 8 ? '20 mins max' : '45 mins max'})</span>
          </div>
        </div>
      </div>

      <div style={{ background: 'rgba(236, 72, 153, 0.15)', border: '1px solid rgba(236, 72, 153, 0.3)', padding: '0.85rem 1rem', borderRadius: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#F472B6', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
          <ShieldAlert size={16} />
          <span>Health Protection Guidance:</span>
        </div>
        <p style={{ fontSize: '0.8rem', color: '#FFF' }}>
          AQI levels ({currentWeather.aqi}) suggest sensitive groups limit heavy outdoor exertion during midday. Hydration requirement is estimated at 3.0 Liters/day under current thermal load.
        </p>
      </div>

      <div className="why-badge">
        <Info size={14} />
        <span>{widgetMeta.reason}</span>
      </div>
    </div>
  );
};
