import React from 'react';
import { Clock, Info, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import type { PrioritizedWidget, PersonaId } from '../../types';

interface BestTimeCardProps {
  activePersonaId: PersonaId;
  widgetMeta: PrioritizedWidget;
  rankNumber: number;
}

export const BestTimeCard: React.FC<BestTimeCardProps> = ({
  activePersonaId,
  widgetMeta,
  rankNumber
}) => {
  const scheduleSlots = [
    { time: '06:00 AM - 08:00 AM', rating: 'ideal', label: 'Optimal Window', reason: 'Cool temperature, low UV index (1), fresh morning air.' },
    { time: '08:00 AM - 11:00 AM', rating: 'moderate', label: 'Good Conditions', reason: 'Rising UV (5). Hydration & sun protection advised.' },
    { time: '11:00 AM - 03:00 PM', rating: 'unfavorable', label: 'High Heat & UV', reason: 'Peak heat (31°C) and UV index (9). Limit direct outdoor exposure.' },
    { time: '03:00 PM - 06:00 PM', rating: 'moderate', label: 'Rain Chance (60%)', reason: 'Isolated afternoon showers possible. Carry umbrella.' },
    { time: '06:00 PM - 09:00 PM', rating: 'ideal', label: 'Evening Refresh', reason: 'Pleasant evening breeze (14 km/h), zero UV rays.' }
  ];

  const getSlotStyle = (rating: string) => {
    switch (rating) {
      case 'ideal':
        return { bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.4)', text: '#6EE7B7', icon: <CheckCircle2 size={16} color="#10B981" /> };
      case 'moderate':
        return { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.4)', text: '#FBBF24', icon: <AlertTriangle size={16} color="#F59E0B" /> };
      default:
        return { bg: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.4)', text: '#FCA5A5', icon: <XCircle size={16} color="#EF4444" /> };
    }
  };

  return (
    <div className="glass-panel widget-card">
      <div className="widget-header">
        <div className="widget-title-area">
          <div className="widget-title-icon" style={{ color: '#F59E0B' }}>
            <Clock size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#FFF' }}>Best Time Recommendation Schedule</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Hourly suitability distribution optimized for {activePersonaId} profile
            </p>
          </div>
        </div>

        <span className={`rank-badge ${rankNumber === 1 ? 'top-rank' : ''}`}>
          Rank #{rankNumber}
        </span>
      </div>

      {/* Schedule Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {scheduleSlots.map((slot, index) => {
          const style = getSlotStyle(slot.rating);
          return (
            <div
              key={index}
              style={{
                background: style.bg,
                border: `1px solid ${style.border}`,
                borderRadius: '10px',
                padding: '0.85rem 1rem',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {style.icon}
                <div>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFF' }}>
                    {slot.time}
                  </span>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {slot.reason}
                  </p>
                </div>
              </div>

              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: style.text,
                background: 'rgba(0, 0, 0, 0.3)',
                padding: '0.25rem 0.6rem',
                borderRadius: '6px'
              }}>
                {slot.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="why-badge">
        <Info size={14} />
        <span>{widgetMeta.reason}</span>
      </div>
    </div>
  );
};
