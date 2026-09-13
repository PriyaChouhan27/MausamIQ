import React from 'react';
import { Compass, Plane, Luggage, MapPin, Info } from 'lucide-react';
import type { CurrentWeather, PrioritizedWidget } from '../../types';

interface TravelerCardProps {
  currentWeather: CurrentWeather;
  widgetMeta: PrioritizedWidget;
  rankNumber: number;
}

export const TravelerCard: React.FC<TravelerCardProps> = ({
  currentWeather,
  widgetMeta,
  rankNumber
}) => {
  return (
    <div className="glass-panel widget-card">
      <div className="widget-header">
        <div className="widget-title-area">
          <div className="widget-title-icon" style={{ color: '#3B82F6' }}>
            <Compass size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#FFF' }}>Destination Weather Comparison</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Travel advisory & destination suitability index
            </p>
          </div>
        </div>

        <span className={`rank-badge ${rankNumber === 1 ? 'top-rank' : ''}`}>
          Rank #{rankNumber}
        </span>
      </div>

      {/* Comparison Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
        {/* Current Origin */}
        <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#9CA3AF', fontSize: '0.78rem', marginBottom: '0.4rem' }}>
            <MapPin size={14} color="#60A5FA" />
            <span>ORIGIN CITY</span>
          </div>
          <h4 style={{ fontSize: '1.1rem', color: '#FFF' }}>{currentWeather.city}</h4>
          <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#60A5FA' }}>{currentWeather.temp}°C</span>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{currentWeather.condition} • Visibility {currentWeather.visibility} km</p>
        </div>

        {/* Destination Shimla */}
        <div style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(99, 102, 241, 0.2))', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#60A5FA', fontSize: '0.78rem', marginBottom: '0.4rem' }}>
            <Plane size={14} color="#3B82F6" />
            <span>POPULAR DESTINATION</span>
          </div>
          <h4 style={{ fontSize: '1.1rem', color: '#FFF' }}>Shimla, HP</h4>
          <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34D399' }}>16°C</span>
          <p style={{ fontSize: '0.8rem', color: '#93C5FD' }}>Partly Cloudy • Ideal Hill Trip Weather</p>
        </div>
      </div>

      {/* Travel Packing Advice */}
      <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '0.75rem 1rem', borderRadius: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#93C5FD', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
          <Luggage size={16} />
          <span>Traveler Recommendation:</span>
        </div>
        <p style={{ fontSize: '0.8rem', color: '#FFF' }}>
          Shimla temperature is 12°C cooler than {currentWeather.city}. Pack thermal layers, fleece jackets, and comfortable hiking footwear.
        </p>
      </div>

      <div className="why-badge">
        <Info size={14} />
        <span>{widgetMeta.reason}</span>
      </div>
    </div>
  );
};
