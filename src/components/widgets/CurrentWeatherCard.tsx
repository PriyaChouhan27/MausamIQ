import React from 'react';
import { 
  Sun, 
  CloudRain, 
  CloudLightning, 
  CloudFog, 
  Thermometer, 
  Wind, 
  Droplets, 
  Eye, 
  Gauge, 
  SunMedium, 
  Sunrise, 
  Sunset,
  Info 
} from 'lucide-react';
import type { CurrentWeather, PrioritizedWidget } from '../../types';

interface CurrentWeatherCardProps {
  weather: CurrentWeather;
  widgetMeta: PrioritizedWidget;
  rankNumber: number;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  weather,
  widgetMeta,
  rankNumber
}) => {
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'Thunderstorm':
        return <CloudLightning size={48} color="#F59E0B" />;
      case 'Heavy Rain':
        return <CloudRain size={48} color="#3B82F6" />;
      case 'Dense Fog':
        return <CloudFog size={48} color="#9CA3AF" />;
      default:
        return <Sun size={48} color="#FBBF24" />;
    }
  };

  return (
    <div className="glass-panel widget-card">
      <div className="widget-header">
        <div className="widget-title-area">
          <div className="widget-title-icon">
            <Thermometer size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#FFF' }}>Current Weather Conditions</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {weather.city}, {weather.state} • Updated {weather.lastUpdated}
            </p>
          </div>
        </div>

        <span className={`rank-badge ${rankNumber === 1 ? 'top-rank' : ''}`}>
          Rank #{rankNumber}
        </span>
      </div>

      {/* Main Temperature Hero View */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(0, 0, 0, 0.25)',
        padding: '1.25rem',
        borderRadius: '14px',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {getWeatherIcon(weather.condition)}
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span style={{ fontSize: '3rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#FFF' }}>
                {weather.temp}°C
              </span>
              <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                Feels like {weather.feelsLike}°C
              </span>
            </div>
            <p style={{ fontSize: '1rem', fontWeight: 600, color: '#93C5FD' }}>
              {weather.condition}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', borderLeft: '1px solid rgba(255, 255, 255, 0.1)', paddingLeft: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sunrise size={20} color="#FBBF24" />
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Sunrise</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#FFF' }}>{weather.sunrise}</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sunset size={20} color="#F97316" />
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Sunset</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#FFF' }}>{weather.sunset}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Atmospheric Metrics Pills Grid */}
      <div className="metrics-grid">
        <div className="metric-pill">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Droplets size={14} color="#60A5FA" />
            <span className="metric-label">Humidity</span>
          </div>
          <span className="metric-value">{weather.humidity}%</span>
        </div>

        <div className="metric-pill">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Wind size={14} color="#34D399" />
            <span className="metric-label">Wind Speed</span>
          </div>
          <span className="metric-value">{weather.windSpeed} km/h ({weather.windDirection})</span>
        </div>

        <div className="metric-pill">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <SunMedium size={14} color="#FBBF24" />
            <span className="metric-label">UV Index</span>
          </div>
          <span className="metric-value">{weather.uvIndex} ({weather.uvIndex > 8 ? 'Very High' : 'Moderate'})</span>
        </div>

        <div className="metric-pill">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Gauge size={14} color="#A78BFA" />
            <span className="metric-label">Air Quality (AQI)</span>
          </div>
          <span className="metric-value">{weather.aqi} ({weather.aqiCategory})</span>
        </div>

        <div className="metric-pill">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Eye size={14} color="#F472B6" />
            <span className="metric-label">Visibility</span>
          </div>
          <span className="metric-value">{weather.visibility} km</span>
        </div>

        <div className="metric-pill">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <CloudRain size={14} color="#38BDF8" />
            <span className="metric-label">24h Rainfall</span>
          </div>
          <span className="metric-value">{weather.rainfall24h} mm</span>
        </div>
      </div>

      <div className="why-badge">
        <Info size={14} />
        <span>{widgetMeta.reason}</span>
      </div>
    </div>
  );
};
