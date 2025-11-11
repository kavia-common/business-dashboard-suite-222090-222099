import React from 'react';

// PUBLIC_INTERFACE
export default function QuickInsights({ items = [] }) {
  /**
   * QuickInsights renders a set of compact insight chips.
   * Props:
   * - items: Array<{ title: string, value: string, trend: 'up'|'down'|'flat' }>
   */
  return (
    <section className="card glass insights" aria-label="Quick insights">
      <div className="card-header">
        <h3>Quick Insights</h3>
      </div>
      <div className="insights-grid">
        {items.map((it, idx) => (
          <div className={`insight ${it.trend || 'flat'}`} key={idx} role="listitem" tabIndex={0}>
            <div className="insight-title">{it.title}</div>
            <div className="insight-value">
              {it.trend === 'up' ? '▲' : it.trend === 'down' ? '▼' : '■'} {it.value}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
