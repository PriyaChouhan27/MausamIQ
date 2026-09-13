import React from 'react';
import { Car, CloudFog, ShieldCheck, Info } from 'lucide-react';
import type { CurrentWeather, PrioritizedWidget } from '../../types';

interface CommuterCardProps {
  currentWeather: CurrentWeather;
  widgetMeta: PrioritizedWidget;
  rankNumber: number;
}

export const CommuterCard: React.FC<CommuterCardProps> = ({
  currentWeather,
  widgetMeta,
  rankNumber
}) => {
  const isFog = currentWeather.visibility < 3.0 || currentWeather.condition === 'Dense Fog';

  return (
    <div className="glass-panel widget-card">
      <div className="widget-header">
        <div className="widget-title-area">
          <div className="widget-title-icon" style={{ color: '#F59E0B' }}>
            <Car size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#FFF' }}>Commuter Road Hazard Index</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Visibility meter & transit safety advisory
            </p>
          </div>
        </div>

        <span className={`rank-badge ${rankNumber === 1 ? 'top-rank' : ''}`}>
          Rank #{rankNumber}
        </span>
      </div>

      {/* Visibility Meter Bar */}
      <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '1rem', borderRadius: '12px', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.85rem' }}>
          <span style={{ color: '#FFF', fontWeight: 600 }}>Highway Road Visibility:</span>
          <span style={{ color: isFog ? '#EF4444' : '#10B981', fontWeight: 700 }}>
            {currentWeather.visibility} km ({isFog ? 'POOR VISIBILITY' : 'NORMAL'})
          </span>
        </div>

        <div style={{ width: '100%', height: '10px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '5px', overflow: 'hidden' }}>
          <div style={{
            width: `${Math.min(100, (currentWeather.visibility / 10) * 100)}%`,
            height: '100%',
            background: isFog ? 'linear-gradient(90deg, #EF4444, #F59E0B)' : 'linear-gradient(90deg, #3B82F6, #10B981)',
            borderRadius: '5px',
            transition: 'width 0.5s ease'
          }} />
        </div>
      </div>

      {/* Advisory Note */}
      <div style={{
        background: isFog ? 'rgba(239, 68, 68, 0.15)' : 'rgba(59, 130, 246, 0.15)',
        border: `1px solid ${isFog ? 'rgba(239, 68, 68, 0.4)' : 'rgba(59, 130, 246, 0.4)'}`,
        padding: '0.85rem 1rem',
        borderRadius: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: isFog ? '#FCA5A5' : '#93C5FD', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
          {isFog ? <CloudFog size={16} color="#EF4444" /> : <ShieldCheck size={16} color="#3B82F6" />}
          <span>Commute Road Advisory:</span>
        </div>
        <p style={{ fontSize: '0.8rem', color: '#FFF' }}>
          {isFog 
            ? `Dense fog reduces driver reaction time. Maintain low beam headlights and keep a minimum 50m spacing on major expressways.`
            : 'Road visibility is normal. Evening commute rain risk starts around 05:30 PM.'}
        </p>
      </div>

      <div className="why-badge">
        <Info size={14} />
        <span>{widgetMeta.reason}</span>
      </div>
    </div>
  );
};
