import React from 'react';

// PUBLIC_INTERFACE
export default function TopBar({ theme, onToggleTheme }) {
  /**
   * TopBar displays the page title and a theme toggle.
   * Props:
   * - theme: 'light' | 'dark'
   * - onToggleTheme: function to toggle theme and persist to localStorage
   */
  return (
    <header className="topbar" role="banner">
      <h1 className="title">Dashboard</h1>
      <div className="topbar-actions">
        <button
          className="btn-theme"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </header>
  );
}
