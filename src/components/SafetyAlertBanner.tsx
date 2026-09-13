import React from 'react';
import { ShieldAlert, ShieldCheck, Info, CheckCircle2, AlertTriangle } from 'lucide-react';
import type { WeatherAlert } from '../types';

interface SafetyAlertBannerProps {
  alert: WeatherAlert;
  isSimulated: boolean;
  onToggleSimulation: () => void;
}

export const SafetyAlertBanner: React.FC<SafetyAlertBannerProps> = ({
  alert,
  isSimulated,
  onToggleSimulation
}) => {
  if (!isSimulated && alert.severity !== 'severe' && alert.severity !== 'extreme') {
    return (
      <div 
        className="glass-panel widget-card" 
        style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(6, 182, 212, 0.12))',
          borderColor: 'rgba(16, 185, 129, 0.3)',
          padding: '1rem 1.25rem'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(16, 185, 129, 0.2)',
              color: '#10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 14px rgba(16, 185, 129, 0.25)'
            }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ color: '#FFF', fontSize: '1.05rem' }}>IMD Regional Sector Status: Operational & Normal</h3>
                <span style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  background: 'rgba(16, 185, 129, 0.2)',
                  color: '#6EE7B7',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(16, 185, 129, 0.3)'
                }}>ALL CLEAR</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                No active severe weather emergency warnings. Persona preferences dictating widget rank order.
              </p>
            </div>
          </div>

          <button
            onClick={onToggleSimulation}
            style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#FCA5A5',
              padding: '0.45rem 0.85rem',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s ease'
            }}
            title="Simulate Severe Thunderstorm & Flash Flood Warning to test Rank #1 Safety Override"
          >
            <AlertTriangle size={15} color="#EF4444" />
            <span>Simulate Severe Weather Emergency</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel widget-card" style={{
      background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.28), rgba(153, 27, 27, 0.45))',
      borderColor: 'rgba(239, 68, 68, 0.6)',
      boxShadow: '0 8px 32px rgba(239, 68, 68, 0.3)'
    }}>
      <div className="widget-header" style={{ marginBottom: '0.75rem' }}>
        <div className="widget-title-area">
          <div className="widget-title-icon" style={{ background: '#EF4444', color: '#FFF', boxShadow: '0 0 16px rgba(239, 68, 68, 0.5)' }}>
            <ShieldAlert size={22} />
          </div>
          <div>
            <h3 style={{ color: '#FCA5A5', fontSize: '1.2rem', fontWeight: 800 }}>{alert.title}</h3>
            <span style={{ fontSize: '0.75rem', color: '#F87171', fontWeight: 500 }}>
              Issued by IMD Regional Meteorological Centre • Effective until {alert.effectiveUntil}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="rank-badge safety-rank">
            🚨 RANK #1 SAFETY OVERRIDE
          </span>
          <button
            onClick={onToggleSimulation}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#FFF',
              padding: '0.3rem 0.75rem',
              borderRadius: '6px',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Clear Warning
          </button>
        </div>
      </div>

      <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '0.85rem 1rem', borderRadius: '10px', marginBottom: '0.85rem', borderLeft: '4px solid #EF4444' }}>
        <p style={{ fontSize: '0.92rem', color: '#FFF', fontWeight: 600, marginBottom: '0.35rem' }}>
          {alert.headline}
        </p>
        <p style={{ fontSize: '0.82rem', color: '#FCA5A5' }}>
          {alert.description}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', background: 'rgba(239, 68, 68, 0.18)', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#FECACA', fontSize: '0.85rem', fontWeight: 700 }}>
          <CheckCircle2 size={16} color="#F87171" />
          <span>IMD Safety & Action Protocol:</span>
        </div>
        <p style={{ fontSize: '0.82rem', color: '#FFF', paddingLeft: '1.4rem' }}>
          {alert.instruction}
        </p>
      </div>

      <div className="why-badge" style={{ background: 'rgba(239, 68, 68, 0.25)', borderColor: 'rgba(239, 68, 68, 0.45)', color: '#FCA5A5' }}>
        <Info size={14} />
        <span>
          <strong>Why this card is #1:</strong> MausamIQ Safety Protocol automatically overrides all persona preferences when severe/extreme weather alerts exist in your sector.
        </span>
      </div>
    </div>
  );
};
