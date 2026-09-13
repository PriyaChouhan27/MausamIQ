import React from 'react';
import { Sprout, Droplet, Wind, CloudRain, ShieldAlert, Info } from 'lucide-react';
import type { CurrentWeather, PrioritizedWidget } from '../../types';

interface AgricultureCardProps {
  currentWeather: CurrentWeather;
  widgetMeta: PrioritizedWidget;
  rankNumber: number;
}

export const AgricultureCard: React.FC<AgricultureCardProps> = ({
  currentWeather,
  widgetMeta,
  rankNumber
}) => {
  return (
    <div className="glass-panel widget-card">
      <div className="widget-header">
        <div className="widget-title-area">
          <div className="widget-title-icon" style={{ color: '#84CC16' }}>
            <Sprout size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#FFF' }}>Agriculture & Agronomic Insights</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Crop irrigation, spraying window & disease warnings
            </p>
          </div>
        </div>

        <span className={`rank-badge ${rankNumber === 1 ? 'top-rank' : ''}`}>
          Rank #{rankNumber}
        </span>
      </div>

      {/* Metrics Row */}
      <div className="metrics-grid" style={{ marginBottom: '1rem' }}>
        <div className="metric-pill">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Droplet size={14} color="#84CC16" />
            <span className="metric-label">Soil Moisture</span>
          </div>
          <span className="metric-value">68% (Optimal)</span>
        </div>

        <div className="metric-pill">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Wind size={14} color="#34D399" />
            <span className="metric-label">Spraying Wind</span>
          </div>
          <span className="metric-value">{currentWeather.windSpeed} km/h ({currentWeather.windSpeed < 18 ? 'Safe' : 'High Drift'})</span>
        </div>

        <div className="metric-pill">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <CloudRain size={14} color="#60A5FA" />
            <span className="metric-label">Evapotranspiration</span>
          </div>
          <span className="metric-value">4.2 mm/day</span>
        </div>
      </div>

      {/* Fungal & Irrigation Advisory Box */}
      <div style={{
        background: currentWeather.humidity > 75 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(132, 204, 22, 0.15)',
        border: `1px solid ${currentWeather.humidity > 75 ? 'rgba(239, 68, 68, 0.4)' : 'rgba(132, 204, 22, 0.4)'}`,
        padding: '0.85rem 1rem',
        borderRadius: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: currentWeather.humidity > 75 ? '#FCA5A5' : '#BEF264', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
          <ShieldAlert size={16} />
          <span>Fungal Blight Risk Advisory:</span>
        </div>
        <p style={{ fontSize: '0.8rem', color: '#FFF' }}>
          {currentWeather.humidity > 75 
            ? `High atmospheric humidity (${currentWeather.humidity}%) elevates crop fungal spore activity. Apply bio-fungicide preventative measures before evening dew.`
            : 'Favorable agricultural conditions. Soil moisture level supports healthy root uptake. No immediate irrigation required.'}
        </p>
      </div>

      <div className="why-badge">
        <Info size={14} />
        <span>{widgetMeta.reason}</span>
      </div>
    </div>
  );
};
