import React from 'react';
import { Clock, CloudRain, Sun, Info } from 'lucide-react';
import { MOCK_HOURLY_FORECAST } from '../../data/mockData';
import type { PrioritizedWidget } from '../../types';

interface HourlyForecastCardProps {
  widgetMeta: PrioritizedWidget;
  rankNumber: number;
}

export const HourlyForecastCard: React.FC<HourlyForecastCardProps> = ({
  widgetMeta,
  rankNumber
}) => {
  return (
    <div className="glass-panel widget-card">
      <div className="widget-header">
        <div className="widget-title-area">
          <div className="widget-title-icon" style={{ color: '#60A5FA' }}>
            <Clock size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#FFF' }}>24-Hour Interactive Timeline</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Hourly temperature curve & precipitation height distribution
            </p>
          </div>
        </div>

        <span className={`rank-badge ${rankNumber === 1 ? 'top-rank' : ''}`}>
          Rank #{rankNumber}
        </span>
      </div>

      {/* Hourly Scroll View with Bar Indicators */}
      <div style={{
        display: 'flex',
        gap: '0.85rem',
        overflowX: 'auto',
        paddingBottom: '0.65rem',
        scrollbarWidth: 'thin'
      }}>
        {MOCK_HOURLY_FORECAST.map((item, index) => (
          <div
            key={index}
            style={{
              flex: '0 0 auto',
              width: '105px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: item.rainProbability > 50 ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '14px',
              padding: '0.85rem 0.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.45rem',
              textAlign: 'center'
            }}
          >
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              {item.time}
            </span>

            {item.rainProbability > 40 ? (
              <CloudRain size={24} color="#3B82F6" />
            ) : (
              <Sun size={24} color="#FBBF24" />
            )}

            <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFF' }}>
              {item.temp}°C
            </span>

            {/* Rain Probability Visual Bar Graph Pill */}
            <div style={{
              width: '100%',
              height: '36px',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '6px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '2px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: '100%',
                height: `${Math.max(12, item.rainProbability)}%`,
                background: item.rainProbability > 50 ? 'linear-gradient(180deg, #60A5FA, #2563EB)' : 'linear-gradient(180deg, #93C5FD, #3B82F6)',
                borderRadius: '4px',
                transition: 'height 0.4s ease'
              }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.72rem', color: '#60A5FA', fontWeight: 600 }}>
              <CloudRain size={12} />
              <span>{item.rainProbability}% rain</span>
            </div>
          </div>
        ))}
      </div>

      <div className="why-badge">
        <Info size={14} />
        <span>{widgetMeta.reason}</span>
      </div>
    </div>
  );
};
