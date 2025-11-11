import React from 'react';

// PUBLIC_INTERFACE
export default function Sidebar() {
  /** Sidebar renders a simple navigation; currently static with hover animations. */
  return (
    <aside className="sidebar" aria-label="Sidebar navigation">
      <div className="sidebar-brand">
        <div className="logo" aria-hidden="true">📊</div>
        <span className="brand-text">BizDash</span>
      </div>
      <nav className="sidebar-nav">
        <a href="#overview" className="nav-link active" aria-current="page">Overview</a>
        <a href="#sales" className="nav-link">Sales</a>
        <a href="#revenue" className="nav-link">Revenue</a>
        <a href="#expenses" className="nav-link">Expenses</a>
        <a href="#settings" className="nav-link">Settings</a>
      </nav>
    </aside>
  );
}
