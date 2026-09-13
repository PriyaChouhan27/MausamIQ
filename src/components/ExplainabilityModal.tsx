import React from 'react';
import { X, Cpu, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import type { PrioritizedWidget, PersonaId } from '../types';
import { PERSONAS } from '../data/mockData';

interface ExplainabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  prioritizedWidgets: PrioritizedWidget[];
  activePersonaId: PersonaId;
  isSafetyOverrideActive: boolean;
}

export const ExplainabilityModal: React.FC<ExplainabilityModalProps> = ({
  isOpen,
  onClose,
  prioritizedWidgets,
  activePersonaId,
  isSafetyOverrideActive
}) => {
  if (!isOpen) return null;

  const activePersona = PERSONAS.find(p => p.id === activePersonaId) || PERSONAS[0];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #3B82F6, #6366F1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF'
            }}>
              <Cpu size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#FFF' }}>MausamIQ Ranking Logic</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Deterministic Prioritization Matrix & Safety Rules
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: '#FFF',
              borderRadius: '8px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Explainability Pipeline Diagram */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '1.25rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#60A5FA', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.6rem' }}>
            <Sparkles size={16} />
            <span>Prioritization Pipeline Formula:</span>
          </div>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.78rem',
            color: '#E2E8F0',
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '0.75rem',
            borderRadius: '8px'
          }}>
            <span style={{ color: activePersona.accentColor, fontWeight: 700 }}>Base Persona Weight</span>
            <span style={{ color: '#9CA3AF' }}>+</span>
            <span style={{ color: '#F59E0B', fontWeight: 700 }}>Weather Context Boost</span>
            <span style={{ color: '#9CA3AF' }}>+</span>
            <span style={{ color: '#EF4444', fontWeight: 700 }}>Safety Override Multiplier</span>
            <ArrowRight size={14} color="#60A5FA" />
            <span style={{ background: '#3B82F6', color: '#FFF', padding: '0.15rem 0.4rem', borderRadius: '4px', fontWeight: 700 }}>
              Final Card Rank
            </span>
          </div>
        </div>

        {/* Safety Rule Status */}
        <div style={{
          background: isSafetyOverrideActive ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
          border: `1px solid ${isSafetyOverrideActive ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.4)'}`,
          borderRadius: '10px',
          padding: '0.85rem 1rem',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <ShieldCheck size={22} color={isSafetyOverrideActive ? '#EF4444' : '#10B981'} />
          <div>
            <h4 style={{ fontSize: '0.9rem', color: isSafetyOverrideActive ? '#FCA5A5' : '#6EE7B7' }}>
              Safety Rule Status: {isSafetyOverrideActive ? 'OVERRIDE ACTIVE' : 'Normal Operational State'}
            </h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {isSafetyOverrideActive 
                ? 'Severe thunderstorm alert forces emergency warning card to top rank regardless of selected persona.'
                : 'No severe atmospheric hazard detected. Persona weighting rules apply standard prioritization.'}
            </p>
          </div>
        </div>

        {/* Current Active Ranking Table */}
        <h4 style={{ fontSize: '0.95rem', color: '#FFF', marginBottom: '0.75rem' }}>
          Current Dynamic Card Ranking for "{activePersona.name}" Persona:
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {prioritizedWidgets.map((widget, index) => (
            <div
              key={widget.id}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '10px',
                padding: '0.75rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: index === 0 ? '#F59E0B' : 'rgba(255, 255, 255, 0.1)',
                  color: index === 0 ? '#000' : '#FFF',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  #{index + 1}
                </span>
                <div>
                  <h5 style={{ fontSize: '0.88rem', color: '#FFF', fontWeight: 600 }}>{widget.title}</h5>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{widget.reason}</p>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: widget.priorityScore >= 1000 ? '#EF4444' : '#60A5FA',
                  background: 'rgba(0, 0, 0, 0.3)',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '6px'
                }}>
                  Score: {widget.priorityScore}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '1.25rem', textAlign: 'right' }}>
          <button className="btn-primary" onClick={onClose}>
            Close Matrix Explanation
          </button>
        </div>
      </div>
    </div>
  );
};
