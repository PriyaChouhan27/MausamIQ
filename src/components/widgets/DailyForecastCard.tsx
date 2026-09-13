import React from 'react';
import { Calendar, CloudRain, Sun, Info } from 'lucide-react';
import { MOCK_DAILY_FORECAST } from '../../data/mockData';
import type { PrioritizedWidget } from '../../types';

interface DailyForecastCardProps {
  widgetMeta: PrioritizedWidget;
  rankNumber: number;
}

export const DailyForecastCard: React.FC<DailyForecastCardProps> = ({
  widgetMeta,
  rankNumber
}) => {
  return (
    <div className="glass-panel widget-card">
      <div className="widget-header">
        <div className="widget-title-area">
          <div className="widget-title-icon" style={{ color: '#8B5CF6' }}>
            <Calendar size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#FFF' }}>7-Day Official IMD Outlook</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Extended weather outlook & precipitation forecasts
            </p>
          </div>
        </div>

        <span className={`rank-badge ${rankNumber === 1 ? 'top-rank' : ''}`}>
          Rank #{rankNumber}
        </span>
      </div>

      {/* 7-Day List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {MOCK_DAILY_FORECAST.map((day, index) => (
          <div
            key={index}
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.07)',
              borderRadius: '10px',
              padding: '0.75rem 1rem',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', minWidth: '130px' }}>
              {day.rainProbability > 50 ? <CloudRain size={20} color="#3B82F6" /> : <Sun size={20} color="#FBBF24" />}
              <div>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFF' }}>{day.day}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>{day.date}</span>
              </div>
            </div>

            <div style={{ flex: 1, minWidth: '150px' }}>
              <span style={{ fontSize: '0.82rem', color: '#93C5FD', fontWeight: 500 }}>{day.condition}</span>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{day.summary}</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.78rem', color: '#60A5FA' }}>
                <CloudRain size={13} />
                <span>{day.rainProbability}%</span>
              </div>
              <div style={{ textAlign: 'right', fontSize: '0.88rem', fontWeight: 700 }}>
                <span style={{ color: '#FFF' }}>{day.tempMax}°</span>
                <span style={{ color: 'var(--text-muted)', marginLeft: '0.3rem' }}>{day.tempMin}°</span>
              </div>
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
