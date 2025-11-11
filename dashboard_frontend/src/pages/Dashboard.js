import React, { useEffect, useMemo, useState } from 'react';
import Sidebar from '../shared/Sidebar';
import TopBar from '../shared/TopBar';
import MetricCard from '../shared/MetricCard';
import QuickInsights from '../shared/QuickInsights';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import './dashboard.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

// PUBLIC_INTERFACE
export default function Dashboard() {
  /** Dashboard page renders the full layout (sidebar, top bar, content) and uses
   * local JSON/localStorage for sample metrics and series. Supports theme toggle
   * via TopBar and stores theme in localStorage.
   */
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'light';
  });

  const [dataState, setDataState] = useState(() => {
    // seed if not exists
    const saved = localStorage.getItem('dashboard:data');
    if (saved) return JSON.parse(saved);
    const initial = {
      metrics: {
        sales: 1240,
        revenue: 58240,
        expenses: 21360
      },
      // simple monthly data for charts
      monthly: [
        { month: 'Jan', sales: 120, revenue: 6000, expenses: 2000 },
        { month: 'Feb', sales: 140, revenue: 6400, expenses: 2100 },
        { month: 'Mar', sales: 180, revenue: 8000, expenses: 2400 },
        { month: 'Apr', sales: 160, revenue: 7600, expenses: 2300 },
        { month: 'May', sales: 200, revenue: 9200, expenses: 2600 },
        { month: 'Jun', sales: 220, revenue: 9800, expenses: 2700 },
      ],
      byCategory: [
        { name: 'Subscriptions', value: 24000 },
        { name: 'One-time', value: 18000 },
        { name: 'Services', value: 16240 },
      ]
    };
    localStorage.setItem('dashboard:data', JSON.stringify(initial));
    return initial;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('dashboard:data', JSON.stringify(dataState));
  }, [dataState]);

  const handleThemeToggle = () => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  };

  // Chart Data
  const barData = useMemo(() => {
    const labels = dataState.monthly.map((m) => m.month);
    return {
      labels,
      datasets: [
        {
          label: 'Sales',
          data: dataState.monthly.map((m) => m.sales),
          backgroundColor: 'rgba(59, 130, 246, 0.6)', // primary #3b82f6
          borderRadius: 8,
        },
        {
          label: 'Expenses',
          data: dataState.monthly.map((m) => m.expenses / 10), // scaled to align with sales bar view
          backgroundColor: 'rgba(239, 68, 68, 0.45)', // error-ish
          borderRadius: 8,
        },
      ],
    };
  }, [dataState]);

  const pieData = useMemo(() => {
    return {
      labels: dataState.byCategory.map((c) => c.name),
      datasets: [
        {
          label: 'Revenue Split',
          data: dataState.byCategory.map((c) => c.value),
          backgroundColor: [
            'rgba(59, 130, 246, 0.7)', // primary
            'rgba(6, 182, 212, 0.7)',  // success
            'rgba(100, 116, 139, 0.7)', // secondary grey
          ],
          borderColor: [
            'rgba(59, 130, 246, 0.9)',
            'rgba(6, 182, 212, 0.9)',
            'rgba(100, 116, 139, 0.9)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [dataState]);

  const barOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: 'var(--text-primary)' } },
      tooltip: { enabled: true }
    },
    scales: {
      x: {
        ticks: { color: 'var(--text-primary)' },
        grid: { color: 'var(--glass-border)' },
      },
      y: {
        ticks: { color: 'var(--text-primary)' },
        grid: { color: 'var(--glass-border)' },
      }
    }
  }), []);

  const insights = useMemo(() => {
    const { sales, revenue, expenses } = dataState.metrics;
    const profit = revenue - expenses;
    return [
      { title: 'Profit', value: `$${profit.toLocaleString()}`, trend: profit >= 0 ? 'up' : 'down' },
      { title: 'Avg. Order Value', value: `$${Math.round(revenue / Math.max(1, sales))}`, trend: 'up' },
      { title: 'Expense Ratio', value: `${Math.round((expenses / Math.max(1, revenue)) * 100)}%`, trend: 'down' },
    ];
  }, [dataState]);

  return (
    <div className="dash-root">
      <Sidebar />
      <div className="dash-main">
        <TopBar theme={theme} onToggleTheme={handleThemeToggle} />
        <main className="dash-content" role="main">
          <section className="grid metrics-grid" aria-label="Key metrics">
            <MetricCard
              title="Sales"
              value={dataState.metrics.sales.toLocaleString()}
              accent="primary"
              ariaLabel="Total sales"
              icon="🛒"
            />
            <MetricCard
              title="Revenue"
              value={`$${dataState.metrics.revenue.toLocaleString()}`}
              accent="success"
              ariaLabel="Total revenue"
              icon="💰"
            />
            <MetricCard
              title="Expenses"
              value={`$${dataState.metrics.expenses.toLocaleString()}`}
              accent="neutral"
              ariaLabel="Total expenses"
              icon="📉"
            />
          </section>

          <section className="grid charts-grid" aria-label="Charts">
            <div className="card glass chart-card" role="region" aria-label="Monthly sales and expenses bar chart">
              <div className="card-header">
                <h3>Monthly Performance</h3>
                <span className="badge">Bar</span>
              </div>
              <div className="chart-wrapper">
                <Bar data={barData} options={barOptions} />
              </div>
            </div>

            <div className="card glass chart-card" role="region" aria-label="Revenue by category pie chart">
              <div className="card-header">
                <h3>Revenue by Category</h3>
                <span className="badge">Pie</span>
              </div>
              <div className="chart-wrapper">
                <Pie data={pieData} />
              </div>
            </div>
          </section>

          <QuickInsights items={insights} />
        </main>
      </div>
    </div>
  );
}
