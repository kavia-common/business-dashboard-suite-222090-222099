import React from 'react';

// PUBLIC_INTERFACE
export default function Sidebar({ currentTab = 'overview', onNavigate = () => {} }) {
  /**
   * Sidebar renders navigation items as buttons to avoid full page reloads.
   * Props:
   * - currentTab: string; one of 'overview' | 'sales' | 'revenue' | 'expenses' | 'settings'
   * - onNavigate: function(tab: string) => void
   */
  const items = [
    { key: 'overview', label: 'Overview' },
    { key: 'sales', label: 'Sales' },
    { key: 'revenue', label: 'Revenue' },
    { key: 'expenses', label: 'Expenses' },
    { key: 'settings', label: 'Settings' },
  ];

  return (
    <aside className="sidebar" aria-label="Sidebar navigation">
      <div className="sidebar-brand">
        <div className="logo" aria-hidden="true">📊</div>
        <span className="brand-text">BizDash</span>
      </div>
      <nav className="sidebar-nav" role="tablist" aria-label="Primary">
        {items.map((it) => {
          const isActive = currentTab === it.key;
          return (
            <button
              key={it.key}
              type="button"
              className={`nav-link${isActive ? ' active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
              role="tab"
              aria-selected={isActive}
              onClick={() => onNavigate(it.key)}
            >
              {it.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
