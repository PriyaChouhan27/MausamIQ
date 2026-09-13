import React from 'react';
import { Users, Smile, Sun, ShieldCheck, Info } from 'lucide-react';
import type { CurrentWeather, PrioritizedWidget } from '../../types';

interface FamilyParentCardProps {
  currentWeather: CurrentWeather;
  widgetMeta: PrioritizedWidget;
  rankNumber: number;
}

export const FamilyParentCard: React.FC<FamilyParentCardProps> = ({
  currentWeather,
  widgetMeta,
  rankNumber
}) => {
  const isTooHot = currentWeather.temp > 35;

  return (
    <div className="glass-panel widget-card">
      <div className="widget-header">
        <div className="widget-title-area">
          <div className="widget-title-icon" style={{ color: '#F97316' }}>
            <Users size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#FFF' }}>Family & Playground Comfort Index</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Kids outdoor play safety, stroller comfort & child sun mitigation
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
            <Smile size={14} color="#F97316" />
            <span className="metric-label">Kids Play Rating</span>
          </div>
          <span className="metric-value" style={{ color: isTooHot ? '#EF4444' : '#10B981' }}>
            {isTooHot ? '35 / 100 (Heat Risk)' : '88 / 100 (Optimal)'}
          </span>
        </div>

        <div className="metric-pill">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Sun size={14} color="#FBBF24" />
            <span className="metric-label">Stroller Comfort</span>
          </div>
          <span className="metric-value">Shaded Park Recommended</span>
        </div>
      </div>

      <div style={{ background: 'rgba(249, 115, 22, 0.15)', border: '1px solid rgba(249, 115, 22, 0.3)', padding: '0.85rem 1rem', borderRadius: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#FFEDD5', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
          <ShieldCheck size={16} />
          <span>Parent Action Tip:</span>
        </div>
        <p style={{ fontSize: '0.8rem', color: '#FFF' }}>
          {isTooHot 
            ? 'Midday temperature is too high for young children. Plan park visits before 09:30 AM or after 05:30 PM with water bottles.'
            : 'Excellent park weather! Apply broad spectrum SPF 30+ sunscreen on kids before outdoor playground activities.'}
        </p>
      </div>

      <div className="why-badge">
        <Info size={14} />
        <span>{widgetMeta.reason}</span>
      </div>
    </div>
  );
};
