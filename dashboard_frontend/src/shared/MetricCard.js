import React from 'react';

// PUBLIC_INTERFACE
export default function MetricCard({ title, value, accent = 'primary', ariaLabel, icon }) {
  /**
   * Glassmorphism metric card.
   * Props:
   * - title: string
   * - value: string/number
   * - accent: 'primary' | 'success' | 'neutral'
   * - ariaLabel: accessible label for screen readers
   * - icon: optional emoji/icon text
   */
  return (
    <div className={`card glass metric ${accent}`} role="group" aria-label={ariaLabel || title}>
      <div className="metric-top">
        <div className="metric-icon" aria-hidden="true">{icon || '📈'}</div>
        <span className="metric-title">{title}</span>
      </div>
      <div className="metric-value">{value}</div>
    </div>
  );
}
