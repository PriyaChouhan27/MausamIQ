import React from 'react';
import { Target, Info, CheckCircle, AlertCircle, Clock, Lightbulb } from 'lucide-react';
import type { SuitabilityMetric, PersonaProfile, PrioritizedWidget } from '../../types';

interface SuitabilityCardProps {
  suitability: SuitabilityMetric;
  persona: PersonaProfile;
  widgetMeta: PrioritizedWidget;
  rankNumber: number;
}

export const SuitabilityCard: React.FC<SuitabilityCardProps> = ({
  suitability,
  persona,
  widgetMeta,
  rankNumber
}) => {
  const getStatusColor = (status: SuitabilityMetric['status']) => {
    switch (status) {
      case 'optimal': return '#10B981';
      case 'moderate': return '#3B82F6';
      case 'warning': return '#F59E0B';
      case 'danger': return '#EF4444';
    }
  };

  const statusColor = getStatusColor(suitability.status);

  return (
    <div className="glass-panel widget-card">
      <div className="widget-header">
        <div className="widget-title-area">
          <div className="widget-title-icon" style={{ color: persona.accentColor }}>
            <Target size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#FFF' }}>
              {persona.name} Suitability Index
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Deterministic evaluation based on current weather parameters
            </p>
          </div>
        </div>

        <span className={`rank-badge ${rankNumber === 1 ? 'top-rank' : ''}`}>
          Rank #{rankNumber}
        </span>
      </div>

      {/* Main Score Gauge Box */}
      <div className="suitability-score-box">
        <div 
          className="score-circle"
          style={{
            borderColor: statusColor,
            color: statusColor,
            boxShadow: `0 0 20px ${statusColor}40`
          }}
        >
          {suitability.score}
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <h4 style={{ fontSize: '1.25rem', color: '#FFF', fontWeight: 700 }}>
              {suitability.label}
            </h4>
            <span style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              background: `${statusColor}25`,
              color: statusColor,
              padding: '0.15rem 0.5rem',
              borderRadius: '6px',
              border: `1px solid ${statusColor}50`
            }}>
              {suitability.status.toUpperCase()}
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {suitability.summary}
          </p>
        </div>
      </div>

      {/* Ideal Window Callout */}
      {suitability.bestWindow && (
        <div style={{
          background: 'rgba(59, 130, 246, 0.12)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '10px',
          padding: '0.75rem 1rem',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <Clock size={20} color="#60A5FA" />
          <div>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFF' }}>
              Best Time Window: {suitability.bestWindow.start} - {suitability.bestWindow.end}
            </span>
            <p style={{ fontSize: '0.78rem', color: '#93C5FD' }}>
              {suitability.bestWindow.note}
            </p>
          </div>
        </div>
      )}

      {/* Key Atmospheric Factors Grid */}
      <h4 style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>
        Evaluated Factors & Impact:
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
        {suitability.keyFactors.map((factor, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '0.5rem 0.75rem',
            borderRadius: '8px',
            fontSize: '0.82rem'
          }}>
            {factor.impact === 'positive' ? (
              <CheckCircle size={16} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
            ) : factor.impact === 'negative' ? (
              <AlertCircle size={16} color="#EF4444" style={{ flexShrink: 0, marginTop: '2px' }} />
            ) : (
              <Info size={16} color="#F59E0B" style={{ flexShrink: 0, marginTop: '2px' }} />
            )}
            <div>
              <span style={{ fontWeight: 600, color: '#FFF', marginRight: '0.4rem' }}>{factor.name}:</span>
              <span style={{ color: 'var(--text-muted)' }}>{factor.detail}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Actionable Tips */}
      {suitability.actionTips.length > 0 && (
        <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '0.75rem 1rem', borderRadius: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#FBBF24', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem' }}>
            <Lightbulb size={15} />
            <span>MausamIQ Smart Recommendation:</span>
          </div>
          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.8rem', color: '#FFF' }}>
            {suitability.actionTips.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="why-badge">
        <Info size={14} />
        <span>{widgetMeta.reason}</span>
      </div>
    </div>
  );
};
