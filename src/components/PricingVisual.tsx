'use client';

import { useEffect, useState } from 'react';

export default function PricingVisual() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  const dataPoints = [
    { x: 50, y: 135 },
    { x: 80, y: 125 },
    { x: 100, y: 110 },
    { x: 120, y: 100 },
    { x: 150, y: 105 },
    { x: 170, y: 85 },
    { x: 190, y: 80 },
    { x: 210, y: 90 },
    { x: 240, y: 65 },
    { x: 270, y: 55 },
    { x: 300, y: 45 },
    { x: 330, y: 35 },
  ];

  return (
    <div className="pricing-visual-card">
      <div className="visual-header">
        <div className="visual-status-indicator">
          <span className="pulse-dot" />
          <span>Real-time Quoting Engine</span>
        </div>
        <div className="visual-title">XGBoost Model</div>
      </div>

      <div className="chart-container">
        <svg viewBox="0 0 360 180" className="pricing-chart" aria-hidden="true">
          <defs>
            <linearGradient id="chart-line-grad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06d6a0" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="30" y1="20" x2="30" y2="150" className="chart-axis" />
          <line x1="30" y1="150" x2="340" y2="150" className="chart-axis" />
          
          <line x1="30" y1="110" x2="340" y2="110" className="chart-grid-line" strokeDasharray="3,3" />
          <line x1="30" y1="70" x2="340" y2="70" className="chart-grid-line" strokeDasharray="3,3" />
          <line x1="30" y1="30" x2="340" y2="30" className="chart-grid-line" strokeDasharray="3,3" />

          {/* Regression Line Curve */}
          <path
            d="M 30 150 Q 120 120 220 75 T 340 30"
            fill="none"
            stroke="url(#chart-line-grad)"
            className={`regression-line ${animated ? 'animate-draw' : ''}`}
            strokeWidth="2.5"
          />

          {/* Historical Data Points */}
          {dataPoints.map((pt, idx) => (
            <circle
              key={idx}
              cx={pt.x}
              cy={pt.y}
              r="4"
              className="chart-dot historical-dot"
              style={{ animationDelay: `${idx * 60}ms` }}
            />
          ))}

          {/* Highlighted Active Prediction Point */}
          <circle
            cx="220"
            cy="75"
            r="6"
            className="chart-dot active-dot"
          />
          <circle
            cx="220"
            cy="75"
            r="12"
            className="chart-dot active-dot-pulse"
          />
        </svg>

        {/* Floating Glass Tooltip */}
        <div className="chart-tooltip">
          <div className="tooltip-row">
            <span className="tooltip-label">Rec. Rate</span>
            <span className="tooltip-value highlight">$42,500</span>
          </div>
          <div className="tooltip-row">
            <span className="tooltip-label">Confidence</span>
            <span className="tooltip-value">96.4%</span>
          </div>
          <div className="tooltip-row">
            <span className="tooltip-label">Status</span>
            <span className="tooltip-value text-accent">Approved</span>
          </div>
        </div>
      </div>
    </div>
  );
}
